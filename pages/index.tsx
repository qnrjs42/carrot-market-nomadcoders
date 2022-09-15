import type { NextPage } from 'next';
import Layout from '@components/layout';

import useUser from '@libs/client/useUser';
import Head from 'next/head';
import useSWR from 'swr';
import Item from '@components/item';
import { Product } from '@prisma/client';

interface ProductsResponse {
  ok: boolean;
  products: Product[];
}

const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  const { data } = useSWR<ProductsResponse>('/api/products');

  console.log(data);

  return (
    <Layout title='홈' hasTabBar>
      <Head>
        <title>Home</title>
      </Head>
      <div className='flex flex-col space-y-5'>
        {data?.products?.map((product: Product) => (
          <Item
            key={product.id}
            id={product.id}
            title={product.name}
            price={product.price}
            image={product.image}
            hearts={1}
          />
        ))}
        <button className='fixed hover:bg-orange-500 transition-colors cursor-pointer bottom-24 right-5 shadow-xl bg-orange-400 rounded-full p-4 text-white'>
          <svg
            className='h-6 w-6'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            aria-hidden='true'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M12 6v6m0 0v6m0-6h6m-6 0H6'
            />
          </svg>
        </button>
      </div>
    </Layout>
  );
};

export default Home;
