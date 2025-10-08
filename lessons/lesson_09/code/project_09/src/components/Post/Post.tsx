import type { FC } from "react";
import type { IPosts } from "../PostsList/PostsList";
import { Link } from "react-router-dom";

const Post: FC<{ post: IPosts }> = ({
  post: { id, title, body },
}) => {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{body}</p>
          <Link to={`/posts/${id}`} className="btn btn-primary btn-sm">
            Подробнее...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Post;
