import { useEffect, useState } from 'react';
import QuestionOption from '../../components/question-option';
import { Question } from '../../types/question';
import {
  getAnsweredQuestions,
  setAnsweredQuestions,
} from '../../utils/answered-questions';
import styles from './game-styles.module.scss';

type AnsweredStats = {
  hasAnswered: boolean;
  answer1: number | null;
  answer2: number | null;
};

export default function Game() {
  const [question, setQuestion] = useState<Question>();
  const [answerStats, setAnswerStats] = useState<AnsweredStats>({
    hasAnswered: false,
    answer1: null,
    answer2: null,
  });

  useEffect(() => {
    getQuestion();
  }, []);

  const getQuestion = () => {
    fetch('api/get-question', {
      method: 'POST',
      body: JSON.stringify({
        answeredQuestions: getAnsweredQuestions(),
      }),
    })
      .then((res) => res.json())
      .then((data: Record<'latest', Question>) => {
        setAnswerStats({
          answer1: null,
          answer2: null,
          hasAnswered: false,
        });

        setQuestion(data['latest']);
      });
  };
  const clickAnswer = (clickedQuestion: 1 | 2, question: Question) => {
    if (!question) {
      return;
    }

    setAnsweredQuestions(question._id);

    // determine which question was clicked
    // add id to local storage
    // post to api/answer-question
    // get back some stats, and show the % of answers for each option
    // show an advanced to next question

    fetch(`api/answer-question`, {
      method: 'POST',
      body: JSON.stringify({
        questionId: question._id,
        answer: clickedQuestion,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const answeredQuestion: Question = data.updateEntry.value;
        setAnswerStats({
          hasAnswered: true,
          answer1:
            (answeredQuestion.option1Votes / answeredQuestion.totalResponse) *
            100,
          answer2:
            (answeredQuestion.option2Votes / answeredQuestion.totalResponse) *
            100,
        });
      });
  };

  const advance = () => {
    getQuestion();
  };

  return (
    <div className={styles.game}>
      <h1>Would You Rather:</h1>
      {question && (
        <>
          <QuestionOption
            option={question.option1}
            submit={() => clickAnswer(1, question)}
            percentAnswered={answerStats.answer1}
          />
          or
          <QuestionOption
            option={question.option2}
            submit={() => clickAnswer(2, question)}
            percentAnswered={answerStats.answer2}
          />
        </>
      )}
      {answerStats.hasAnswered && (
        <button onClick={advance}>Next Question</button>
      )}
    </div>
  );
}
