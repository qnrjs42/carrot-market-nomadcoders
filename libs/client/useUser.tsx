import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function useUser() {
  const { data, error } = useSWR('/api/users/me');
  const router = useRouter();

  useEffect((): void => {
    if (data && !data.ok) {
      router.replace('/enter');
    }
  }, [data, router]);

  // const router = useRouter();

  return { user: data?.profile, isLoading: !data && !error };
}
