import { Question } from '../../types/question';
import styles from './question-option-style.module.scss';

interface QuestionOptionProps {
  option: Question['option1'] | Question['option2'];
  submit: () => void;
  percentAnswered: number | null;
}

export default function QuestionOption({
  option,
  submit,
  percentAnswered,
}: QuestionOptionProps) {
  return (
    <div className={styles.card} onClick={submit}>
      <h1>{option}</h1>
      <h4>{percentAnswered && `${percentAnswered.toFixed(0)}%`}</h4>
    </div>
  );
}
