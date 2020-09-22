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
