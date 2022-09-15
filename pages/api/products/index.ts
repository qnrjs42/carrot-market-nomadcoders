import { NextApiRequest, NextApiResponse } from 'next';

import client from '@libs/server/client';
import withApiSession from '@libs/server/withSession';
import withHandler, { ResponseType } from '@libs/server/withHandler';

const productsApi = async (req: NextApiRequest, res: NextApiResponse<ResponseType>) => {
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

export default withApiSession(withHandler({ method: 'POST', handler: productsApi }));
