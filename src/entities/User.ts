import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { UserLessonProgress } from './UserLessonProgress'
import { UserBookFavorite } from './UserBookFavorite'
import { UserInquiries } from './UserInquiries'

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  googleId: string

  @Column({ type: 'datetime' })
  lastLogin: Date

  @Column()
  email: string

  @Column()
  name: string

  @OneToMany(() => UserLessonProgress, (userLessonProgress) => userLessonProgress.user)
  userLessonProgress: UserLessonProgress[]

  @OneToMany(() => UserBookFavorite, (userBookFavorite) => userBookFavorite.user)
  userBookFavorite: UserBookFavorite[]

  @OneToMany(() => UserBookFavorite, (userBookFavorite) => userBookFavorite.user)
  userInquiries: UserInquiries[]
}
