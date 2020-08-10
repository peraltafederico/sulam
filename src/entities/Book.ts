import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { UserBookFavorite } from './UserBookFavorite'
import { Lessons } from './Lessons'

@Entity({ name: 'Book' })
export class Book {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  imageUrl: string

  @Column({ type: 'datetime' })
  addedDate: Date

  @OneToMany(() => UserBookFavorite, (userBookFavorite) => userBookFavorite.book)
  userBookFavorite: UserBookFavorite[]

  @OneToMany(() => Lessons, (lesson) => lesson.book)
  lessons: Lessons[]
}
