import { NextApiRequest, NextApiResponse } from 'next';
import captureWebsite from 'capture-website';
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
    // OR
  },
};
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const data = await captureWebsite.base64(`http://localhost:3000/grid/${req.query?.gridId}`, {
    waitForElement: '.grid-entries',
    element: '.grid-entries',
    scaleFactor: 1,
    quality: 0.1,
    type: 'jpeg',
    width: 1000,
    height: 400,
  });
  console.log('data: ', data);
  const img = Buffer.from(data, 'base64');
  res.writeHead(200, { 'Content-Type': 'image/png', 'Content-Length': img.length });

  res.end(img);
}
/*  await captureWebsite
    .file(`http://localhost:3000/grid/${req.query?.gridId}`, `public/${req.query?.gridId}.png`, { overwrite: true, }) */
