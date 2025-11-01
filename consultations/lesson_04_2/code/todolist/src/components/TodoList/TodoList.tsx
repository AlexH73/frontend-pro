import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import styles from './TodoList.module.css';
import { type Todo, type FormValues } from './types/types';

const TodoList: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);

  // Шаг 4.1: Создание схемы валидации
  const validationSchema = yup.object({
    text: yup
      .string()
      .trim()
      .min(3, 'Минимальная длина задачи - 3 символа')
      .max(50, 'Максимальная длина задачи - 50 символов')
      .required('Введите задачу'),
  });

  // Шаг 5.2: Логика обработки отправки формы
  const handleSubmit = (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    const newTodo: Todo = {
      id: Date.now(),
      text: values.text.trim(),
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    resetForm();
  };

  const toggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const initialValues: FormValues = {
    text: '',
  };

  return (
    <div className='container-fluid mt-4'>
      <div className='row justify-content-center'>
        <div className='col-12 col-xl-10 col-xxl-8'>
          {/* Заголовок */}
          <div className='text-center mb-4'>
            <h1 className='display-5 fw-bold text-primary'>
              📝 Умный список задач
            </h1>
            <p className='text-muted'>Организуйте свои задачи эффективно</p>
          </div>

          {/* Formik компонент */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, isValid, dirty, touched, errors }) => (
              <Form>
                <div className='card shadow-sm mb-4'>
                  <div className='card-body'>
                    <div className='mb-3'>
                      <div className='input-group input-group-lg'>
                        <Field
                          type='text'
                          name='text'
                          className={`form-control ${
                            touched.text && errors.text ? 'is-invalid' : ''
                          }`}
                          placeholder='Введите новую задачу...'
                        />
                        <button
                          type='submit'
                          className='btn btn-primary px-4'
                          disabled={!isValid || !dirty || isSubmitting}
                        >
                          Добавить
                        </button>
                      </div>

                      {/* Компонент ErrorMessage для отображения ошибок */}
                      <ErrorMessage name='text'>
                        {(msg) => (
                          <div className='invalid-feedback d-block mt-2'>
                            {msg}
                          </div>
                        )}
                      </ErrorMessage>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>

          {/* Статистика */}
          {todos.length > 0 && (
            <div className='row mb-3'>
              <div className='col-12'>
                <div className='alert alert-info py-2 text-center'>
                  <small>
                    Всего задач: <strong>{todos.length}</strong> | Выполнено:{' '}
                    <strong>{todos.filter((t) => t.completed).length}</strong> |
                    Осталось:{' '}
                    <strong>{todos.filter((t) => !t.completed).length}</strong>
                  </small>
                </div>
              </div>
            </div>
          )}

          {/* Список задач */}
          <div className='card shadow-sm'>
            <div className='card-body p-0'>
              {todos.length === 0 && (
                <div className={`text-center py-5 ${styles.emptyState}`}>
                  <div className='mb-3'>
                    <span style={{ fontSize: '4rem' }}>📝</span>
                  </div>
                  <h5 className='text-muted'>Список пуст</h5>
                  <p className='text-muted'>
                    Добавьте свою первую задачу выше!
                  </p>
                </div>
              )}

              {/* Список задач */}
              {todos.length > 0 && (
                <ul className='list-group list-group-flush'>
                  {todos.map((todo) => (
                    <li
                      key={todo.id}
                      className={`list-group-item d-flex justify-content-between align-items-center ${styles.todoItem}`}
                    >
                      <div className='d-flex align-items-center flex-grow-1'>
                        {/* Чекбокс с лейблом для лучшей доступности */}
                        <div className='form-check me-3'>
                          <input
                            type='checkbox'
                            className='form-check-input'
                            id={`todo-${todo.id}`}
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                          />
                          <label
                            className='form-check-label'
                            htmlFor={`todo-${todo.id}`}
                            style={{ display: 'none' }}
                          >
                            Отметить как{' '}
                            {todo.completed ? 'невыполненную' : 'выполненную'}
                          </label>
                        </div>

                        {/* Текст задачи */}
                        <span
                          onClick={() => toggleTodo(todo.id)}
                          className={`flex-grow-1 ${styles.todoText} ${
                            todo.completed ? styles.todoTextCompleted : ''
                          }`}
                          style={{ cursor: 'pointer', fontSize: '1.1rem' }}
                        >
                          {todo.text}
                        </span>
                      </div>

                      {/* Кнопка удаления */}
                      <button
                        type='button'
                        onClick={() => deleteTodo(todo.id)}
                        className={`btn btn-outline-danger btn-sm ${styles.deleteBtn}`}
                        title='Удалить задачу'
                        aria-label={`Удалить задачу: ${todo.text}`}
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Подсказки */}
          {todos.length > 0 && (
            <div className='mt-4 text-center'>
              <small className='text-muted'>
                💡 Подсказка: кликните по задаче или чекбоксу чтобы отметить
                выполненной
              </small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
