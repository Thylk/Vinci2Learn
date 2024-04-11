import { Table } from 'flowbite-react';
import { Lesson } from './Lesson.ts';
import useLessonRequest from './useLessonRequest.ts';
import { useQuery } from '@tanstack/react-query';
import CompleteLessonButton from '../users/CompleteLessonButton.tsx';

export default function LessonTable() {
  const { getLessons } = useLessonRequest();

  const { status, data } = useQuery({
    queryKey: ['lessons'],
    queryFn: getLessons,
  });

  return (
    <Table striped>
      <Table.Head>
        <Table.HeadCell>Name</Table.HeadCell>
        <Table.HeadCell>Actions</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {status === 'success' &&
          data.map((lesson: Lesson) => (
            <Table.Row
              key={lesson.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {lesson.name}
              </Table.Cell>
              <Table.Cell className="inline-flex space-x-2">
                <CompleteLessonButton />
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
}
