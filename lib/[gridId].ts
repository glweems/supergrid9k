import captureWebsite from 'capture-website';
import { NextApiRequest, NextApiResponse } from 'next';
import Pageres from 'pageres';
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
    // OR
  },
};
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const pag = await new Pageres({ delay: 2 })
    .src(
      'https://github.com/sindresorhus/pageres',
      ['480x320', '1024x768', 'iphone 5s'],
      { crop: true }
    )
    .src('https://sindresorhus.com', ['1280x1024', '1920x1080'])
    .src('data:text/html,<h1>Awesome!</h1>', ['1024x768'])
    .dest(__dirname)
    .run();
  console.log('pag: ', pag);
  const data = await captureWebsite.base64(
    `https://supergrid9k.dev/grid/${req.query?.gridId}`,
    {
      element: '#screenshot',
      waitForElement: '.grid-entries',
      scaleFactor: 1,
      quality: 0.1,
      width: 500,
      type: 'png',
      // height: 400,
    }
  );

  const img = Buffer.from(data, 'base64');
  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': img.length,
  });

  res.end(img);
}
