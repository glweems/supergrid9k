import { NextApiRequest, NextApiResponse } from 'next';
import captureWebsite from 'capture-website';
import { hostingURL } from '../../../lib/appConfig';
export const config = {
  api: {
    bodyParser: true, // Disallow body parsing, consume as stream
    // OR
  },
};
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { gridId } = req.query;
  switch (req.method) {
    case 'GET':
      const data = await captureWebsite.base64(`${hostingURL}/grid/${gridId}`, {
        scaleFactor: 1,
        quality: 0.1,
        type: 'jpeg',
        width: 1000,
        height: 400,
      });
      const img = Buffer.from(data, 'base64');

      res.writeHead(200, { 'Content-Type': 'image/png', 'Content-Length': img.length });

      res.end(img);
      break;

    default:
      break;
  }
}
