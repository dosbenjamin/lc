import { getQueryClient } from '@common/common.helpers';
import { Hydrate, dehydrate } from '@tanstack/react-query';
import { TodosTable } from '@todos/components/todos-table';
import { getAllTodos, todosQueryKeys } from '@todos/todos.helpers';
import { userAuthorizationGuard } from '@users/users.helpers';
import { UserRole } from '@users/users.types';

const SecretTodosPage = async () => {
  await userAuthorizationGuard(UserRole.Moderator);

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(todosQueryKeys.readTodos(), getAllTodos);
  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <h2 className="text-3xl">Secret todos</h2>
      <Hydrate state={dehydratedState}>
        <TodosTable />
      </Hydrate>
    </>
  );
};

export default SecretTodosPage;
