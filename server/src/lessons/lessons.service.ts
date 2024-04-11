import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
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

  findOne(id: number) {
    return this.lessonsRepository.findOneBy({ id });
  }

  update(id: number, updateLessonDto: UpdateLessonDto) {
    return this.lessonsRepository.update(id, updateLessonDto);
  }

  remove(id: number) {
    return this.lessonsRepository.delete(id);
  }
}
