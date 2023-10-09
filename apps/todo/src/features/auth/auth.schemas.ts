import { SignInCredentialsType } from '@auth/auth.types';
import { z } from 'zod';

export const SignInCredentialsTypeSchema = z.nativeEnum(SignInCredentialsType);

export const AccessSchema = z.object({
  mobilePhoneNumber: z.string().min(1).trim(),
});

export const SignUpSchema = z.object({
  mobilePhoneNumber: z.string().min(1).trim(),
  verificationCode: z.string().length(4).trim(),
});

export const SignInSchema = z.object({
  credentialsType: SignInCredentialsTypeSchema,
  mobilePhoneNumber: z.string().min(1),
  verificationCode: z.string().optional(),
  password: z.string().optional(),
});
