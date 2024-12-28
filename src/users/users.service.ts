import { Inject, Injectable, Logger, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { UserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(forwardRef(() => AuthService))
    private AuthService: AuthService
  ) {}

  async findOne(username: string): Promise<any> {
    return await this.userModel.findOne({ username }).exec()
  }

  async create(user: UserDto): Promise<any> {
    const hashedPassword = await this.AuthService.getHashedPassword(user.password)

    user.password = hashedPassword

    const newUser = new this.userModel(user)

    return newUser.save()
  }
}
