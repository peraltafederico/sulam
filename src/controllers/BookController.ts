import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { AddFavoriteDto } from '../dto/AddFavoriteDto'
import { UserBookFavorite } from '../entities/UserBookFavorite'
import { Book } from '../entities/Book'
import { User } from '../entities/User'

export default class BookController {
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const bookRepository = getRepository(Book)

      const book = await bookRepository.find({ relations: ['lessons'] })

      res.send(book)
    } catch (error) {
      res.status(400).json({
        message: 'Could not get all books',
        description: error.message,
      })
    }
  }

  static async addFavorite(req: Request, res: Response): Promise<void> {
    const { body } = req as { body: AddFavoriteDto }

    const userBookFavoriteRepository = getRepository(UserBookFavorite)
    const userRepository = getRepository(User)
    const bookRepository = getRepository(Book)

    try {
      let book: Book
      let user: User

      try {
        book = await bookRepository.findOneOrFail(body.bookId)
      } catch (error) {
        res.status(400).json({
          message: "The book doesn't exist",
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

      await userBookFavoriteRepository.save({
        book,
        user,
        favorite: body.favorite,
        timestamp: body.timestamp,
      })

      res.status(201).json({
        status: 'OK',
      })
    } catch (error) {
      res.status(400).json({
        message: 'Could not add the book as favorite for the user',
        description: error.message,
      })
    }
  }
}
