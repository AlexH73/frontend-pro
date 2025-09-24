import SEO from "../../components/SEO/SEO";

const Home = () => {
  return (
    <>
      <SEO
        title="Главная - JSONPlaceholder Demo"
        description="Демонстрационный сайт для работы с JSONPlaceholder API. Просмотр пользователей, постов, комментариев, альбомов, фото и задач."
        keywords="JSONPlaceholder, API, демо, React, TypeScript"
      />
      <div className="container mt-4">
        <div className="row">
          <div className="col-12">
            <div className="jumbotron bg-light p-5 rounded">
              <h1 className="display-4">
                Добро пожаловать на JSONPlaceholder Demo!
              </h1>
              <p className="lead">
                Этот демонстрационный сайт создан для работы с публичным API
                JSONPlaceholder. Здесь вы можете просмотреть различные типы
                данных, предоставляемых этим сервисом.
              </p>
              <hr className="my-4" />
              <p>
                <strong>Задача проекта:</strong> Создать SPA (Single Page
                Application) с использованием React, который демонстрирует
                работу с REST API через различные endpoint'ы JSONPlaceholder.
              </p>
              <p>
                <strong>Реализация:</strong> Использованы современные технологии
                React ecosystem: React Router для маршрутизации, Axios для
                HTTP-запросов, Bootstrap для стилизации, UUID для генерации
                уникальных ключей, и React Helmet для SEO-оптимизации.
              </p>
            </div>

            <div className="row mt-5">
              <div className="col-md-4 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">👥 Пользователи</h5>
                    <p className="card-text">
                      Просмотр списка пользователей с основной информацией.
                    </p>
                    <a href="/users" className="btn btn-primary">
                      Перейти
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">📝 Посты</h5>
                    <p className="card-text">
                      Чтение постов от различных пользователей.
                    </p>
                    <a href="/posts" className="btn btn-primary">
                      Перейти
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">💬 Комментарии</h5>
                    <p className="card-text">
                      Комментарии пользователей к различным постам.
                    </p>
                    <a href="/comments" className="btn btn-primary">
                      Перейти
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">📸 Альбомы</h5>
                    <p className="card-text">
                      Альбомы фотографий пользователей.
                    </p>
                    <a href="/albums" className="btn btn-primary">
                      Перейти
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">🖼️ Фото</h5>
                    <p className="card-text">
                      Фотографии из различных альбомов.
                    </p>
                    <a href="/photos" className="btn btn-primary">
                      Перейти
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">✅ Задачи</h5>
                    <p className="card-text">Список задач пользователей.</p>
                    <a href="/todos" className="btn btn-primary">
                      Перейти
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
