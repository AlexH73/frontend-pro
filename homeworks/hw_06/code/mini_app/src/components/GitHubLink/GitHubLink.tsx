import { FaGithub } from "react-icons/fa";

interface GitHubLinkProps {
  filePath: string;
}

const GitHubLink = ({ filePath }: GitHubLinkProps) => {
  const GITHUB_BASE_URL =
    "https://github.com/AlexH73/frontend-pro/tree/main/homeworks/hw_06/code/mini_app/src";

  return (
    <a
      href={`${GITHUB_BASE_URL}${filePath}`}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center"
    >
      <FaGithub className="me-1" />
      View Source Code
    </a>
  );
};

export default GitHubLink;
