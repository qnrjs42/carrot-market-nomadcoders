import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';

import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

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

export default withIronSessionApiRoute(withHandler('GET', meApi), {
  cookieName: 'carrotsession',
  password: '312903812093812093123027038213312903812093812093123027038213asldznxjcznx',
});
