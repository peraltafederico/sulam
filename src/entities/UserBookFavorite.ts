import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Book } from './Book'
import { User } from './User'

@Entity({ name: 'UserBookFavorite' })
export class UserBookFavorite {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  favorite: string

  @Column({ type: 'datetime' })
  timestamp: Date

  @ManyToOne(() => User, (user) => user.userBookFavorite)
  user: User

  @ManyToOne(() => Book, (lesson) => lesson.userBookFavorite)
  book: Book
}
