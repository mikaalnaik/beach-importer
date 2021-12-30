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
  // get last update from city of toronto
  // get last update from mongo
  // if last update from city of toronto is newer than last update from mongo, update mongo
  // if last update from city of toronto is older than last update from mongo, do nothing

  const mongo = await connectToDatabase();

  const [latest] = await mongo
    .db('beach_db')
    .collection('ecoli_readings')
    .find({}, { limit: 1 })
    .sort({ createdAt: -1 })
    .toArray();

  const { lastUpdate } = await fetch(
    'https://secure.toronto.ca/opendata/adv/last_update/v1?format=json'
  ).then((res) => res.json());

  const formattedLastFormatDate = new Date(lastUpdate.split(' ')[0]);

  console.log({ lastUpdate, latest });

  res.status(200).json({ lastUpdate, latest });

  // const rawResponse = await fetch('https://secure.toronto.ca/opendata/adv/beach_results/v1?format=json&startDate=2000-01-01&endDate=2021-12-30')
  // const response: RawTorontoBeachDateResponse = await rawResponse.json()
  // console.log('response', response);

  // const formattedResponse = formatBackfill(response)

  // console.log('formatted response', formattedResponse);

  // const mongo = await connectToDatabase()

  // // await mongo.db('beach_db').collection('ecoli_readings').drop()

  // await mongo.db('beach_db')
  //   .createCollection('ecoli_readings')

  // const entry = await mongo
  //   .db('beach_db')
  //   .collection('ecoli_readings')
  //   .insertMany(formattedResponse);

  // res.status(200).json({ formattedResponse })
}
