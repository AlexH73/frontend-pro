import { useState, type JSX } from 'react';
import MyButton from '../MyButton/MyButton';
import styles from './Feedback.module.css';

export default function Feedback(): JSX.Element {
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);

  const handleLike = () => {
    setLikeCount(likeCount + 1);
  };

  const handleDislike = () => {
    setDislikeCount(dislikeCount + 1);
  };

  const handleReset = () => {
    setLikeCount(0);
    setDislikeCount(0);
  };

  return (
    <div className={styles.feedback}>
      <h3>Оцените наш сервис</h3>

      <div className={styles.feedbackButtons}>
        <div className={styles.feedbackItem}>
          <MyButton onClick={handleLike} variant='primary'>
            👍 like
          </MyButton>
          <span className={styles.count}>{likeCount}</span>
        </div>
        <div className={styles.feedbackItem}>
          <MyButton onClick={handleDislike} variant='secondary'>
            👎 Dislike
          </MyButton>
          <span className={styles.count}>{dislikeCount}</span>
        </div>
        <MyButton onClick={handleReset} variant='danger'>
          Reset Results
        </MyButton>
        <div className={styles.feedbackStats}>
          <p>Всего оценок: {likeCount + dislikeCount}</p>
          <p>
            Соотношение: {likeCount} 👍 / {dislikeCount} 👎
          </p>
        </div>
      </div>
    </div>
  );
}
