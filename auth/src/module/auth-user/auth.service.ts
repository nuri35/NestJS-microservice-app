import { Users } from 'src/entity/users.entity'
import { SignupDto } from './dto/signup-dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BadRequestException } from '@nestjs/common'
import { map, switchMap, tap } from 'rxjs/operators'
import * as bcrypt from 'bcrypt'
import { from, Observable, of } from 'rxjs'

export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  hashPassword(password: string): Observable<unknown> {
    const result = from(bcrypt.hash(password, 12))
    return result
  }

  doesUserExist(email: string): Observable<boolean> {
    return from(
      this.usersRepository.findOne({
        where: {
          email,
        },
      }),
    ).pipe(
      switchMap((user: Users) => {
        return of(!!user)
      }),
    )
  }

  signup(user: SignupDto): Observable<{
    user: Users
    message: string
  }> {
    const { email, password } = user

    return this.doesUserExist(email).pipe(
      tap((doesUserExist: boolean) => {
        if (doesUserExist) throw new BadRequestException('User already exists')
      }),
      switchMap(() => {
        return this.hashPassword(password).pipe(
          switchMap((hashedPassword: string) => {
            return from(
              this.usersRepository.save({
                ...user,
                password: hashedPassword,
              }),
            ).pipe(
              map((user: Users) => {
                // mail service you should use rabbitmq
                return {
                  user,
                  message:
                    'User created successfully ! check your email to verify your account',
                }
              }),
            )
          }),
        )
      }),
    )
  }

  signin(user: SignupDto): Observable<Users> {
    const { email, password } = user

    return from(
      this.usersRepository.findOne({
        where: {
          email,
        },
      }),
    ).pipe(
      switchMap((user: Users) => {
        if (!user) throw new BadRequestException('Invalid credentials')

        return from(bcrypt.compare(password, user.password)).pipe(
          switchMap((isMatch: boolean) => {
            if (!isMatch) throw new BadRequestException('Invalid credentials')

            return of(user)
          }),
        )
      }),
    )
  }
}
