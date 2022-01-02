import { ObjectId } from 'mongodb';

export type Question = {
  _id: ObjectId;
  option1: string;
  option2: string;
  genres: string[];
  rating: string;
  option1Votes: number;
  option2Votes: number;
  totalResponse: number;
};
