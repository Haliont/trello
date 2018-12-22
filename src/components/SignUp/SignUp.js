import React from 'react';
import AuthForm from '../AuthForm';

const fields = [
  {
    name: 'first_name',
    type: 'text',
    placeholder: 'Имя',
  },
  {
    name: 'last_name',
    type: 'text',
    placeholder: 'Фамилия',
  },
  // {
  //   name: 'email',
  //   type: 'email',
  //   placeholder: 'Email',
  // },
  // {
  //   name: 'password',
  //   type: 'password',
  //   placeholder: 'Password',
  // },
];

function SignUp({ isSigningUp, signUp }) {
  return (
    <AuthForm
      fields={fields}
      submitText="Войти"
      onSubmit={userData => signUp(userData)}
      isRequested={isSigningUp}
    />
  );
}

export default SignUp;
