import { nextRoutes } from '@common/common.helpers';
import { Button } from '@common/components/ui/button';
import Link from 'next/link';

const UnauthenticatedHomePage = () => (
  <main className="flex gap-4 p-8">
    <Button asChild variant="link">
      <Link href={nextRoutes.login()}>Login</Link>
    </Button>
    <Button asChild variant="link">
      <Link href={nextRoutes.signUp()}>Sign up</Link>
    </Button>
  </main>
);

export default UnauthenticatedHomePage;
