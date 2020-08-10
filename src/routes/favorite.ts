import { Router } from 'express'
import { validate, Joi } from 'express-validation'
import BookController from '../controllers/BookController'

const router = Router()

const addFavoriteValidation = {
  body: Joi.object({
    bookId: Joi.number().required(),
    favorite: Joi.string().required(),
    timestamp: Joi.date().required(),
    userId: Joi.number().required(),
  }),
}

router.route('/').post(validate(addFavoriteValidation), BookController.addFavorite)

export default router
