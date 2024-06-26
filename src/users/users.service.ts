import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { Password } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  public async getAll(): Promise<User[]> {
    return this.prismaService.user.findMany({
      include: {
        books: {
          include: {
            book: true,
          },
        },
      },
    });
  }

  public getById(id: User['id']): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  public getByEmail(
    email: User['email'],
  ): Promise<(User & { password: Password }) | null> {
    return this.prismaService.user.findUnique({
      where: { email },
      include: { password: true },
    });
  }

  public async create(
    userData: Omit<User, 'id' | 'role'>,
    password: string,
  ): Promise<User> {
    try {
      return await this.prismaService.user.create({
        data: {
          ...userData,
          password: {
            create: {
              hashedPassword: password,
            },
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email is already taken');
      }
      throw error;
    }
  }

  public async updateById(
    id: User['id'],
    userData: Omit<User, 'id'>,
    password?: string | undefined,
  ): Promise<User> {
    try {
      if (!password) {
        return await this.prismaService.user.update({
          where: { id },
          data: userData,
        });
      }
      return await this.prismaService.user.update({
        where: { id },
        data: {
          ...userData,
          password: {
            update: {
              hashedPassword: password,
            },
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email is already taken');
      }
      throw error;
    }
  }

  public deleteById(id: User['id']): Promise<User> {
    return this.prismaService.user.delete({
      where: { id },
    });
  }
}
