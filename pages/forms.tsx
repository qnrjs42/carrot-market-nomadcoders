import { NextPage } from 'next';
import React, { useState } from 'react';

const FormsPage: NextPage = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onUsernameChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  };

  const onSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(username);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        required
        value={username}
        onChange={onUsernameChange}
        type='text'
        placeholder='Username'
      />
      <input required value={email} type='email' placeholder='Email' />
      <input required value={password} type='passowrd' placeholder='Password' />
      <input type='submit' value='Create Account' />
    </form>
  );
};

export default FormsPage;
