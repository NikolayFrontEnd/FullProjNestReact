import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}
  // Create a new user
  async createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }
  // Find a user by email
  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}