import { FaGithub, FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light mt-5">
      <div className="container py-4">
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="mb-0">
              Made with <FaHeart className="text-danger" /> using React &
              JSONPlaceholder API
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <a
              href="https://github.com/AlexH73/frontend-pro/tree/main/homeworks/hw_06/code/mini_app"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-light btn-sm"
            >
              <FaGithub className="me-1" />
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
