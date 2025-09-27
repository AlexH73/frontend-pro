import type { FC } from "react";
import { v4 } from "uuid";
import type { IUser } from "./Users";
import { Link } from "react-router-dom";
import "./UserCard.css";

interface UserCardProps {
  user: IUser;
}

const UserCard: FC<UserCardProps> = ({ user }) => {
  return (
    <div className="col-12 col-md-6 col-lg-4" key={v4()}>
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{user.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">@{user.username}</h6>
          <p className="card-text">
            <strong>Email:</strong> {user.email}
          </p>
          {user.phone && (
            <p className="card-text">
              <strong>Phone:</strong> {user.phone}
            </p>
          )}
          {user.website && (
            <p className="card-text">
              <strong>Website:</strong> {user.website}
            </p>
          )}
        </div>
        <div className="card-footer">
          <Link
            to={`/users/${user.id}`}
            className="btn-view-profile"
            aria-label={`Посмотреть профиль пользователя ${name}`}
          >
            Посмотреть профиль
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
