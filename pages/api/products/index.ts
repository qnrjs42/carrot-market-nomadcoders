import { NextApiRequest, NextApiResponse } from 'next';

import client from '@libs/server/client';
import withApiSession from '@libs/server/withSession';
import withHandler, { ResponseType } from '@libs/server/withHandler';

const getHandler = async (req: NextApiRequest, res: NextApiResponse<ResponseType>) => {
  const products = await client.product.findMany({});
  return res.json({
    ok: true,
    products,
  });
};

const postHandler = async (req: NextApiRequest, res: NextApiResponse<ResponseType>) => {
  const {
    body: { name, price, description },
    session: { user },
  } = req;

  const product = await client.product.create({
    data: {
      name,
      price: Number(price),
      description,
      image: 'xx',
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });

  return res.json({
    ok: true,
    product,
  });
};

const productsApi = async (req: NextApiRequest, res: NextApiResponse<ResponseType>) => {
  if (req.method === 'GET') {
    return getHandler(req, res);
  } else if (req.method === 'POST') {
    return postHandler(req, res);
  }
};

export default withApiSession(withHandler({ methods: ['GET', 'POST'], handler: productsApi }));
