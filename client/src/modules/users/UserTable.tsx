import { Table } from 'flowbite-react';
import { useQuery } from '@tanstack/react-query';
import useUserRequest from './useUserRequest.ts';
import { User } from './User.ts';

export default function UserTable() {
  const { getUsers } = useUserRequest();

  const { status, data } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  return (
    <Table striped>
      <Table.Head>
        <Table.HeadCell>Rank</Table.HeadCell>
        <Table.HeadCell>Username</Table.HeadCell>
        <Table.HeadCell>Level</Table.HeadCell>
        <Table.HeadCell>Exp</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {status === 'success' &&
          data.map((user: User, index: number) => (
            <Table.Row key={user.id} className="bg-white dark:border-gray-700">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                {index + 1}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                {user.username}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                {user.level}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                {user.exp}
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
}
