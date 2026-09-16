import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

describe('CoursesService', () => {
  let service: CoursesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        {
          provide: PrismaService,
          useValue: {
            course: {
              findMany: vi.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('deve retornar a lista de cursos com ofertas e parcelas', async () => {
      const mockedCourses = [
        {
          id: 1,
          modality: 'Presencial',
          offers: [
            {
              id: 1,
              originalPrice: 1000,
              discountPrice: 800,
              installmentsOptions: [{ installments: 1, installmentValue: 800 }],
            },
          ],
        },
      ];

      vi.spyOn(prisma.course, 'findMany').mockResolvedValue(mockedCourses as any);

      const result = await service.findAll();

      expect(result).toEqual(mockedCourses);
      expect(prisma.course.findMany).toHaveBeenCalledTimes(1);
      
      expect(prisma.course.findMany).toHaveBeenCalledWith({
        include: {
          offers: {
            include: {
              installmentsOptions: true,
            },
          },
        },
      });
    });
  });
});
