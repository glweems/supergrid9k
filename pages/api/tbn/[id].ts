import { hostingURL } from '@/lib/appConfig';
import captureWebsite from 'capture-website';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Pageres from 'pageres';

export default nc<NextApiRequest, NextApiResponse>().post(async (req, res) => {
  const { html, css } = req.body;

  const data = await new Pageres({ css })
    .src(`data:text/html,${html}`, ['1024x768'])

    .run();

  const img = Buffer.from(data[0]);

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': img.length,
  });

  res.end(img);
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { gridId } = req.query;
  switch (req.method) {
    case 'GET':
      const pag = await new Pageres({ delay: 2 })
        .src(
          'https://github.com/sindresorhus/pageres',
          ['480x320', '1024x768', 'iphone 5s'],
          { crop: true }
        )
        .src('https://sindresorhus.com', ['1280x1024', '1920x1080'])
        .src('data:text/html,<h1>Awesome!</h1>', ['1024x768'])
        .dest('./')
        .run();
      console.log('pag: ', pag);
      const data = await captureWebsite.base64(`${hostingURL}/grid/${gridId}`, {
        scaleFactor: 1,
        quality: 0.1,
        type: 'jpeg',
        width: 1000,
        height: 400,
      });
      const img = Buffer.from(data, 'base64');

      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': img.length,
      });

      res.end(img);
      break;

    default:
      break;
  }
}
