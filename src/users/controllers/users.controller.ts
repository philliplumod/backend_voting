import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersService } from '../service/users.service';
import { UserCreateService } from '../service/user-create.service';
import { User } from '../interface/user.interface';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly createUserService: UserCreateService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.createUserService.create(createUserDto);
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':user_id')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  findOne(@Param('user_id') user_id: string): Promise<User> {
    return this.usersService.findOne(user_id);
  }

  @Put(':user_id')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  update(
    @Param('user_id') user_id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(user_id, updateUserDto);
  }

  @Delete(':user_id')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  remove(@Param('user_id') user_id: string): Promise<User> {
    return this.usersService.remove(user_id);
  }
}
