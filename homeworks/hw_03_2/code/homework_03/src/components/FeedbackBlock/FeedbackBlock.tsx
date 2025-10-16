import Feedback from '../Feedback/Feedback';
import styles from './FeedbackBlock.module.css';

export default function FeedbackBlock() {
  return (
    <div className={styles.feedbackBlock}>
      <h2>Задание 2: Компонент Feedback</h2>
      <p>Используйте кнопки Like и Dislike для оценки</p>
      <Feedback />
    </div>
  );
}
