import React from 'react';
import AuthForm from '../AuthForm';

const fields = [
  {
    name: 'email',
    type: 'email',
    placeholder: 'Email',
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Password',
  },
];

function SignIn({ isSigningIn, signIn }) {
  return (
    <AuthForm
      fields={fields}
      submitText="Войти"
      onSubmit={userData => signIn(userData)}
      isRequested={isSigningIn}
    />
  );
}

export default SignIn;
