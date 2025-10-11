import { useContext, type FC } from "react";
import type { IComment } from "../CommentList/CommentList";
import { Link } from "react-router-dom";
import { ThemeContext, type IThemeContext } from "../../utils/themeContext";
import { LanguageContext, type ILanguageContext } from "../../utils/languageContext";

const Comment: FC<{ comment: IComment }> = ({
  comment: { body, email, name, id },
}) => {
  const { language } = useContext<ILanguageContext>(LanguageContext);
  const { theme } = useContext<IThemeContext>(ThemeContext);
  const isDark = theme === "dark";

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div
        className={`card h-100 shadow-sm ${
          isDark ? "bg-dark text-light" : "bg-light text-dark"
        }`}
      >
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{email}</h6>
          <p className="card-text">{body}</p>
          <Link to={`/comment/${id}`} className="btn btn-primary btn-sm">
            {language === "ru"
              ? "Подробнее"
              : language === "en"
              ? "More details"
              : "Mehr Details"}
            ...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Comment;
