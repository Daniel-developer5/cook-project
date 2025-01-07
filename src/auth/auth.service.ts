import { Inject, Injectable, NotFoundException, UnauthorizedException, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { UserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private UsersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async getHashedPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10)
  }

  async validateUser({ username, password }: UserDto): Promise<{ access_token: string, }> {
    const user = await this.UsersService.findOne(username)

    if (!user) {
      throw new NotFoundException('Username does not exist')
    }

    const isMatched = await this.comparePasswords(password, user.password)

    if (!isMatched) {
      throw new UnauthorizedException('Invalid Password')
    }

    return {
      access_token: await this.jwtService.signAsync({ username: user.username, id: user._id, }),
    }
  }

  async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword)
  }
}
