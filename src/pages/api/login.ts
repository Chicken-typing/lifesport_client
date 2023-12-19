import { NextApiRequest, NextApiResponse } from 'next';
import { toast } from 'react-toastify';

const sleep = () =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 350);
  });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req;

  // Extract the email and captcha code from the request body
  const { email, password, captcha } = body;

  if (method === 'POST') {
    // If email or captcha are missing return an error
    if (!email || !captcha || !password) {
      // return res.status(422).json({
      //   message: 'Unproccesable request, please provide the required fields',
      // });
      toast.error('please provide the required fields !');
    }

    try {
      // Ping the google recaptcha verify API to verify the captcha code you received
      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          },
          method: 'POST',
        },
      );
      const captchaValidation = await response.json();

      if (captchaValidation.success) {
        // Replace this with the API that will save the data received
        // to your backend
        await sleep();
        // Return 200 if everything is successful
        return res.status(200).send('OK');
      }

      return res.status(422).json({
        message: 'Unproccesable request, Invalid captcha code',
      });
    } catch (error) {
      return res.status(422).json({ message: 'Something went wrong' });
    }
  }
  // Return 404 if someone pings the API with a method other than
  // POST
  return res.status(404).send('Not found');
}
