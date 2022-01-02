// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../mongo-client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const mongo = await connectToDatabase();

  const { answeredQuestions } = JSON.parse(req.body);
  const alreadyAnsweredQuestions = answeredQuestions.map((item: string) => {
    return new ObjectId(item);
  });

  try {
    const latest = await mongo
      .db('would_you_rather')
      .collection('questions')
      .aggregate([
        { $match: { _id: { $nin: alreadyAnsweredQuestions } } },
        { $sample: { size: 1 } },
      ])
      .toArray();

    if (latest.length > 0) {
      res.status(200).json({ latest: latest[0] });
    } else {
      res.status(500).json({ error: 'No valid response' });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
}
