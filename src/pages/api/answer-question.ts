import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../mongo-client';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const mongo = await connectToDatabase();

  const { questionId, answer } = JSON.parse(req.body);

  try {
    const updateEntry = await mongo
      .db('would_you_rather')
      .collection('questions')
      .findOneAndUpdate(
        { _id: new ObjectId(questionId) },
        { $inc: { totalResponse: 1, [`option${answer}Votes`]: 1 } },
        { returnDocument: 'after' }
      );

    res.status(200).json({ success: true, updateEntry });
  } catch (err) {
    res.status(500).json({ error: err });
  }
}
