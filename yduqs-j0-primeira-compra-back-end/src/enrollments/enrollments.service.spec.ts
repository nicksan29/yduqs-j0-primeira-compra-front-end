import { Test, TestingModule } from '@nestjs/testing';
import { EnrollmentsService } from './enrollments.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { ConflictException } from '@nestjs/common';

describe('EnrollmentsService', () => {
  let service: EnrollmentsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnrollmentsService,
        {
          provide: PrismaService,
          useValue: {
            enrollment: {
              findUnique: vi.fn(),
              create: vi.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<EnrollmentsService>(EnrollmentsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const mockDto = {
      name: 'Nicolas Sandoli',
      cpf: '111.222.333-44',
      birthDate: '29/12/2001',
      email: 'nicolas@teste.com',
      phone: '(11) 99999-9999',
      graduationYear: '2020',
      terms: true,
      whatsapp: true,
    };

    it('deve criar uma matrícula quando o CPF é único', async () => {
      vi.spyOn(prisma.enrollment, 'findUnique').mockResolvedValue(null);
      
      const createdEnrollment = { id: 1, ...mockDto, createdAt: new Date() };
      vi.spyOn(prisma.enrollment, 'create').mockResolvedValue(createdEnrollment as any);

      const result = await service.create(mockDto);

      expect(result).toEqual(createdEnrollment);
      
      expect(prisma.enrollment.findUnique).toHaveBeenCalledWith({
        where: { cpf: mockDto.cpf },
      });

      expect(prisma.enrollment.create).toHaveBeenCalledWith({
        data: mockDto,
      });
    });

    it('deve lançar ConflictException quando o CPF já existir', async () => {
      const existingRecord = { id: 1, ...mockDto, createdAt: new Date() };
      vi.spyOn(prisma.enrollment, 'findUnique').mockResolvedValue(existingRecord as any);

      await expect(service.create(mockDto)).rejects.toThrow(ConflictException);
      await expect(service.create(mockDto)).rejects.toThrow('Já existe uma matrícula para este CPF!');

      expect(prisma.enrollment.create).not.toHaveBeenCalled();
    });
  });
});
