import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from '../service/users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') user_id: string) {
    return this.usersService.findOne(user_id);
  }

  @Patch(':id')
  update(@Param('id') user_id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(user_id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') user_id: string) {
    return this.usersService.remove(user_id);
  }
}
