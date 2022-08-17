import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';

import client from '@libs/server/client';
import withHandler, { ResponseType } from '@libs/server/withHandler';

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const enterApi = async (req: NextApiRequest, res: NextApiResponse<ResponseType>) => {
  const { token } = req.body;

  const exists = await client.token.findUnique({
    where: { payload: token },
  });

  if (!exists) return res.status(404).end();

  req.session.user = {
    id: exists?.userId,
  };

  await req.session.save();

  return res.status(200).end();
};

export default withIronSessionApiRoute(withHandler('POST', enterApi), {
  cookieName: 'carrotsession',
  password: '312903812093812093123027038213312903812093812093123027038213asldznxjcznx',
});
