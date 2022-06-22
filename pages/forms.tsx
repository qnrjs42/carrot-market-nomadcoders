import { NextPage } from 'next';
import React, { useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';

interface LoginForm {
  username: string;
  email: string;
  password: string;
}

const FormsPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onValid = (data: LoginForm) => {
    console.log('im valid bby', data);
  };
  const onInValid = (errors: FieldErrors) => {
    console.log(errors);
  };

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onValid, onInValid)}>
      <input
        {...register('username', {
          required: 'Username is Required',
          minLength: {
            message: 'The username should be 5',
            value: 5,
          },
        })}
        type='text'
        placeholder='Username'
      />
      <input
        {...register('email', {
          required: 'Email is Required',
          validate: {
            notGamil: value => !value.includes('@gmail.com') || 'Gmail is not allowed',
          },
        })}
        type='email'
        placeholder='Email'
        className={`${Boolean(errors.email?.message) ? 'border-red-500' : ''}`}
      />
      {errors.email?.message}
      <input
        {...register('password', { required: 'Password is Required' })}
        type='password'
        placeholder='Password'
      />
      <input type='submit' value='Create Account' />
    </form>
  );
};

export default FormsPage;
