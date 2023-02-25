import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator'

export class SignupDto {
  @IsEmail()
  email: string

  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string

  @IsString()
  name: string

  @IsString()
  @IsPhoneNumber('TR')
  phone: string
}
