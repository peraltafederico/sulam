import { Router } from 'express'
import { validate, Joi } from 'express-validation'
import UserController from '../controllers/UserController'

const router = Router()

const saveInquiryValidation = {
  body: Joi.object({
    text: Joi.string().required(),
    timestamp: Joi.date().required(),
    userId: Joi.number().required(),
  }),
}

router.route('/').post(validate(saveInquiryValidation), UserController.saveInquiry)

export default router
