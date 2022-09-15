import { NextApiRequest, NextApiResponse } from 'next';

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

type method = 'GET' | 'POST' | 'DELETE';

interface ConfigType {
  methods: method[];
  isPrivate?: boolean;
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
}

const withHandler = ({ methods, isPrivate = true, handler }: ConfigType) => {
  return async function (req: NextApiRequest, res: NextApiResponse): Promise<any> {
    if (req.method && !methods.includes(req.method as method)) {
      return res.status(405).end();
    }
    if (isPrivate && !req.session.user) {
      return res.status(401).json({ ok: false, error: 'plz log in.' });
    }
    try {
      await handler(req, res);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err });
    }
  };
};

export default withHandler;
