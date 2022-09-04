import { NextApiRequest, NextApiResponse } from 'next';

import client from '@libs/server/client';
import withApiSession from '@libs/server/withSession';
import withHandler, { ResponseType } from '@libs/server/withHandler';

const meApi = async (req: NextApiRequest, res: NextApiResponse<ResponseType>) => {
  console.log(req.session.user);

  const profile = await client.user.findUnique({
    where: { id: req.session.user?.id },
  });

  return res.json({
    ok: true,
    profile,
  });
};

export default withApiSession(withHandler({ method: 'GET', handler: meApi }));
