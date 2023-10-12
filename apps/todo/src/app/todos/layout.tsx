import { isUserAuthorized } from '@users/users.helpers';
import { authOptions } from '@users/auth.options';
import { UserRole } from '@users/users.types';
import { SignOutButton } from '@users/components/auth-flow-sign-out-button';
import { UserRoleSelect } from '@users/components/user-role-select';
import { nextRoutes } from '@common/common.helpers';
import { Button } from '@common/components/ui/button';
import { ThemeSwitcher } from '@theme/components/theme-switcher';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

type TodosLayoutProps = PropsWithChildren;

const TodosLayout = async ({ children }: TodosLayoutProps) => {
  const session = await getServerSession(authOptions);

  const isModerator = isUserAuthorized(UserRole.Moderator, session?.user.role);

  return (
    <div className="container flex flex-col gap-8 py-8">
      <header className="flex justify-between items-center">
        <div className="flex gap-8 items-center flex-1">
          <h1>Todo</h1>
          <ThemeSwitcher />
          <UserRoleSelect />
        </div>
        <div className="flex gap-4">
          <p>Logged as {session?.user.mobilePhoneNumber}</p>
          <SignOutButton />
        </div>
      </header>
      <div className="flex gap-32">
        <aside className="w-64 flex-shrink-0">
          <nav className="flex flex-col gap-8 items-start">
            <div className="flex flex-col gap-4">
              <Link href={nextRoutes.getTodos()}>Public todos</Link>
              {isModerator ? <Link href={nextRoutes.getSecretTodos()}>Secret todos</Link> : null}
            </div>
            <Button asChild>
              <Link href={nextRoutes.getCreateTodo()}>Create todo</Link>
            </Button>
          </nav>
        </aside>
        <main className="flex flex-col gap-4">{children}</main>
      </div>
    </div>
  );
};

export default TodosLayout;
