import PostLessonForm from '../../modules/lessons/PostLessonForm.tsx';
import LessonTable from '../../modules/lessons/LessonTable.tsx';

export default function LessonPage() {
  return (
    <div>
      <h1>Lesson Page</h1>
      <LessonTable />
      <PostLessonForm />
    </div>
  );
}
