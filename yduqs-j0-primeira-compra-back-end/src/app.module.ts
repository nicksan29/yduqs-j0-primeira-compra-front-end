import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module.js';
import { CoursesModule } from './courses/courses.module.js';
import { EnrollmentsModule } from './enrollments/enrollments.module.js';

@Module({
  imports: [PrismaModule, CoursesModule, EnrollmentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
