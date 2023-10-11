import { SignInCredentialsType } from '@auth/auth.types';
import { z } from 'zod';

export const SignInCredentialsTypeSchema = z.nativeEnum(SignInCredentialsType);

export const AuthInitSchema = z.object({
  mobilePhoneNumber: z.string().min(1),
});

export const SignUpSchema = z.object({
  mobilePhoneNumber: z.string().min(1),
  verificationCode: z.string().length(4),
});

export const SignUpInfoSchema = z.object({
  userId: z.string().min(1).uuid(),
  firstname: z.string().min(1).max(100),
  lastname: z.string().min(1).max(100),
  emailAddress: z.string().email().optional(),
});

export const SignInSchema = z.object({
  credentialsType: SignInCredentialsTypeSchema,
  mobilePhoneNumber: z.string().min(1),
  verificationCode: z.string().optional(),
  password: z.string().optional(),
});
