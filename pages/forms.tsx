import { NextPage } from 'next';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const FormsPage: NextPage = () => {
  const { register, handleSubmit } = useForm();

  const onValid = () => {
    console.log('im valid bby');
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register('username', { required: true })}
        required
        type='text'
        placeholder='Username'
      />
      <input {...register('email', { required: true })} required type='email' placeholder='Email' />
      <input
        {...register('password', { required: true })}
        required
        type='password'
        placeholder='Password'
      />
      <input type='submit' value='Create Account' />
    </form>
  );
};

export default FormsPage;
