
import { useGetUsersQuery } from "./usersApi";
import styles from "./UsersList.module.css";

export const UsersList = () => {
  const { data: users, isLoading, error } = useGetUsersQuery();

  if (isLoading) return <p className={styles.loading}>Загрузка...</p>;
  if (error) return <p className={styles.error}>Ошибка загрузки данных</p>;

  return (
    <div className={styles.grid}>
      {users?.map((user) => (
        <div key={user.id} className={styles.card}>
          <h2 className={styles.name}>
            {user.name.firstname} {user.name.lastname}
          </h2>

          <p className={styles.field}><span>Email:</span> {user.email}</p>
          <p className={styles.field}><span>Username:</span> {user.username}</p>
          <p className={styles.field}><span>Phone:</span> {user.phone}</p>

          <div className={styles.address}>
            <span>Address:</span>
            <p>{user.address.city}, {user.address.street} {user.address.number}</p>
            <p>ZIP: {user.address.zipcode}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
