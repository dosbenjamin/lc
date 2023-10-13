import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@common/components/ui/table';
import { getSecretTodos } from '@todos/todos.helpers';

const SecretTodosPage = () => {
  const todos = getSecretTodos();

  return (
    <>
      <h2 className="text-3xl">Secret todos</h2>
      <Table>
        <TableCaption>A list of todos</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-96">Task</TableHead>
            <TableHead>Completed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos.map(({ id, task, isCompleted }) => (
            <TableRow key={id}>
              <TableCell>{task}</TableCell>
              <TableCell>{String(isCompleted)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default SecretTodosPage;
