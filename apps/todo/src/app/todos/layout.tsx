import { authOptions } from '@auth/auth.options';
import { SignOutButton } from '@auth/components/sign-out-button';
import { getServerSession } from 'next-auth';
import { PropsWithChildren } from 'react';

type TodosLayoutProps = PropsWithChildren;

const TodosLayout = async ({ children }: TodosLayoutProps) => {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col gap-4">
      <header className="flex justify-between">
        <h1>Todo</h1>
        <div className="flex gap-4">
          <p>Logged as {session?.user.mobilePhoneNumber}</p>
          <SignOutButton />
        </div>
      </header>
      <div className="flex gap-8">
        <aside>hello</aside>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default TodosLayout;
