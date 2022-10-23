import { NextApiRequest, NextApiResponse } from 'next';

import client from '@libs/server/client';
import withApiSession from '@libs/server/withSession';
import withHandler, { ResponseType } from '@libs/server/withHandler';

const productsFavApi = async (req: NextApiRequest, res: NextApiResponse<ResponseType>) => {
  const {
    query: { id },
    session: { user },
  } = req.query;

  const alreadytExists = await client.fav.findFirst({
    where: {
      productId: +id.toString(),
      userId: user?.id,
    },
  });

  if (alreadytExists) {
    // delete
    await client.fav.delete({
      where: {
        id: alreadytExists.id,
      },
    });
  } else {
    // create
    await client.fav.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        product: {
          connect: {
            id: +id.toString(),
          },
        },
      },
    });
  }

  res.json({ ok: true });
};

export default withApiSession(withHandler({ methods: ['POST'], handler: productsFavApi }));
