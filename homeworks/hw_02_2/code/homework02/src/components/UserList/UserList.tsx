import ProfileCard from '../ProfileCard/ProfileCard';
import style from './UserList.module.css';

export default function Users() {
  const users = [
    {
      avatar: 'https://i.pravatar.cc/150?img=1',
      firstName: 'Иван',
      lastName: 'Петров',
      job: 'Фронтенд-разработчик',
      hobbies: ['Программирование', 'Фотография', 'Путешествия'],
    },
    {
      avatar: 'https://i.pravatar.cc/150?img=2',
      firstName: 'Мария',
      lastName: 'Иванова',
      job: 'Дизайнер',
      hobbies: ['Рисование', 'Йога', 'Кулинария'],
    },
    {
      avatar: 'https://i.pravatar.cc/150?img=3',
      firstName: 'Алексей',
      lastName: 'Сидоров',
      job: 'Бэкенд-разработчик',
      hobbies: ['Велоспорт', 'Чтение', 'Музыка'],
    },
  ];
  
  return (
    <div className={style.users}>
      <h1>Карточки пользователей</h1>
      <div className={style.profilesContainer}>
        {users.map((user, index) => (
          <ProfileCard
            key={index}
            avatar={user.avatar}
            firstName={user.firstName}
            lastName={user.lastName}
            job={user.job}
            hobbies={user.hobbies}
          />
        ))}
      </div>
    </div>
  );
}
