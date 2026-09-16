import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    return this.prisma.course.findMany({
      include: {
        offers: {
          include: {
            installmentsOptions: true,
          },
        },
      },
    });
  }
}
