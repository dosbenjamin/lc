import { authOptions } from '@auth/auth.options';
import { getServerSession } from 'next-auth';

const SignUpPage = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);

  return <div>SignUp</div>;
};

export default SignUpPage;
