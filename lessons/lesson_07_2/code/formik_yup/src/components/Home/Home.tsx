import { type JSX } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/themeContext/useTheme';
import styles from './Home.module.css';

// Автоматически обновляемые данные о проектах
const projects = [
  {
    id: 8,
    name: 'Менеджер продуктов',
    description: 'Полный CRUD интерфейс для управления продуктами',
    technologies: ['React', 'TypeScript', 'useApi', 'Bootstrap'],
    progress: 100,
    route: '/products-manager',
    icon: '🛠️',
    lastUpdate: '2025-11-03',
  },
  {
    id: 7,
    name: 'Умный список задач',
    description: 'Интерактивный Todo List с валидацией и статистикой',
    technologies: ['React', 'TypeScript', 'Formik', 'Yup', 'Bootstrap'],
    progress: 100,
    route: '/todo',
    icon: '✅',
    lastUpdate: '2025-11-02',
  },
  {
    id: 6,
    name: 'Формы с валидацией',
    description: 'Коллекция различных форм с Formik + Yup валидацией',
    technologies: ['React', 'Formik', 'Yup', 'Bootstrap'],
    progress: 100,
    route: '/forms-demo',
    icon: '📋',
    lastUpdate: '2025-10-30',
  },
  {
    id: 5,
    name: 'Система тем',
    description: 'Переключатель светлой/тёмной темы с контекстом',
    technologies: ['React Context - useContext', 'TypeScript', 'CSS Variables'],
    progress: 100,
    route: '/', // работает на всех страницах
    icon: '🎨',
    lastUpdate: '2025-10-28',
  },
  {
    id: 4,
    name: 'Интернет-магазин',
    description: 'Полнофункциональный магазин с товарами',
    technologies: [
      'React - ReactRouterDom',
      'TypeScript',
      'Bootstrap',
      'CSS Modules',
    ],
    progress: 100,
    route: '/products',
    icon: '🛍️',
    lastUpdate: '2025-10-28',
  },
  {
    id: 3,
    name: 'Пользовательская система',
    description: 'Работа с пользователями и их данными',
    technologies: ['React -ReactRouterDom', 'API', 'TypeScript'],
    progress: 90,
    route: '/userspage',
    icon: '👥',
    lastUpdate: '2025-10-23',
  },
  {
    id: 2,
    name: 'Игровые компоненты',
    description: 'Различные интерактивные компоненты и утилиты',
    technologies: ['React - useEffect ', 'JavaScript', 'CSS'],
    progress: 75,
    route: '/playground',
    icon: '🎮',
    lastUpdate: '2025-10-21',
  },
  {
    id: 1,
    name: 'Автомобильный каталог',
    description: 'Каталог автомобилей с фильтрацией и поиском',
    technologies: ['React - Props', 'TypeScript', 'Bootstrap'],
    progress: 85,
    route: '/carshop',
    icon: '🚗',
    lastUpdate: '2025-10-14',
  },
];

// Статистика, которая рассчитывается автоматически
const getStats = () => {
  const totalProjects = projects.length;
  const completedProjects = projects.filter((p) => p.progress === 100).length;
  const totalTechnologies = [
    ...new Set(projects.flatMap((p) => p.technologies)),
  ].length;
  const avgProgress = Math.round(
    projects.reduce((sum, p) => sum + p.progress, 0) / totalProjects
  );

  return [
    { number: `${totalProjects}`, label: 'Учебных проектов' },
    { number: `${completedProjects}`, label: 'Завершённых работ' },
    { number: `${totalTechnologies}+`, label: 'Технологий изучено' },
    { number: `${avgProgress}%`, label: 'Средняя готовность' },
  ];
};

