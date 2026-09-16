import { Injectable, ConflictException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto.js';

@Injectable()
export class EnrollmentsService {
  private readonly logger = new Logger(EnrollmentsService.name);

  constructor(private prisma: PrismaService) { }

  async create(createEnrollmentDto: CreateEnrollmentDto) {
    this.logger.log({ msg: 'Iniciando criação de matrícula', cpf: createEnrollmentDto.cpf });

    const existingEnrollment = await this.prisma.enrollment.findUnique({
      where: { cpf: createEnrollmentDto.cpf },
    });

    if (existingEnrollment) {
      this.logger.warn({ msg: 'Matrícula recusada: CPF já existe', cpf: createEnrollmentDto.cpf });
      throw new ConflictException('Já existe uma matrícula para este CPF!');
    }

    const enrollment = await this.prisma.enrollment.create({
      data: createEnrollmentDto,
    });

    this.logger.log({ msg: 'Matrícula criada com sucesso', enrollmentId: enrollment.id });
    return enrollment;
  }
}
