import 'reflect-metadata'
import { createConnection } from 'typeorm'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import { ValidationError } from 'express-validation'
import * as cors from 'cors'
import { toNumber } from 'lodash'
import * as dotenv from 'dotenv'
import { Book } from './entities/Book'
import { User } from './entities/User'
import { Lessons } from './entities/Lessons'
import { UserBookFavorite } from './entities/UserBookFavorite'
import { UserInquiries } from './entities/UserInquiries'
import routes from './routes'
import { UserLessonProgress } from './entities/UserLessonProgress'

dotenv.config()

const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT, PORT } = process.env

createConnection({
  type: 'mysql',
  host: DB_HOST,
  port: toNumber(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Book, Lessons, UserLessonProgress, User, UserBookFavorite, UserInquiries],
})
  .then(async () => {
    const app = express()

    app.use(cors())
    app.use(bodyParser.json())
    app.use('/', routes)

    app.use((err, req, res, next) => {
      if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err)
      }

      return res.status(500).json(err)
    })

    app.listen(PORT || 3000, () => console.log('running! :)'))
  })
  .catch((error) => console.log(error))
