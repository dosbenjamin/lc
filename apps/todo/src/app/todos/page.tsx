import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@common/components/ui/table';
import { inMemoryTodos } from '@todos/todos.data';

const TodosPage = async () => {
  const todos = Array.from(inMemoryTodos.values()).filter(({ isSecret }) => !isSecret);

  return (
    <>
      <h2 className="text-3xl">Todos</h2>
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

export default TodosPage;
