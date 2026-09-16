import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto.js';

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) { }

  async create(createEnrollmentDto: CreateEnrollmentDto) {
    const existingEnrollment = await this.prisma.enrollment.findUnique({
      where: { cpf: createEnrollmentDto.cpf },
    });

    if (existingEnrollment) {
      throw new ConflictException('Já existe uma matrícula para este CPF!');
    }

    return this.prisma.enrollment.create({
      data: createEnrollmentDto,
    });
  }
}
