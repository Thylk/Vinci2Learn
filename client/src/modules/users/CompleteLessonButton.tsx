import { Button } from 'flowbite-react';
import useUserRequest from './useUserRequest.ts';

export default function CompleteLessonButton() {
  const { completeLesson } = useUserRequest();

  const handleClick = async () => {
    await completeLesson();
  };

  return (
    <Button type="submit" className="mt-2 font-bold" onClick={handleClick}>
      Complete
    </Button>
  );
}
