import { IsString, IsBoolean, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTaskDto {
  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  finished?: boolean = false;

  @IsOptional()
  @IsBoolean()
  show?: boolean = true;
}

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  finished?: boolean;

  @IsOptional()
  @IsBoolean()
  show?: boolean;
}

export class CreateTaskContainerDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTaskDto)
  taskStored: CreateTaskDto[];
}

export class UpdateTaskContainerDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateTaskDto)
  taskStored?: UpdateTaskDto[];
}
