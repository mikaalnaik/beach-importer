// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  fetch(
    'https://secure.toronto.ca/opendata/adv/beach_results/v1?format=json&startDate=2021-02-06&endDate=2021-09-06'
  ).then((data) => {
    res.status(200).json({ name: JSON.stringify(data) });
  });
}
