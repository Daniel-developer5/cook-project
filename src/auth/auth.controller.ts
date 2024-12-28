import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard as LocalAuthGuard } from './auth.guard';

export type SignInDto = {
  username: string,
  password: string,
}

@Controller('auth')
export class AuthController {
  constructor (
    private authService: AuthService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req): Promise<any> {
    try {
      return await this.authService.validateUser(req.body)
    } catch (err) {
      throw err
    }
  }
}
