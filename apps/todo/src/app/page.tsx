import { nextRoutes } from '@common/common.helpers';
import { Button } from '@common/components/ui/button';
import Link from 'next/link';

const links = [
  {
    label: 'Login',
    href: nextRoutes.getLogin(),
    img: 'https://images.unsplash.com/photo-1693801873499-0b870dfca80a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2338&q=80',
  },
  {
    label: 'Sign up',
    href: nextRoutes.getSignUp(),
    img: 'https://images.unsplash.com/photo-1682687221073-53ad74c2cad7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
  },
];

const HomePage = () => (
  <main className="grid place-content-center h-screen">
    <div className="flex gap-8">
      {links.map(({ href, img, label }) => (
        <div key={href} className="p-4 rounded-xl bg-secondary max-w-xs flex flex-col gap-4">
          <img className="aspect-[16/10] rounded-md" src={img} />
          <Button asChild>
            <Link href={href}>{label}</Link>
          </Button>
        </div>
      ))}
    </div>
  </main>
);

export default HomePage;
