import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { SignupDto } from './dto/signup-dto'
import { AuthService } from './auth.service'
import { Users } from 'src/entity/users.entity'
import { Observable } from 'rxjs'
import { UserAuthDto } from './dto/userauth-dto'
import { Serialize } from 'src/interceptors/serialize.interceptor'

@Controller('auth')
@Serialize(UserAuthDto)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() user: SignupDto): Observable<{
    user: Users
    message: string
  }> {
    return this.authService.signup(user)
  }

  @Post('signin')
  signin(@Body() user: any) {
    return this.authService.signin(user)
  }
}
