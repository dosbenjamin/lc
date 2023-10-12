const DocumentationPage = () => (
  <main className="flex flex-col gap-4 [&_h1]:text-3xl [&_h2]:text-2xl [&_li]:list-inside [&_li]:list-disc">
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
  </main>
);

export default DocumentationPage;
