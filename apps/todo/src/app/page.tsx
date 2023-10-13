import { nextRoutes } from '@common/common.helpers';
import { Button } from '@common/components/ui/button';
import { getSecretTodos, getTodos } from '@todos/todos.helpers';
import { UserAuthorizationGuard } from '@users/components/user-authorization-guard.server';
import { isAuthenticated } from '@users/users.helpers';
import { UserRole } from '@users/users.types';
import Link from 'next/link';

const HomePage = async () => {
  if (await isAuthenticated()) {
    const todos = getTodos();
    const secretTodos = getSecretTodos();

    return (
      <main className="p-8">
        <p>You have {todos.length} todos</p>
        <UserAuthorizationGuard role={UserRole.Moderator}>
          <p>You have {secretTodos.length} secret todos</p>
        </UserAuthorizationGuard>
        <Link href={nextRoutes.getTodos()}>Go back to todos</Link>
      </main>
    );
  }

  return (
    <main className="flex gap-4 p-8">
      <Button asChild variant="link">
        <Link href={nextRoutes.getLogin()}>Login</Link>
      </Button>
      <Button asChild variant="link">
        <Link href={nextRoutes.getSignUp()}>Sign up</Link>
      </Button>
    </main>
  );
};

export default HomePage;
