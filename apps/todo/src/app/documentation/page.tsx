import { authOptions } from '@users/auth.options';
import { ThemeSwitcher } from '@theme/components/theme-switcher';
import { getServerSession } from 'next-auth';

const DocumentationPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <main className="container flex justify-between items-start py-8">
      <article className="flex flex-col gap-4 [&_h1]:text-3xl [&_h2]:text-2xl [&_li]:list-inside [&_li]:list-disc">
        <h1>Documentation</h1>
        <h2>Librairies utilisées</h2>
        <ul>
          <li>TS-Rest</li>
          <li>React Query</li>
          <li>shadcn</li>
          <li>NextAuth</li>
          <li>T3 Env</li>
          <li>React Hook Form</li>
          <li>Zod</li>
        </ul>
        <h2>Difficultés</h2>
        <ul>
          <li>Authentification +++</li>
        </ul>
        <h2>Facilités</h2>
        <ul>
          <li>Zod</li>
          <li>Tailwind</li>
          <li>React Hook Form</li>
          <li>React Query</li>
        </ul>
      </article>
      {session ? <ThemeSwitcher /> : null}
    </main>
  );
};

export default DocumentationPage;
