import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { SignupDto } from './dto/signup-dto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signin')
  async signin(@Body() user: any) {
    return 'You are signed in'
  }

  @Post('signup')
  async signup(@Body() user: SignupDto) {
    return this.authService.signup(user)
  }
}
