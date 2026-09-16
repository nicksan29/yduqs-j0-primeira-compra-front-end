import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.enrollment.deleteMany();
  await prisma.installmentOption.deleteMany();
  await prisma.offer.deleteMany();
  await prisma.course.deleteMany();

  await prisma.course.create({
    data: {
      id: 'c1',
      title: 'Curso do curso que faz curso ',
      offers: {
        create: [
          {
            id: 'offer-1',
            modality: 'Presencial',
            shift: 'Manhã',
            originalPrice: 4752.00,
            discountPrice: 2613.60,
            campus: {
              name: 'CAMPINAS - VILA INDUSTRIAL',
              address: 'RUA DR. SALES DE OLIVEIRA, Nº 1661 - VILA INDUSTRIAL - CAMP...'
            },
            bolsaIncentivoTexto: 'A Bolsa Incentivo é um programa que oferece descontos durante todo o curso para alunos ingressantes, sujeito à análise de elegibilidade e renovação semestral conforme edital oficial da YDUQS.',
            installmentsOptions: {
              create: [
                { installments: 1, installmentValue: 2613.60, totalValue: 2613.60 },
                { installments: 3, installmentValue: 900.90, totalValue: 2702.70 },
                { installments: 6, installmentValue: 465.30, totalValue: 2791.80 },
                { installments: 9, installmentValue: 320.10, totalValue: 2880.90 },
                { installments: 12, installmentValue: 247.50, totalValue: 2946.00 },
                { installments: 15, installmentValue: 200.97, totalValue: 3014.55 },
                { installments: 18, installmentValue: 169.95, totalValue: 3059.10 }
              ]
            }
          },
          {
            id: 'offer-2',
            modality: 'Digital (EaD)',
            shift: 'Flexível',
            isEaDWithoutPrice: true,
            campus: {
              name: 'BARRA DA TIJUCA - TOM JOBIM',
              address: 'AV. DAS AMÉRICAS, 4.200, BLOCO 11 - BARRA DA TIJUCA...'
            },
            bolsaIncentivoTexto: 'A Bolsa Incentivo para cursos EaD é disponibilizada no momento da matrícula, após avaliação dos pré-requisitos e documentação exigida pela secretaria.'
          }
        ]
      }
    }
  });

  console.log('Seed executado com sucesso com os dados idênticos ao front-end!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
