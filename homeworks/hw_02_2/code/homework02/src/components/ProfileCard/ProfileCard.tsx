import type { JSX } from 'react';
import style from './ProfileCard.module.css';

interface ProfileCardPropos {
  avatar: string;
  firstName: string;
  lastName: string;
  job: string;
  hobbies: string[];
}

export default function ProfileCard({
  avatar,
  firstName,
  lastName,
  job,
  hobbies,
}: ProfileCardPropos): JSX.Element {
  return (
    <div className={style.profileCard}>
      <img
        src={avatar}
        alt={`${firstName} ${lastName}`}
        className={style.profileAvatar}
      />
      <div className={style.profileInfo}>
        <h2>
          {firstName} {lastName}
        </h2>
        <p>
          <strong>Род деятельности:</strong> {job}
        </p>
        <p>
          <strong>Хобби:</strong> {hobbies.join(', ')}
        </p>
      </div>
    </div>
  );
}
