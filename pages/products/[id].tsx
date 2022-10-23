import useSWR from 'swr';
import Link from 'next/link';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import Layout from '@components/layout';
import { Product, User } from '@prisma/client';
import useMutation from '@libs/client/useMutation';
import { cls } from '@libs/client/utils';

interface ProductWithUser extends Product {
  user: User;
}

interface ItemDetailResponse {
  ok: boolean;
  product: ProductWithUser;
  relatedProducts: Product[];
  isLiked: boolean;
}

const ItemDetail: NextPage = () => {
  const router = useRouter();
  console.log(router.query);

  const { data } = useSWR<ItemDetailResponse>(
    router.query.id ? `/api/products/${router.query.id}` : null,
  );

  const [toggleFav] = useMutation(`/api/products/${router.query.id}/fav`);

  const onFavClick = () => {
    toggleFav({});
  };

  return (
    <Layout canGoBack>
      <div className='px-4 py-10'>
        <div className='mb-8'>
          <div className='h-96 bg-slate-300' />
          <div className='flex cursor-pointer py-3 border-t border-b items-center space-x-3'>
            <div className='w-12  h-12 rounded-full bg-slate-300' />
            <div>
              <p className='text-sm font-medium text-gray-700'>{data?.product.user?.name}</p>
              <Link href={`/users/profiles/${data?.product?.user?.id}`}>
                <a className='text-xs font-medium text-gray-500'>View profile &rarr;</a>
              </Link>
            </div>
          </div>
          <div className='mt-5'>
            <h1 className='text-3xl font-bold text-gray-900'>{data?.product.name}</h1>
            <p className='text-3xl block mt-3 text-gray-900'>${data?.product.price}</p>
            <p className='text-base my-6 text-gray-700'>{data?.product.description}</p>
            <div className='flex items-center justify-between space-x-2'>
              <button className='flex-1 bg-orange-500 text-white py-3 rounded-md font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'>
                Talk to seller
              </button>
              <button
                onClick={onFavClick}
                className={cls(
                  'p-3 rounded-md flex items-center justify-center  hover:bg-gray-100',
                  data?.isLiked
                    ? 'text-red-400 hover:text-red-500'
                    : 'text-gray-400 hover:text-gray-500',
                )}
              >
                {data?.isLiked ? (
                  <svg
                    className='w-6 h-6'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
                      clipRule='evenodd'
                    />
                  </svg>
                ) : (
                  <svg
                    className='h-6 w-6 '
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
                      d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className='text-2xl font-bold text-gray-900'>Similar items</h2>
          <div className='grid grid-cols-2 gap-4'>
            {data?.relatedProducts.map((product, i) => (
              <div key={product.id}>
                <div className='mb-6 h-56 w-full bg-slate-300' />
                <h3 className='text-gray-700 -mb-1'>{product.name}</h3>
                <p className='text-xs font-medium text-gray-900'>$${product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
