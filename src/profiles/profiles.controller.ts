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
import { ProfilesService } from './profiles.service';
import { CreateProfileContainerDto, UpdateProfileContainerDto } from './dto/profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('profiles')
@UseGuards(JwtAuthGuard)
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  create(@Request() req, @Body() createProfileContainerDto: CreateProfileContainerDto) {
    return this.profilesService.create(req.user.userId, createProfileContainerDto);
  }

  @Get()
  findMy(@Request() req) {
    return this.profilesService.findByUserId(req.user.userId);
  }

  @Patch()
  update(@Request() req, @Body() updateProfileContainerDto: UpdateProfileContainerDto) {
    return this.profilesService.upsert(req.user.userId, updateProfileContainerDto);
  }

  @Delete()
  remove(@Request() req) {
    return this.profilesService.remove(req.user.userId);
  }
}
