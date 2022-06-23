import { useState } from 'react';

type ReturnTypes = [
  (data: any) => void,
  { loading: boolean; data: any | undefined; error: any | undefined },
];

export default function useMutation(url: string): ReturnTypes {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any | undefined>(undefined);
  const [error, setError] = useState<any | undefined>(undefined);

  const mutation = (data: any) => {};

  return [mutation, { loading, data, error }];
}
