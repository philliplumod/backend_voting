import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from '../service/users.service';
import { JwtAuthGuard } from 'src/jwt/jwt-guard';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':user_id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findOne(@Param('user_id') user_id: string) {
    return this.usersService.findOne(user_id);
  }

  @Patch(':user_id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(
    @Param('user_id') user_id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(user_id, updateUserDto);
  }

  @Delete(':user_id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('user_id') user_id: string) {
    return this.usersService.remove(user_id);
  }
}
