import { Router } from 'express'
import { Joi, validate } from 'express-validation'
import LessonsController from '../controllers/LessonsController'

const router = Router()

const savePageValidation = {
  body: Joi.object({
    lessonId: Joi.number().required(),
    lastPage: Joi.string().required(),
    timestamp: Joi.date().required(),
    userId: Joi.number().required(),
  }),
}

router.route('/').post(validate(savePageValidation), LessonsController.savePage)

export default router
