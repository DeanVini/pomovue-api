import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfileContainerDto, UpdateProfileContainerDto } from './dto/profile.dto';
import { ProfileResponse } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createProfileContainerDto: CreateProfileContainerDto): Promise<ProfileResponse> {
    const profile = await this.prisma.profile.create({
      data: {
        userId,
        lastProfile: createProfileContainerDto.lastProfile || 1,
        profileStored: createProfileContainerDto.profileStored as any,
      },
    });

    return this.toProfileResponse(profile);
  }

  async findByUserId(userId: number): Promise<ProfileResponse | null> {
    const profile = await this.prisma.profile.findFirst({
      where: { userId },
    });

    if (!profile) {
      return null;
    }

    return this.toProfileResponse(profile);
  }

  async update(userId: number, updateProfileContainerDto: UpdateProfileContainerDto): Promise<ProfileResponse> {
    const updateData: any = {};
    if (updateProfileContainerDto.lastProfile !== undefined) {
      updateData.lastProfile = updateProfileContainerDto.lastProfile;
    }
    if (updateProfileContainerDto.profileStored !== undefined) {
      updateData.profileStored = updateProfileContainerDto.profileStored as any;
    }

    try {
      const result = await this.prisma.profile.updateMany({
        where: { userId },
        data: updateData,
      });

      if (result.count === 0) {
        throw new NotFoundException(`Profiles for user ${userId} not found`);
      }

      const updatedProfile = await this.prisma.profile.findFirst({
        where: { userId },
      });

      return this.toProfileResponse(updatedProfile!);
    } catch (error) {
      throw new NotFoundException(`Profiles for user ${userId} not found`);
    }
  }

  async upsert(userId: number, updateProfileContainerDto: UpdateProfileContainerDto): Promise<ProfileResponse> {
    const existing = await this.findByUserId(userId);

    if (existing) {
      return this.update(userId, updateProfileContainerDto);
    } else {
      // Convert UpdateProfileDto[] to CreateProfileDto[] by providing default values for required fields
      const profileStored = updateProfileContainerDto.profileStored
        ? updateProfileContainerDto.profileStored.map(profile => ({
            name: profile.name || 'Default',
            focusTime: profile.focusTime || 25,
            break: profile.break || 5,
            longBreak: profile.longBreak || 15,
          }))
        : [
            {
              name: 'Default',
              focusTime: 25,
              break: 5,
              longBreak: 15,
            }
          ];

      const defaultProfile = {
        lastProfile: updateProfileContainerDto.lastProfile || 1,
        profileStored,
      };

      return this.create(userId, defaultProfile);
    }
  }

  async remove(userId: number): Promise<void> {
    const result = await this.prisma.profile.deleteMany({
      where: { userId },
    });

    if (result.count === 0) {
      throw new NotFoundException(`Profiles for user ${userId} not found`);
    }
  }

  // Helper method to convert Prisma model to API response
  private toProfileResponse(profile: any): ProfileResponse {
    return {
      id: profile.id,
      user_id: profile.userId,
      lastProfile: profile.lastProfile,
      profileStored: profile.profileStored as any,
      created_at: profile.createdAt.toISOString(),
      updated_at: profile.updatedAt.toISOString(),
    };
  }
}
