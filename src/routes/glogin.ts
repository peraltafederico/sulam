import { Router } from 'express'
import { Joi, validate } from 'express-validation'
import ProductController from '../controllers/UserController'

const router = Router()

const createOrUpdateUserValidation = {
  body: Joi.object({
    googleId: Joi.string().required(),
    lastLogin: Joi.date().required(),
    email: Joi.string().email().required(),
    name: Joi.string().required(),
  }),
}

router.route('/').post(validate(createOrUpdateUserValidation), ProductController.createOrUpdateUser)

export default router
