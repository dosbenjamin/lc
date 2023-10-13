'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@common/components/ui/table';
import { useReadTodos } from '@todos/hooks/use-read-todos';

export const TodosTable = () => {
  const { data: todos } = useReadTodos();
  const secretTodos = todos?.filter(({ isSecret }) => isSecret);

  return (
    <Table>
      <TableCaption>A list of todos</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-96">Task</TableHead>
          <TableHead>Completed</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {secretTodos?.map(({ id, task, isCompleted }) => (
          <TableRow key={id}>
            <TableCell>{task}</TableCell>
            <TableCell>{String(isCompleted)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
