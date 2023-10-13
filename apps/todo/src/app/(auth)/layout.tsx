import { nextRoutes } from '@common/common.helpers';
import { redirectIfAuthentificated } from '@users/users.helpers';
import type { PropsWithChildren } from 'react';

type AuthLayoutProps = PropsWithChildren;

const AuthLayout = async ({ children }: AuthLayoutProps) => {
  await redirectIfAuthentificated(nextRoutes.getTodos());

  return (
    <main className="flex [&>*]:h-screen">
      <section className="w-3/5 flex p-4 justify-center items-center">
        <div className="w-full max-w-lg [&_form]:flex [&_form]:flex-col [&_form]:gap-6">{children}</div>
      </section>
      <section className="flex-1">
        <img
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1682685797857-97de838c192e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2487&q=80"
        />
      </section>
    </main>
  );
};

export default AuthLayout;
