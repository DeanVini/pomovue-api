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
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import { UsersService } from '../../application/users/users.service';
import { CreateUserDto, UpdateUserDto } from '../../application/users/user.dto';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo usuário' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
    schema: {
      example: {
        id: 1,
        name: 'Dean',
        surname: 'de Meneses',
        username: 'DeanVini',
        email: 'dean@example.com',
        createdAt: '2025-08-11T21:00:00.000Z',
        updatedAt: '2025-08-11T21:00:00.000Z'
      }
    }
  })
  @ApiResponse({ status: 409, description: 'Username ou email já existe' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso',
    schema: {
      example: [
        {
          id: 1,
          name: 'Dean',
          surname: 'de Meneses',
          username: 'DeanVini',
          email: 'dean@example.com',
          createdAt: '2025-08-11T21:00:00.000Z',
          updatedAt: '2025-08-11T21:00:00.000Z'
        }
      ]
    }
  })
  @ApiResponse({ status: 401, description: 'Token de acesso inválido ou ausente' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Buscar usuário por ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado com sucesso',
    schema: {
      example: {
        id: 1,
        name: 'Dean',
        surname: 'de Meneses',
        username: 'DeanVini',
        email: 'dean@example.com',
        createdAt: '2025-08-11T21:00:00.000Z',
        updatedAt: '2025-08-11T21:00:00.000Z'
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiResponse({ status: 401, description: 'Token de acesso inválido ou ausente' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar usuário' })
  @ApiParam({ name: 'id', description: 'ID do usuário', type: 'number' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso',
    schema: {
      example: {
        id: 1,
        name: 'Dean Updated',
        surname: 'de Meneses',
        username: 'DeanVini',
        email: 'dean@example.com',
        createdAt: '2025-08-11T21:00:00.000Z',
        updatedAt: '2025-08-11T21:00:00.000Z'
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiResponse({ status: 401, description: 'Token de acesso inválido ou ausente' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Deletar usuário' })
  @ApiParam({ name: 'id', description: 'ID do usuário', type: 'number' })
  @ApiResponse({ status: 200, description: 'Usuário deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiResponse({ status: 401, description: 'Token de acesso inválido ou ausente' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
