export type Todo = {
  id: ReturnType<typeof crypto.randomUUID>;
  task: string;
  isCompleted: boolean;
  isSecret: boolean;
};
