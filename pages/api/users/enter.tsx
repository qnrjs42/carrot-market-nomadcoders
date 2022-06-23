import { NextApiRequest, NextApiResponse } from 'next';

import client from '../../../libs/server/client';

const enterApi = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body.email);

  if (req.method !== 'POST') {
    res.status(401).end();
  }
  res.status(200).end();
};

export default enterApi;
