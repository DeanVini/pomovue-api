import { Task as PrismaTask, Profile as PrismaProfile } from '@prisma/client';

export interface User {
  id: number;
  name: string;
  surname: string;
  username: string;
  email: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserResponse {
  id: number;
  name: string;
  surname: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserWithRelations extends UserResponse {
  tasks?: PrismaTask[];
  profiles?: PrismaProfile[];
}
