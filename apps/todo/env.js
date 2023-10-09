import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  shared: {
    NEXTAUTH_URL: z.string().min(1).url(),
    NEXTAUTH_SECRET: z.string().min(1),
    API_URL: z.string().min(1).url(),
  },
  runtimeEnv: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    API_URL: process.env.API_URL,
  },
});
