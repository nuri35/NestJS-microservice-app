import { SignupDto } from './dto/signup-dto'

export class AuthService {
  constructor() {}

  async signup(user: SignupDto): Promise<void> {
    // 1. Check if user already exists
    // 2. If not, create user with password hash and save to database
    // 3. send email to user with verification link
    // 4. return success message informing user to check email
  }
}
