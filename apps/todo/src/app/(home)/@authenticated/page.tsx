import { nextRoutes } from '@common/common.helpers';
import { getSecretTodos, getTodos } from '@todos/todos.helpers';
import { UserAuthorizationGuard } from '@users/components/user-authorization-guard.server';
import { UserRole } from '@users/users.types';
import Link from 'next/link';

const AuthenticatedHomePage = async () => {
  const todos = getTodos();
  const secretTodos = getSecretTodos();

  return (
    <main className="p-8">
      <p>You have {todos.length} todos</p>
      <UserAuthorizationGuard role={UserRole.Moderator}>
        <p>You have {secretTodos.length} secret todos</p>
      </UserAuthorizationGuard>
      <Link href={nextRoutes.todos()}>Go back to todos</Link>
    </main>
  );
};

export default AuthenticatedHomePage;
