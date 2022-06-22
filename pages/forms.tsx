import { NextPage } from 'next';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const FormsPage: NextPage = () => {
  const { register, watch } = useForm();

  console.log(watch());

  return (
    <form>
      <input {...register('username')} required type='text' placeholder='Username' />
      <input {...register('email')} required type='email' placeholder='Email' />
      <input {...register('password')} required type='password' placeholder='Password' />
      <input type='submit' value='Create Account' />
    </form>
  );
};

export default FormsPage;
