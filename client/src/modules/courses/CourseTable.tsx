import { Table } from 'flowbite-react';
import { useQuery } from '@tanstack/react-query';
import { Course } from './Course.ts';
import useCourseRequest from './useCourseRequest.ts';

export default function CourseTable() {
  const { getCourses } = useCourseRequest();

  const { status, data } = useQuery({
    queryKey: ['courses'],
    queryFn: getCourses,
  });

  return (
    <Table striped>
      <Table.Head>
        <Table.HeadCell>Name</Table.HeadCell>
        <Table.HeadCell>Actions</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {status === 'success' &&
          data.map((course: Course) => (
            <Table.Row
              key={course.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {course.name}
              </Table.Cell>
              <Table.Cell className="inline-flex space-x-2">
                {/*<CompleteLessonModal lesson={lesson} />*/}
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
}
