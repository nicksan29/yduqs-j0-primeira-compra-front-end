import { Controller, Get } from '@nestjs/common';
import { CoursesService } from './courses.service.js';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) { }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }
}
