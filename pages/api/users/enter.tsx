import twilio from 'twilio';
import { NextApiRequest, NextApiResponse } from 'next';

import client from '@libs/server/client';
import smtpTransport from '@libs/server/email';
import withHandler, { ResponseType } from '@libs/server/withHandler';

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

const enterApi = async (req: NextApiRequest, res: NextApiResponse<ResponseType>) => {
  const { phone, email } = req.body;
  const user = phone ? { phone: +phone } : { email };
  if (!user) return res.json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 900000) + '';

  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: 'Anonymous',
            ...user,
          },
        },
      },
    },
  });

  if (phone) {
    // const message = await twilioClient.messages.create({
    //   messagingServiceSid: process.env.TWILIO_MSID,
    //   to: process.env.MY_PHONE!,
    //   body: `your login token is ${payload}`,
    // });
    // console.log(message);
  } else if (email) {
    // const mailOptions = {
    //   from: process.env.MAIL_ID,
    //   to: email,
    //   subject: 'Nomad Carrot Authentication Email',
    //   text: `Authentication Code : ${payload}`,
    // };
    // const result = await smtpTransport.sendMail(mailOptions, (error, responses) => {
    //   if (error) {
    //     console.log(error);
    //     return null;
    //   } else {
    //     console.log(responses);
    //     return null;
    //   }
    // });
    // smtpTransport.close();
    // console.log(result);
  }

  return res.json({
    ok: true,
  });
};

export default withHandler({ methods: ['POST'], handler: enterApi, isPrivate: false });
