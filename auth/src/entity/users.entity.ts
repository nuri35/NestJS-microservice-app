import { type } from 'os'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column()
  phone: string

  @Column({ default: false })
  verify: boolean
}
