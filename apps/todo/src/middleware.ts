import { env } from '@env';
import { withAuth } from 'next-auth/middleware';

export const middleware = withAuth({
  secret: env.NEXTAUTH_SECRET,
});

export const config = {
  matcher: ['/todos/:path*'],
};
