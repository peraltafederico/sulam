import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { UserLessonProgress } from './UserLessonProgress'

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
  UserLessonProgress: UserLessonProgress[]
}
