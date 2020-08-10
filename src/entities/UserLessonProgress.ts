import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { User } from './User'
import { Lessons } from './Lessons'

@Entity({ name: 'UserLessonProgress' })
export class UserLessonProgress {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  lastPage: string

  @Column({ type: 'datetime' })
  timestamp: Date

  @ManyToOne(() => User, (user) => user.userLessonProgress)
  user: User

  @ManyToOne(() => Lessons, (lesson) => lesson.userLessonProgress)
  lesson: Lessons
}
