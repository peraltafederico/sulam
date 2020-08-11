import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { SavePageDto } from '../dto/SavePageDto'
import { User } from '../entities/User'
import { UserLessonProgress } from '../entities/UserLessonProgress'
import { Lessons } from '../entities/Lessons'

export default class LessonsController {
  static async savePage(req: Request, res: Response): Promise<void> {
    const { body } = req as { body: SavePageDto }

    const userLessonsRepository = getRepository(UserLessonProgress)
    const userRepository = getRepository(User)
    const lessonRepository = getRepository(Lessons)

    try {
      let lesson: Lessons
      let user: User

      try {
        lesson = await lessonRepository.findOneOrFail(body.lessonId)
      } catch (error) {
        res.status(400).json({
          message: "The lesson doesn't exist",
          description: error.message,
        })
      }

      try {
        user = await userRepository.findOneOrFail(body.userId)
      } catch (error) {
        res.status(400).json({
          message: "The user doesn't exist",
          description: error.message,
        })
      }

      await userLessonsRepository.save({
        lastPage: body.lastPage,
        lesson,
        user,
        timestamp: body.timestamp,
      })

      res.status(201).json({
        success: true,
        message: 'sucess',
        data: 'ok',
      })
    } catch (error) {
      res.status(400).json({
        message: 'Could not save the last page in the lesson for the user',
        description: error.message,
      })
    }
  }
}
