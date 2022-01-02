// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../mongo-client';
import { Question } from '../../types/question';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const mongo = await connectToDatabase();

  const { option1, option2, rating, genres } = JSON.parse(req.body);
  console.log({ option1, option2, rating, genres });

  const newQuestion: Question = {
    _id: new ObjectId(),
    option1,
    option2,
    genres: genres.split(','),
    rating,
    option1Votes: 0,
    option2Votes: 0,
    totalResponse: 0,
  };

  const entry = await mongo
    .db('would_you_rather')
    .collection('questions')
    .insertOne(newQuestion);

  res.status(200).json({ success: true });
  // res.status(200).json({ success: true });
}
