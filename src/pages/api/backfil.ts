// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Db } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../mongo-client';
import { RawTorontoBeachDateResponse } from '../../types/toronto-city-response';
import formatBackfill from '../../utils/format-backfill';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const rawResponse = await fetch(
    'https://secure.toronto.ca/opendata/adv/beach_results/v1?format=json&startDate=2000-01-01&endDate=2021-12-30'
  );
  const response: RawTorontoBeachDateResponse = await rawResponse.json();
  const formattedResponse = formatBackfill(response);
  const mongo = await connectToDatabase();

  // await mongo.db('beach_db').collection('ecoli_readings').drop()

  await mongo.db('beach_db').createCollection('ecoli_readings');

  const entry = await mongo
    .db('beach_db')
    .collection('ecoli_readings')
    .insertMany(formattedResponse);

  res.status(200).json({ entry });
}
