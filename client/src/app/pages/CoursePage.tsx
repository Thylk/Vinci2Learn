import PostCourseForm from '../../modules/courses/PostCourseForm.tsx';
import CourseTable from '../../modules/courses/CourseTable.tsx';

export default function CoursePage() {
  return (
    <div>
      <h1>Course Page</h1>
      <CourseTable />
      <PostCourseForm />
    </div>
  );
}
