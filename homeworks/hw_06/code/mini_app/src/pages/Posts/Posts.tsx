import { useEffect, useState } from "react";
import { v4 } from "uuid";
import axios from "axios";
import SEO from "../../components/SEO/SEO";
import GitHubLink from "../../components/GitHubLink/GitHubLink";
import { Link } from "react-router-dom";
import {
  FaFileAlt,
  FaExternalLinkAlt,
  FaUser,
  FaComments,
  FaInfoCircle,
} from "react-icons/fa";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Badge,
} from "react-bootstrap";
import "./Posts.css"

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Posts = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    axios
      .get<IPost[]>("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error.message);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <SEO
        title="Посты - JSONPlaceholder Demo"
        description="Просмотр списка постов с JSONPlaceholder API. Всего постов: 100. Демонстрация работы с текстовым контентом и API."
        keywords="посты, блог, статьи, JSONPlaceholder, API, контент"
      />

      <Container className="mt-4">
        {/* Заголовок страницы с иконкой и статистикой */}
        <div className="d-flex align-items-center mb-4">
          <div className="icon-container bg-primary rounded-circle p-3 me-3">
            <FaFileAlt size={32} className="text-white" />
          </div>
          <div>
            <h1 className="mb-1">Список постов</h1>
            <p className="text-muted mb-0">
              Всего постов: <Badge bg="primary">{posts.length}</Badge>
            </p>
          </div>
        </div>

        {/* Карточка с описанием страницы */}
        <Card className="mb-4 border-0 shadow-sm">
          <Card.Header className="bg-success border-0">
            <div className="d-flex align-items-center">
              <FaInfoCircle className="text-warning me-2" />
              <h5 className="mb-0">Информация о странице</h5>
            </div>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={8}>
                <p className="card-text">
                  На этой странице отображаются все посты пользователей системы.
                  Вы можете просмотреть заголовки, краткое содержание и перейти
                  к полному тексту каждого поста.
                </p>
                <div className="feature-list">
                  <h6>Особенности:</h6>
                  <ul className="list-unstyled">
                    <li>
                      <FaFileAlt className="text-success me-2" />
                      Полные тексты постов
                    </li>
                    <li>
                      <FaUser className="text-success me-2" />
                      Информация об авторах
                    </li>
                    <li>
                      <FaComments className="text-success me-2" />
                      Комментарии к постам
                    </li>
                    <li>
                      <FaExternalLinkAlt className="text-success me-2" />
                      Быстрый переход к детальному просмотру
                    </li>
                  </ul>
                </div>
              </Col>
              <Col md={4} className="text-end">
                <GitHubLink filePath="/pages/Posts/Posts.tsx" />
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Состояние загрузки */}
        {loading && (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Загружаем список постов...</p>
          </div>
        )}

        {/* Состояние ошибки */}
        {error && (
          <Alert variant="danger" className="mb-4">
            <Alert.Heading>Ошибка загрузки данных</Alert.Heading>
            <p className="mb-0">{error}</p>
          </Alert>
        )}

        {/* Сетка постов */}
        {!loading && !error && (
          <section aria-labelledby="posts-grid-title">
            <h2 id="posts-grid-title" className="visually-hidden">
              Список постов
            </h2>
            <Row className="g-4">
              {posts.map((post) => (
                <Col key={v4()} xs={12} md={6} lg={4}>
                  <PostCard post={post} />
                </Col>
              ))}
            </Row>
          </section>
        )}

        {/* SEO блок */}
        {!loading && !error && (
          <Card className="mt-5">
            <Card.Body className="text-center">
              <h3>JSONPlaceholder Posts API</h3>
              <p className="text-muted mb-0">
                Посты загружаются с официального JSONPlaceholder API. Это
                демонстрационные данные, содержащие 100 различных постов от 10
                пользователей.
              </p>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
};

// Компонент карточки поста
interface PostCardProps {
  post: IPost;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Card className="post-card h-100 shadow-sm">
      <Card.Header className="post-card-header">
        <div className="d-flex justify-content-between align-items-start">
          <Badge bg="primary" className="user-badge">
            <FaUser className="me-1" />
            User {post.userId}
          </Badge>
          <Badge className="post-id position-absolute top-0 end-0 bg-secondary">
            #{post.id}
          </Badge>
        </div>
      </Card.Header>

      <Card.Body className="d-flex flex-column">
        <h5 className="post-title">{post.title}</h5>
        <p className="post-excerpt flex-grow-1">
          {post.body.substring(0, 120)}...
        </p>

        <div className="post-stats mt-2">
          <small className="text-muted">
            <FaComments className="me-1" />
            Комментариев: <strong>5</strong>
          </small>
        </div>
      </Card.Body>

      <Card.Footer className="post-card-footer">
        <Link
          to={`/posts/${post.id}`}
          className="btn btn-outline-primary btn-sm"
        >
          <FaExternalLinkAlt className="me-1" />
          Читать полностью
        </Link>
      </Card.Footer>
    </Card>
  );
};

export default Posts;
