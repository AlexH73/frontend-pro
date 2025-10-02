import { useContext, type FC } from "react";
import { v4 } from "uuid";
import type { IUser } from "../UserList/UserList";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../App";

const User: FC<{ user: IUser }> = ({ user: { name, username, email, id } }) => {
  // 3. Получение значение из контекста
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <div className={`col-12 col-md-6 col-lg-4`} key={v4()}>
      <div
        className={`card h-100 shadow-sm ${
          isDark ? "bg-dark text-light" : "bg-light text-dark"
        }`}
      >
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <h6 className="card-subtitle mb-2 fst-italic">@{username}</h6>
          <p className="card-text">
            <strong>Email:</strong> {email}
          </p>
          <Link to={`/users/${id}`} className="btn btn-primary btn-sm">
            Подробнее...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default User;
