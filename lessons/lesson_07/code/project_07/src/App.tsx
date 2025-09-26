import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import UserList from "./components/UserList/UserList";
import CommentList from "./components/CommentList/CommentList";
import UserDetails from "./components/UserDetails/UserDetails";
import CommentDetails from "./components/CommentDetails/CommentDetails";

// SPA - Single Page Application
function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Домашняя страница
          </Link>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/users">
                Пользователи
              </Link>
            </li>
            <Link className="nav-link" to="/comments">
              Комментарии
            </Link>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<div>Добро пожаловать на сайт!</div>} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/comments" element={<CommentList />} />
        <Route path="/comment/:id" element={<CommentDetails />} />
      </Routes>
      {/* <UserList /> */}
    </>
  );
}

export default App;
