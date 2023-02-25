import { Exclude, Expose } from 'class-transformer'

export class UserAuthDto {
  @Expose()
  id: number

  @Expose()
  email: string

  @Expose()
  name: string

  @Expose()
  phone: string
}
