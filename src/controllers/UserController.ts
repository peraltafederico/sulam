import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { AddInquiryDto } from '../dto/AddInquiryDto'
import { CreateOrUpdateUserDto } from '../dto/CreateOrUpdateUserDto'
import { generateAccessToken } from '../utils/generateAccessToken'
import { UserInquiries } from '../entities/UserInquiries'
import { User } from '../entities/User'

export default class UserController {
  static async createOrUpdateUser(req: Request, res: Response): Promise<void> {
    try {
      const { body } = req as { body: CreateOrUpdateUserDto }

      const userRepository = getRepository(User)

      const user = await userRepository.findOne({ email: body.email })

      const token = generateAccessToken({
        googleId: body.googleId,
        email: body.email,
      })

      if (user) {
        await userRepository.update(
          {
            email: body.email,
          },
          { lastLogin: body.lastLogin }
        )

        res.status(200).json({
          success: true,
          message: 'success',
          data: {
            token,
          },
        })

        return
      }

      await userRepository.save(body)

      res.status(201).json({
        success: true,
        message: 'success',
        data: {
          token,
        },
      })
    } catch (error) {
      res.status(400).json({
        message: 'Could not create or update the user',
        description: error.message,
      })
    }
  }

  static async saveInquiry(req: Request, res: Response): Promise<void> {
    try {
      const { body } = req as { body: AddInquiryDto }

      const userRepository = getRepository(User)
      const userInquiriesRepository = getRepository(UserInquiries)

      let user: User

      try {
        user = await userRepository.findOneOrFail(body.userId)
      } catch (error) {
        res.status(400).json({
          message: "The user doesn't exist",
          description: error.message,
        })
      }

      await userInquiriesRepository.save({
        text: body.text,
        timestamp: body.timestamp,
        user,
      })

      res.status(201).send({
        success: true,
        message: 'success',
        data: 'ok',
      })
    } catch (error) {
      res.status(400).json({
        message: 'Could not save the inquiry for the user',
        description: error.message,
      })
    }
  }
}
