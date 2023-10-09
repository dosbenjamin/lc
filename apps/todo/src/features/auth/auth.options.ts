import { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      authorize: (credentials) => {
        console.log(credentials);

        return {} as never;
      },
      credentials: {},
    }),
  ],
  pages: {
    signIn: '/login',
  },
};