export default function Home(): JSX.Element {
  const { theme } = useTheme();
  const stats = getStats();
  const currentDate = new Date().toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={styles.homePage}>
      {/* Hero Section */}
      <section
        className={`${styles.hero} ${theme === 'dark' ? styles.dark : ''}`}
      >
        <div className='container'>
          <div className='row align-items-center min-vh-100'>
            <div className='col-lg-6'>
              <div className={styles.badge}>🎓 Учебный проект</div>
              <h1 className={styles.heroTitle}>
                Портфолио{' '}
                <span className={styles.highlight}>React-разработчика</span>
              </h1>
              <p className={styles.heroSubtitle}>
                Добро пожаловать в моё учебное портфолио! Здесь собраны проекты,
                созданные в процессе изучения React, TypeScript и современных
                фронтенд-технологий.
              </p>
              <div className={styles.heroInfo}>
                <div className={styles.infoItem}>
                  <strong>📅 Сегодня:</strong> {currentDate}
                </div>
                <div className={styles.infoItem}>
                  <strong>🔄 Автообновление:</strong> Активно
                </div>
              </div>
              <div className={styles.heroButtons}>
                <a
                  href='#projects'
                  className={`btn btn-primary btn-lg ${styles.ctaButton}`}
                >
                  📚 Смотреть проекты
                </a>
                <Link
                  to='/forms-demo'
                  className={`btn btn-outline-light btn-lg ${styles.ctaButton}`}
                >
                  🎯 Демо-формы
                </Link>
              </div>
            </div>
            <div className='col-lg-6 text-center'>
              <div className={styles.heroIllustration}>
                <div className={styles.codeAnimation}>
                  <div className={styles.codeLine}>
                    &lt;ReactPortfolio /&gt;
                  </div>
                  <div className={styles.codeLine}>
                    &nbsp;&nbsp;&lt;Projects count="{projects.length}" /&gt;
                  </div>
                  <div className={styles.codeLine}>
                    &nbsp;&nbsp;&lt;Technologies stack="modern" /&gt;
                  </div>
                  <div className={styles.codeLine}>&lt;/ReactPortfolio&gt;</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.stats}>
        <div className='container'>
          <div className='row'>
            {stats.map((stat, index) => (
              <div key={index} className='col-6 col-md-3 text-center mb-4'>
                <div className={styles.statItem}>
                  <div className={styles.statNumber}>{stat.number}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id='projects'
        className={`${styles.projects} ${theme === 'dark' ? styles.dark : ''}`}
      >
        <div className='container'>
          <div className='row'>
            <div className='col-12 text-center mb-5'>
              <h2 className={styles.sectionTitle}>Мои учебные проекты</h2>
              <p className={styles.sectionSubtitle}>
                Автоматически обновляемый список всех реализованных работ
              </p>
            </div>
          </div>
          <div className='row'>
            {projects.map((project) => (
              <div key={project.id} className='col-lg-4 col-md-6 mb-4'>
                <div className={`card h-100 ${styles.projectCard}`}>
                  <div className='card-body'>
                    <div className={styles.projectHeader}>
                      <div className={styles.projectIcon}>{project.icon}</div>
                      <div className={styles.projectProgress}>
                        <div className={styles.progressBar}>
                          <div
                            className={styles.progressFill}
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span className={styles.progressText}>
                          {project.progress}%
                        </span>
                      </div>
                    </div>

                    <h5 className={styles.projectTitle}>{project.name}</h5>
                    <p className={styles.projectDescription}>
                      {project.description}
                    </p>

                    <div className={styles.technologies}>
                      {project.technologies.map((tech, index) => (
                        <span key={index} className={styles.techTag}>
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className={styles.projectFooter}>
                      <div className={styles.lastUpdate}>
                        📅 {project.lastUpdate}
                      </div>
                      <Link
                        to={project.route}
                        className={`btn btn-outline-primary btn-sm ${styles.projectButton}`}
                      >
                        Перейти →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className={styles.about}>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-6'>
              <h2 className={styles.aboutTitle}>О этом портфолио</h2>
              <div className={styles.aboutContent}>
                <p>
                  Это <strong>автоматически обновляемое</strong> учебное
                  портфолио, которое отражает текущий прогресс в изучении
                  современных веб-технологий.
                </p>
                <ul className={styles.featureList}>
                  <li>
                    ✅ <strong>Автообновление:</strong> Данные рассчитываются
                    автоматически
                  </li>
                  <li>
                    ✅ <strong>Динамическая статистика:</strong> На основе
                    актуальных проектов
                  </li>
                  <li>
                    ✅ <strong>Реальный прогресс:</strong> Отслеживание
                    завершённости работ
                  </li>
                  <li>
                    ✅ <strong>Технологический стек:</strong> Прозрачность
                    используемых технологий
                  </li>
                </ul>
                <p>
                  Новые проекты автоматически появляются здесь после их
                  добавления в кодбазу.
                </p>
              </div>
            </div>
            <div className='col-lg-6 text-center'>
              <div className={styles.aboutIllustration}>
                <div className={styles.terminal}>
                  <div className={styles.terminalHeader}>
                    <div className={styles.terminalButtons}>
                      <span className={styles.close}></span>
                      <span className={styles.minimize}></span>
                      <span className={styles.maximize}></span>
                    </div>
                    <div className={styles.terminalTitle}>
                      terminal — portfolio
                    </div>
                  </div>
                  <div className={styles.terminalBody}>
                    <div className={styles.terminalLine}>
                      <span className={styles.prompt}>$</span> npm run deploy
                    </div>
                    <div className={styles.terminalLine}>
                      <span className={styles.success}>✅</span> Projects
                      deployed: {projects.length}
                    </div>
                    <div className={styles.terminalLine}>
                      <span className={styles.success}>✅</span> Last update:{' '}
                      {currentDate}
                    </div>
                    <div className={styles.terminalLine}>
                      <span className={styles.prompt}>$</span>{' '}
                      <span className={styles.cursor}>_</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
