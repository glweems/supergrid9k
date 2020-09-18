import captureWebsite from 'capture-website';
import { NextApiRequest, NextApiResponse } from 'next';
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
    // OR
  },
};
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const data = await captureWebsite.base64(`/grid/${req.query?.gridId}`, {
    element: '#screenshot',
    waitForElement: '.grid-entries',
    scaleFactor: 1,
    quality: 0.1,
    width: 1000,
    type: 'png',
    height: 400,
  });

  const img = Buffer.from(data, 'base64');
  res.writeHead(200, { 'Content-Type': 'image/png', 'Content-Length': img.length });

  res.end(img);
}
