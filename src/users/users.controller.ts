import { ConflictException, Controller, Post, Request } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('user')
export class UserController {
  constructor (private userService: UsersService) {}

  @Post('create')
  async create(@Request() req): Promise<any> {
    const newUser = req.body

    try {
      const isUser = await this.userService.findOne(newUser.username)

      if (isUser) {
        throw new ConflictException('User already exist')
      }

      const user = await this.userService.create(newUser)

      return user
    } catch (err) {
      throw err
    }
  }  
}
