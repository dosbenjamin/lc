'use client';

import type { FormEventHandler } from 'react';

const SignUpPage = () => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:3000/api/auth/callback/credentials', {
      method: 'POST',
    }).then(async (r) => await r.json());

    console.log(response);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="tel" type="tel" placeholder="num" />
      <button>Submit</button>
    </form>
  );
};

export default SignUpPage;
