import { Router } from 'express'
import glogin from './glogin'
import library from './library'
import savePage from './savePage'
import favorite from './favorite'
import contactUs from './contactUs'

const router = Router()

router.use('/glogin', glogin)
router.use('/library', library)
router.use('/savePage', savePage)
router.use('/favorite', favorite)
router.use('/contactUs', contactUs)

export default router
