import { z } from 'zod';

export const CreateTodoSchema = z.object({
  task: z.string().min(1),
  isCompleted: z.boolean(),
  isSecret: z.boolean(),
});
