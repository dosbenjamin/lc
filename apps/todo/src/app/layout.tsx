import { SessionProvider } from '@auth/components/session-provider';
import { QueryClientProvider } from '@lib/react-query/query-client-provider';
import type { PropsWithChildren } from 'react';

type RootLayoutProps = PropsWithChildren;

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en">
    <body>
      <QueryClientProvider>
        <SessionProvider>{children}</SessionProvider>
      </QueryClientProvider>
    </body>
  </html>
);

export default RootLayout;
