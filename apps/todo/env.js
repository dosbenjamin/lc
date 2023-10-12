import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  shared: {
    NEXTAUTH_URL: z.string().min(1).url().optional(),
    NEXTAUTH_SECRET: z.string().min(1),
    API_URL: z.string().min(1).url(),
  },
  runtimeEnv: {
    NEXTAUTH_URL: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
});
