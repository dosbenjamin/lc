import { z } from 'zod';

export const SignInCredentialsTypeSchema = z.enum(['SmsCode', 'Password']);
