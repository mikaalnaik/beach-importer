import { FormEvent, useState } from 'react';
import styles from './create-question-styles.module.scss';

export default function CreateQuestion() {
  const [question1, setQuestion1] = useState('');
  const [question2, setQuestion2] = useState('');
  const [genres, setGenres] = useState('');
  const [rating, setRating] = useState('NSFW');

  const createQuestion = (e: FormEvent) => {
    e.preventDefault();
    fetch('/api/create-question', {
      method: 'POST',
      body: JSON.stringify({
        option1: question1,
        option2: question2,
        rating,
        genres,
      }),
    }).then((data) => {
      if (data.ok) {
        reset();
      }
    });
  };

  const reset = () => {
    setQuestion1('');
    setQuestion2('');
    setGenres('');
    setRating('NSFW');
  };

  return (
    <div>
      <form onSubmit={createQuestion} className={styles.form}>
        <h1>Create A New Question</h1>
        <input
          value={question1}
          placeholder="Question 1?"
          onChange={(e) => setQuestion1(e.target.value)}
        />
        <input
          value={question2}
          placeholder="Question 2?"
          onChange={(e) => setQuestion2(e.target.value)}
        />
        <input
          value={genres}
          placeholder="Morals, lifestyle, dark, funny, separated by comma"
          onChange={(e) => setGenres(e.target.value)}
        />
        <select
          name="cars"
          id="cars"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="NSFW">NSFW</option>
          <option value="Everyone">Everyone</option>
        </select>

        <button type="submit">Create Question</button>
      </form>
    </div>
  );
}
