import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm'
import { UserLessonProgress } from './UserLessonProgress'
import { Book } from './Book'

@Entity({ name: 'Lessons' })
export class Lessons {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  pdfPath: string

  @Column()
  name: string

  @Column()
  picture: string

  @Column({ type: 'datetime' })
  dateAdded: Date

  @Column()
  numberOfPages: string

  @OneToMany(() => UserLessonProgress, (userLesson) => userLesson.user)
  userLessonProgress: UserLessonProgress[]

  @ManyToOne(() => Book, (book) => book.lessons)
  book: Book
}
