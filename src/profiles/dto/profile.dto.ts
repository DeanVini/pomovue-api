import { IsString, IsNumber, IsOptional, IsArray, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProfileDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(1)
  focusTime: number;

  @IsNumber()
  @Min(1)
  break: number;

  @IsNumber()
  @Min(1)
  longBreak: number;
}

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  focusTime?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  break?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  longBreak?: number;
}

export class CreateProfileContainerDto {
  @IsOptional()
  @IsNumber()
  lastProfile?: number = 1;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProfileDto)
  profileStored: CreateProfileDto[];
}

export class UpdateProfileContainerDto {
  @IsOptional()
  @IsNumber()
  lastProfile?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateProfileDto)
  profileStored?: UpdateProfileDto[];
}
