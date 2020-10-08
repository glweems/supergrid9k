import { RawGridState } from 'css-grid-template-parser';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

const defaultGridState: RawGridState = {
  name: 'Template',
  gridTemplateColumns: '1fr 1fr 1fr',
  gridTemplateRows: '1fr 1fr 1fr',
  gridGap: '10px 10px',
  useCssRepeatFn: false,
  gridContainerClassName: 'grid',
  areas: {},
};

const json = defaultGridState;
const handler = nc<NextApiRequest, NextApiResponse>().get(async (_req, res) => {
  res.status(200).json(json);
});

export default handler;
