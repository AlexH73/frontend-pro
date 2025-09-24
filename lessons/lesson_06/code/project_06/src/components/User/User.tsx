import type { FC } from "react";
import { v4 } from "uuid";
import type { IUser } from "../UserList/UserList";

const User: FC<{user: IUser}> = ({user: {name, username, email}}) => {
  return (
    <div className="col-12 col-md-6 col-lg-4" key={v4()}>
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">@{username}</h6>
          <p className="card-text">
            <strong>Email:</strong> {email}
          </p>
        </div>
      </div>
    </div>
  );
}

export default User