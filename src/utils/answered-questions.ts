import { ObjectId } from 'mongodb';
import { Question } from '../types/question';

export function getAnsweredQuestions() {
  const answeredQuestions: ObjectId[] = JSON.parse(
    localStorage.getItem('answeredQuestions') || '[]'
  );
  return answeredQuestions;
}

export function setAnsweredQuestions(id: Question['_id']) {
  const answeredQuestions = getAnsweredQuestions();
  answeredQuestions.push(id);
  localStorage.setItem('answeredQuestions', JSON.stringify(answeredQuestions));
}
