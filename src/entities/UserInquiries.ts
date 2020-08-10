import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { User } from './User'

@Entity({ name: 'UserInquiries' })
export class UserInquiries {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  text: string

  @Column({ type: 'datetime' })
  timestamp: Date

  @ManyToOne(() => User, (user) => user.id)
  user: User
}
