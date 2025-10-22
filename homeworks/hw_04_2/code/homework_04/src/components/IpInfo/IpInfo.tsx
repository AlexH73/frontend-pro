import { type JSX } from 'react'
import styles from './IpInfo.module.css';

interface GeoData {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  postal: string;
  timezone: string;
}

interface IpInfoProps {
  geoData: GeoData | null;
  loading: boolean;
  error: string | null;
}

export default function IpInfo({ geoData, loading, error }: IpInfoProps): JSX.Element | null {
  if (loading) {
    return (
      <div className='card'>
        <div className='card-body text-center'>
          <div
            className='spinner-border spinner-border-sm me-2'
            role='status'
          ></div>
          Загрузка информации об IP...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='alert alert-warning' role='alert'>
        <strong>Внимание:</strong> {error}
      </div>
    );
  }

  if (!geoData) {
    return null;
  }

  const [latitude, longitude] = geoData.loc.split(',');

  return (
    <div className={`card ${styles.card}`}>
      <div className='card-header bg-info text-white'>
        <h5 className='mb-0'>📍 Информация о местоположении</h5>
      </div>
      <div className='card-body'>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.label}>IP адрес:</span>
            <div className={styles.value}>{geoData.ip}</div>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Город:</span>
            <div className={styles.value}>{geoData.city}</div>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Регион:</span>
            <div className={styles.value}>{geoData.region}</div>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Страна:</span>
            <div className={styles.value}>{geoData.country}</div>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Почтовый индекс:</span>
            <div className={styles.value}>{geoData.postal}</div>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Временная зона:</span>
            <div className={styles.value}>{geoData.timezone}</div>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Провайдер:</span>
            <div className={styles.value}>{geoData.org}</div>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Координаты:</span>
            <div className={styles.value}>
              <a
                href={`https://maps.google.com/?q=${latitude},${longitude}`}
                target='_blank'
                rel='noopener noreferrer'
                className={`text-decoration-none ${styles.mapLink}`}
              >
                {geoData.loc} 🌍
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}