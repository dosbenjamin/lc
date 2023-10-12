import { nextRoutes } from '@common/common.helpers';
import { Button } from '@common/components/ui/button';
import Link from 'next/link';

const links = [
  {
    label: 'Login',
    href: nextRoutes.getLogin(),
  },
  {
    label: 'Sign up',
    href: nextRoutes.getSignUp(),
  },
];

const HomePage = () => (
  <main className="flex gap-4">
    {links.map(({ href, label }) => (
      <Link className="hover:opacity-50 transition-opacity" key={href} href={href}>
        {label}
      </Link>
    ))}
  </main>
);

export default HomePage;
