import { Course } from '../../courses/entities/course.entity';

export class CreateLessonDto {
  name: string;
  course: Course;
}
