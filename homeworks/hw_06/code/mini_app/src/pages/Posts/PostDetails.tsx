import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FaFileAlt,
  FaUser,
  FaArrowLeft,
  FaCalendar,
  FaComments,
  FaHome,
  FaEye,
  FaHeart,
} from "react-icons/fa";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Breadcrumb,
  Spinner,
  Alert,
  Badge,
} from "react-bootstrap";
import axios from "axios";
import SEO from "../../components/SEO/SEO";
import GitHubLink from "../../components/GitHubLink/GitHubLink";
import type { IPost } from "../Posts/Posts";
import "./PostDetails.css";

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<IPost | null>(null);
  const [user, setUser] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!id) {
      setError("ID поста не указан");
      setLoading(false);
      return;
    }

    const fetchPostData = async () => {
      try {
        // Загружаем пост
        const postResponse = await axios.get<IPost>(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        setPost(postResponse.data);

        // Загружаем информацию о пользователе
        const userResponse = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${postResponse.data.userId}`
        );
        setUser(userResponse.data);

        // Загружаем комментарии к посту
        const commentsResponse = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${id}/comments`
        );
        setComments(commentsResponse.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error);
        setError("Пост не найден или произошла ошибка загрузки");
        setLoading(false);
      }
    };

    fetchPostData();
  }, [id]);

  if (loading) {
    return (
      <Container className="mt-4">
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Загрузка поста...</p>
        </div>
      </Container>
    );
  }

  if (error || !post) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          <Alert.Heading>Ошибка</Alert.Heading>
          <p>{error || "Пост не найден"}</p>
          <Button variant="outline-danger" onClick={() => navigate("/posts")}>
            Вернуться к списку постов
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <>
      <SEO
        title={post.title}
        description={`${post.body.substring(0, 160)}...`}
        keywords={`пост, ${user?.name || "пользователь"}, блог, статьи`}
        author={user?.name || "JSONPlaceholder Demo"}
        canonicalUrl={`/posts/${post.id}`}
      />

      <Container className="mt-4">
        {/* Хлебные крошки */}
        <Breadcrumb className="mb-4">
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
            <FaHome className="me-1" />
            Главная
          </Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/posts" }}>
            Посты
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Пост #{post.id}</Breadcrumb.Item>
        </Breadcrumb>

        {/* Заголовок страницы */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => navigate("/posts")}
              className="mb-3"
            >
              <FaArrowLeft className="me-2" />
              Назад к списку
            </Button>
            <h1 className="mb-0">Детали поста</h1>
          </div>
          <GitHubLink filePath="/pages/Posts/PostDetails.tsx" />
        </div>

        <Row>
          {/* Основной контент поста */}
          <Col lg={8} className="mb-4">
            <Card className="post-detail-card">
              <Card.Header className="post-header">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h2 className="post-title" itemProp="headline">
                      {post.title}
                    </h2>
                    <div className="post-meta">
                      <Badge bg="primary" className="me-2">
                        <FaUser className="me-1" />
                        {user ? user.name : `User ${post.userId}`}
                      </Badge>
                      <Badge bg="secondary">
                        <FaCalendar className="me-1" />
                        {new Date().toLocaleDateString("ru-RU")}
                      </Badge>
                    </div>
                  </div>
                  <Badge bg="light" text="dark" className="fs-6">
                    # {post.id}
                  </Badge>
                </div>
              </Card.Header>

              <Card.Body>
                <article className="post-content">
                  <p className="lead post-excerpt">{post.body}</p>

                  <div className="post-stats">
                    <div className="stat-item">
                      <FaEye className="me-1 text-muted" />
                      <span>1,245 просмотров</span>
                    </div>
                    <div className="stat-item">
                      <FaHeart className="me-1 text-muted" />
                      <span>89 лайков</span>
                    </div>
                    <div className="stat-item">
                      <FaComments className="me-1 text-muted" />
                      <span>{comments.length} комментариев</span>
                    </div>
                  </div>
                </article>
              </Card.Body>
            </Card>

            {/* Комментарии */}
            <Card className="mt-4">
              <Card.Header>
                <FaComments className="me-2" />
                Комментарии ({comments.length})
              </Card.Header>
              <Card.Body>
                {comments.length > 0 ? (
                  <div className="comments-list">
                    {comments.slice(0, 5).map((comment) => (
                      <div
                        key={comment.id}
                        className="comment-item mb-3 p-3 border rounded"
                      >
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <strong>{comment.name}</strong>
                          <small className="text-muted">{comment.email}</small>
                        </div>
                        <p className="mb-0">{comment.body}</p>
                      </div>
                    ))}
                    {comments.length > 5 && (
                      <div className="text-center">
                        <Button variant="outline-primary" size="sm">
                          Показать все {comments.length} комментариев
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-muted text-center">
                    Пока нет комментариев
                  </p>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* Боковая панель */}
          <Col lg={4}>
            {/* Информация об авторе */}
            {user && (
              <Card className="author-card mb-4">
                <Card.Header className="bg-primary text-white">
                  <FaUser className="me-2" />
                  Об авторе
                </Card.Header>
                <Card.Body>
                  <h6>{user.name}</h6>
                  <p className="text-muted small">@{user.username}</p>
                  <div className="author-info">
                    <p>
                      <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                      <strong>Телефон:</strong> {user.phone}
                    </p>
                    <p>
                      <strong>Сайт:</strong> {user.website}
                    </p>
                  </div>
                  <Link
                    to={`/users/${user.id}`}
                    className="text-decoration-none d-inline-block"
                  >
                    <Button variant="outline-primary" size="sm">
                      Профиль автора
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            )}

            {/* Дополнительная информация */}
            <Card className="mb-4">
              <Card.Header>Информация о посте</Card.Header>
              <Card.Body>
                <div className="post-info">
                  <div className="info-item">
                    <strong>ID поста:</strong> {post.id}
                  </div>
                  <div className="info-item">
                    <strong>ID автора:</strong> {post.userId}
                  </div>
                  <div className="info-item">
                    <strong>Длина текста:</strong> {post.body.length} символов
                  </div>
                  <div className="info-item">
                    <strong>Статус:</strong>{" "}
                    <Badge bg="success">Опубликован</Badge>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Быстрые действия */}
            <Card>
              <Card.Header>Действия</Card.Header>
              <Card.Body>
                <div className="d-grid gap-2">
                  <Button variant="outline-primary" size="sm">
                    ✏️ Редактировать
                  </Button>
                  <Button variant="outline-success" size="sm">
                    🔄 Поделиться
                  </Button>
                  <Button variant="outline-warning" size="sm">
                    ⭐ В избранное
                  </Button>
                  <Button variant="outline-info" size="sm">
                    💬 Комментировать
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* SEO текст */}
        <Card className="mt-4">
          <Card.Body>
            <h3>Подробная информация о посте</h3>
            <p className="text-muted">
              Этот пост был написан пользователем{" "}
              <strong>{user?.name || `User ${post.userId}`}</strong>. Пост
              содержит интересный контент на тему, которая может быть полезна
              читателям. Если вам понравился этот материал, вы можете
              ознакомиться с другими постами автора или оставить комментарий с
              вашим мнением.
            </p>
            <p className="text-muted">
              Данные загружены с JSONPlaceholder API - демонстрационного API для
              тестирования веб-приложений. Все посты и комментарии являются
              тестовыми данными.
            </p>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default PostDetails;
