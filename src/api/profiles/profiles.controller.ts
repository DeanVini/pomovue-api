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
import { ProfilesService } from '../../application/profiles/profiles.service';
import { CreateProfileContainerDto, UpdateProfileContainerDto } from '../../application/profiles/profile.dto';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';

@ApiTags('profiles')
@Controller('profiles')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo perfil de configuração' })
  @ApiBody({ type: CreateProfileContainerDto })
  @ApiResponse({
    status: 201,
    description: 'Perfil criado com sucesso',
    schema: {
      example: {
        id: 1,
        user_id: 1,
        last_profile: 1,
        profileStored: [
          {
            id: 1,
            name: 'Default',
            break: 5,
            focusTime: 25,
            longBreak: 15
          }
        ],
        created_at: '2025-08-11T21:00:00.000Z',
        updated_at: '2025-08-11T21:00:00.000Z'
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Token de acesso inválido ou ausente' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Request() req, @Body() createProfileContainerDto: CreateProfileContainerDto) {
    return this.profilesService.create(req.user.id, createProfileContainerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar perfis do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Perfis encontrados com sucesso',
    schema: {
      example: {
        id: 1,
        user_id: 1,
        last_profile: 1,
        profileStored: [
          {
            id: 1,
            name: 'Default',
            break: 5,
            focusTime: 25,
            longBreak: 15
          }
        ],
        created_at: '2025-08-11T21:00:00.000Z',
        updated_at: '2025-08-11T21:00:00.000Z'
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Token de acesso inválido ou ausente' })
  @ApiResponse({ status: 404, description: 'Perfis não encontrados' })
  findByUser(@Request() req) {
    return this.profilesService.findByUserId(req.user.id);
  }

  @Patch()
  @ApiOperation({ summary: 'Atualizar perfis do usuário' })
  @ApiBody({ type: UpdateProfileContainerDto })
  @ApiResponse({
    status: 200,
    description: 'Perfis atualizados com sucesso',
    schema: {
      example: {
        id: 1,
        user_id: 1,
        last_profile: 2,
        profileStored: [
          {
            id: 1,
            name: 'Default',
            break: 5,
            focusTime: 25,
            longBreak: 15
          },
          {
            id: 2,
            name: 'Work Mode',
            break: 10,
            focusTime: 50,
            longBreak: 30
          }
        ],
        created_at: '2025-08-11T21:00:00.000Z',
        updated_at: '2025-08-11T21:00:00.000Z'
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Token de acesso inválido ou ausente' })
  @ApiResponse({ status: 404, description: 'Perfis não encontrados' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  update(@Request() req, @Body() updateProfileContainerDto: UpdateProfileContainerDto) {
    return this.profilesService.upsert(req.user.id, updateProfileContainerDto);
  }

  @Delete()
  @ApiOperation({ summary: 'Deletar todos os perfis do usuário' })
  @ApiResponse({ status: 200, description: 'Perfis deletados com sucesso' })
  @ApiResponse({ status: 401, description: 'Token de acesso inválido ou ausente' })
  @ApiResponse({ status: 404, description: 'Perfis não encontrados' })
  remove(@Request() req) {
    return this.profilesService.remove(req.user.id);
  }
}
