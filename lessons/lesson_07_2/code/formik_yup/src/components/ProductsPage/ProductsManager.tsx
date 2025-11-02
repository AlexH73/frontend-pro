import { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi/useApi';
import { useTheme } from '../../hooks/themeContext/useTheme';
import styles from './ProductsManager.module.css';

interface Product {
  id: number;
  title: string;
  price: number;
  description?: string;
  category?: string;
  image?: string;
}

export default function ProductsManager() {
  const { theme } = useTheme();
  const { data: apiProducts, loading, error, get } = useApi<Product[]>();

  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({ title: '', price: 0 });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Загрузка продуктов при монтировании
  useEffect(() => {
    loadProducts();
  }, []);

  // Синхронизация данных из API с локальным состоянием
  useEffect(() => {
    if (apiProducts) {
      setProducts(apiProducts);
    }
  }, [apiProducts]);

  const loadProducts = async () => {
    try {
      await get('https://fakestoreapi.com/products');
    } catch (err) {
      console.error('Failed to load products:', err);
    }
  };

  // Создание продукта (эмуляция)
  const createProduct = async () => {
    if (!newProduct.title.trim()) {
      alert('Пожалуйста, введите название продукта');
      return;
    }

    try {
      // Эмулируем успешный POST запрос
      const newProductWithId: Product = {
        id: Date.now(), // Временный ID
        title: newProduct.title,
        price: newProduct.price,
        description: 'Новый продукт',
        category: 'electronics',
        image: 'https://via.placeholder.com/150',
      };

      // Добавляем в локальное состояние
      setProducts((prev) => [newProductWithId, ...prev]);
      setNewProduct({ title: '', price: 0 });

      // Показываем успешное сообщение
      alert('Продукт успешно создан! (изменения только локальные)');
    } catch (err) {
      console.error('Failed to create product:', err);
    }
  };

  // Обновление продукта (эмуляция)
  const updateProduct = async (id: number, updates: Partial<Product>) => {
    try {
      // Эмулируем успешный PUT запрос
      setProducts((prev) =>
        prev.map((product) =>
          product.id === id ? { ...product, ...updates } : product
        )
      );
      setEditingProduct(null);
      alert('Продукт успешно обновлен! (изменения только локальные)');
    } catch (err) {
      console.error('Failed to update product:', err);
    }
  };

  // Удаление продукта (эмуляция)
  const deleteProduct = async (id: number) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот продукт?')) {
      return;
    }

    try {
      // Эмулируем успешный DELETE запрос
      setProducts((prev) => prev.filter((product) => product.id !== id));
      alert('Продукт успешно удален! (изменения только локальные)');
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  // Начало редактирования
  const startEditing = (product: Product) => {
    setEditingProduct(product);
  };

  // Отмена редактирования
  const cancelEditing = () => {
    setEditingProduct(null);
  };

  if (loading) {
    return (
      <div
        className='d-flex justify-content-center align-items-center'
        style={{ height: '50vh' }}
      >
        <div className='spinner-border text-primary' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`alert alert-danger m-3 ${
          theme === 'dark' ? styles.dark : ''
        }`}
      >
        Ошибка загрузки продуктов: {error.message}
        <button onClick={loadProducts} className='btn btn-secondary ms-3'>
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <div
      className={`container mt-4 ${styles.productsManager} ${
        theme === 'dark' ? styles.dark : ''
      }`}
    >
      <div className='row'>
        <div className='col-12'>
          <h1 className={`text-center mb-4 ${styles.title}`}>
            Управление продуктами
          </h1>
          <p className={`text-center text-muted mb-4 ${styles.subtitle}`}>
            Демонстрация CRUD операций (изменения сохраняются только локально)
          </p>
        </div>
      </div>

      {/* Форма создания продукта */}
      <div className={`card mb-4 ${styles.card}`}>
        <div className='card-body'>
          <h5 className='card-title'>Добавить новый продукт</h5>
          <div className='row g-3'>
            <div className='col-md-6'>
              <input
                className={`form-control ${styles.input}`}
                value={newProduct.title}
                onChange={(e) =>
                  setNewProduct((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder='Название продукта'
              />
            </div>
            <div className='col-md-4'>
              <input
                type='number'
                className={`form-control ${styles.input}`}
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct((prev) => ({ ...prev, price: +e.target.value }))
                }
                placeholder='Цена'
                min='0'
                step='0.01'
              />
            </div>
            <div className='col-md-2'>
              <button
                onClick={createProduct}
                disabled={loading || !newProduct.title.trim()}
                className={`btn btn-primary w-100 ${styles.button}`}
              >
                Добавить
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Список продуктов */}
      <div className={`card ${styles.card}`}>
        <div className='card-body'>
          <h5 className='card-title'>
            Список продуктов ({products.length})
            <button
              onClick={loadProducts}
              className={`btn btn-outline-secondary btn-sm ms-2 ${styles.button}`}
              disabled={loading}
            >
              🔄 Обновить
            </button>
          </h5>

          {products.length === 0 ? (
            <div className={`text-center py-4 ${styles.emptyState}`}>
              <p className='text-muted'>Продукты не найдены</p>
            </div>
          ) : (
            <div className='table-responsive'>
              <table
                className={`table ${styles.table} ${
                  theme === 'dark' ? 'dark' : ''
                }`}
              >
                <thead>
                  <tr>
                    <th>Название</th>
                    <th>Цена</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody
                  className={`${
                    theme === 'dark' ? 'table-dark' : ''
                  }`}
                >
                  {products.map((product) => (
                    <tr key={product.id} className={styles.productRow}>
                      {editingProduct?.id === product.id ? (
                        // Режим редактирования
                        <td colSpan={3}>
                          <div className='row g-2 align-items-center'>
                            <div className='col-md-5'>
                              <input
                                className={`form-control form-control-sm ${styles.input}`}
                                value={editingProduct.title}
                                onChange={(e) =>
                                  setEditingProduct((prev) =>
                                    prev
                                      ? { ...prev, title: e.target.value }
                                      : null
                                  )
                                }
                                placeholder='Название'
                              />
                            </div>
                            <div className='col-md-3'>
                              <input
                                type='number'
                                className={`form-control form-control-sm ${styles.input}`}
                                value={editingProduct.price}
                                onChange={(e) =>
                                  setEditingProduct((prev) =>
                                    prev
                                      ? { ...prev, price: +e.target.value }
                                      : null
                                  )
                                }
                                placeholder='Цена'
                                min='0'
                                step='0.01'
                              />
                            </div>
                            <div className='col-md-4'>
                              <button
                                onClick={() =>
                                  updateProduct(product.id, {
                                    title: editingProduct.title,
                                    price: editingProduct.price,
                                  })
                                }
                                className={`btn btn-success btn-sm me-2 ${styles.button}`}
                              >
                                💾 Сохранить
                              </button>
                              <button
                                onClick={cancelEditing}
                                className={`btn btn-secondary btn-sm ${styles.button}`}
                              >
                                ❌ Отмена
                              </button>
                            </div>
                          </div>
                        </td>
                      ) : (
                        // Режим просмотра
                        <>
                          <td className={styles.productTitle}>
                            {product.title}
                          </td>
                          <td className={styles.productPrice}>
                            ${product.price}
                          </td>
                          <td>
                            <div className='btn-group btn-group-sm'>
                              <button
                                onClick={() => startEditing(product)}
                                className={`btn btn-outline-primary ${styles.button}`}
                                title='Редактировать'
                              >
                                ✏️
                              </button>
                              <button
                                onClick={() =>
                                  updateProduct(product.id, {
                                    price: product.price + 10,
                                  })
                                }
                                className={`btn btn-outline-warning ${styles.button}`}
                                title='Увеличить цену на $10'
                              >
                                💰 +10
                              </button>
                              <button
                                onClick={() => deleteProduct(product.id)}
                                className={`btn btn-outline-danger ${styles.button}`}
                                title='Удалить'
                              >
                                🗑️
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Информационное сообщение */}
      <div className={`alert alert-info mt-4 ${styles.infoAlert}`}>
        <small>
          ⚠️ <strong>Внимание:</strong> Изменения сохраняются только локально в
          браузере. После перезагрузки страницы данные вернутся к исходным из-за
          ограничений FakeStoreAPI.
        </small>
      </div>
    </div>
  );
}
