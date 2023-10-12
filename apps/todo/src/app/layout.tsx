import '@styles/globals.css';
import { SessionProvider } from '@auth/components/session-provider';
import { QueryClientProvider } from '@lib/react-query/query-client-provider';
import type { PropsWithChildren } from 'react';
import { getTheme } from '@theme/theme.helpers';

type RootLayoutProps = PropsWithChildren;

const RootLayout = async ({ children }: RootLayoutProps) => {
  const theme = await getTheme();

  return (
    <html lang="en" data-theme={theme}>
      <body className="bg-background text-foreground min-h-screen antialiased p-8">
        <QueryClientProvider>
          <SessionProvider>{children}</SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
