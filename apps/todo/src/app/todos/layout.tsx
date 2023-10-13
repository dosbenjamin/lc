import { getSession } from '@users/users.helpers';
import { UserRole } from '@users/users.types';
import { SignOutButton } from '@users/components/auth-flow-sign-out-button';
import { UserRoleSelect } from '@users/components/user-role-select';
import { nextRoutes } from '@common/common.helpers';
import { Button } from '@common/components/ui/button';
import { ThemeSwitcher } from '@theme/components/theme-switcher';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { UserAuthorizationGuard } from '@users/components/user-authorization-guard.server';

type TodosLayoutProps = PropsWithChildren;

const TodosLayout = async ({ children }: TodosLayoutProps) => {
  const session = await getSession();

  return (
    <div className="container flex flex-col gap-8 py-8">
      <header className="flex justify-between items-center">
        <div className="flex gap-8 items-center flex-1">
          <h1>
            <Link href={nextRoutes.getHome()}>Todo</Link>
          </h1>
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
              <UserAuthorizationGuard role={UserRole.Moderator}>
                <Link href={nextRoutes.getSecretTodos()}>Secret todos</Link>
              </UserAuthorizationGuard>
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
