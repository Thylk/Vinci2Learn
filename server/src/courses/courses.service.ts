import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
  ) {}

  create(createCourseDto: CreateCourseDto) {
    return this.coursesRepository.save(createCourseDto);
  }

  findAll() {
    return this.coursesRepository.find();
  }

  findOne(id: number) {
    return this.coursesRepository.findOneBy({ id });
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return this.coursesRepository.update(id, updateCourseDto);
  }

  remove(id: number) {
    return this.coursesRepository.delete(id);
  }
}
