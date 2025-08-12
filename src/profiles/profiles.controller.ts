import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { ProfilesService } from './profiles.service';
import { CreateProfileContainerDto, UpdateProfileContainerDto } from './dto/profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('profiles')
@Controller('profiles')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  @ApiOperation({ summary: 'Criar container de perfis Pomodoro para o usuário' })
  @ApiBody({ type: CreateProfileContainerDto })
  @ApiResponse({
    status: 201,
    description: 'Container de perfis criado com sucesso',
    schema: {
      example: {
        id: 1,
        user_id: 1,
        lastProfile: 1,
        profileStored: [
          {
            name: 'Default',
            focusTime: 25,
            break: 5,
            longBreak: 15,
            id: 1
          }
        ],
        created_at: '2025-08-11T21:00:00.000Z',
        updated_at: '2025-08-11T21:00:00.000Z'
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Token não fornecido ou inválido' })
  create(@Request() req, @Body() createProfileContainerDto: CreateProfileContainerDto) {
    return this.profilesService.create(req.user.userId, createProfileContainerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar perfis Pomodoro do usuário logado' })
  @ApiResponse({
    status: 200,
    description: 'Perfis do usuário retornados com sucesso',
    schema: {
      example: {
        id: 1,
        user_id: 1,
        lastProfile: 2,
        profileStored: [
          {
            name: 'Default',
            focusTime: 25,
            break: 5,
            longBreak: 15,
            id: 1
          },
          {
            name: 'Trabalho Intenso',
            focusTime: 50,
            break: 10,
            longBreak: 30,
            id: 2
          }
        ],
        created_at: '2025-08-11T21:00:00.000Z',
        updated_at: '2025-08-11T21:00:00.000Z'
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Nenhum perfil encontrado para o usuário' })
  @ApiResponse({ status: 401, description: 'Token não fornecido ou inválido' })
  findMy(@Request() req) {
    return this.profilesService.findByUserId(req.user.userId);
  }

  @Patch()
  @ApiOperation({ summary: 'Atualizar perfis Pomodoro do usuário logado' })
  @ApiBody({ type: UpdateProfileContainerDto })
  @ApiResponse({
    status: 200,
    description: 'Perfis atualizados com sucesso',
    schema: {
      example: {
        id: 1,
        user_id: 1,
        lastProfile: 1,
        profileStored: [
          {
            name: 'Default Personalizado',
            focusTime: 30,
            break: 7,
            longBreak: 20,
            id: 1
          }
        ],
        created_at: '2025-08-11T21:00:00.000Z',
        updated_at: '2025-08-11T21:30:00.000Z'
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Perfis não encontrados para o usuário' })
  @ApiResponse({ status: 401, description: 'Token não fornecido ou inválido' })
  update(@Request() req, @Body() updateProfileContainerDto: UpdateProfileContainerDto) {
    return this.profilesService.upsert(req.user.userId, updateProfileContainerDto);
  }

  @Delete()
  @ApiOperation({ summary: 'Deletar todos os perfis Pomodoro do usuário logado' })
  @ApiResponse({ status: 200, description: 'Perfis deletados com sucesso' })
  @ApiResponse({ status: 404, description: 'Perfis não encontrados para o usuário' })
  @ApiResponse({ status: 401, description: 'Token não fornecido ou inválido' })
  remove(@Request() req) {
    return this.profilesService.remove(req.user.userId);
  }
}
