import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { Repository } from 'typeorm';
import { Lesson } from './entities/lesson.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonsRepository: Repository<Lesson>,
  ) {}

  create(createLessonDto: CreateLessonDto) {
    return this.lessonsRepository.save(createLessonDto);
  }

  findAll() {
    return this.lessonsRepository.find();
  }
}
