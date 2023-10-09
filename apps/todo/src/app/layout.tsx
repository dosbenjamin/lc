import type { PropsWithChildren } from 'react';

type RootLayoutProps = PropsWithChildren;

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
