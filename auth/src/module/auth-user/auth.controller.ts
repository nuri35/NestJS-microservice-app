import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { SignupDto } from './dto/signup-dto'
import { AuthService } from './auth.service'
import { Users } from 'src/entity/users.entity'
import { Observable } from 'rxjs'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signin')
  async signin(@Body() user: any) {
    return 'You are signed in'
  }

  @Post('signup')
  signup(@Body() user: SignupDto): Observable<{
    user: Users
    message: string
  }> {
    return this.authService.signup(user)
  }
}
