import { useState, useEffect } from 'react';

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

export const useIpInfo = () => {
  const [ip, setIp] = useState<string>('');
  const [geoData, setGeoData] = useState<GeoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIpInfo = async () => {
      try {
        setLoading(true);

        // Получаем IP адрес
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        if (!ipResponse.ok) throw new Error('Ошибка получения IP');
        const ipData = await ipResponse.json();
        setIp(ipData.ip);

        // Получаем геоданные по IP
        const geoResponse = await fetch(`https://ipinfo.io/${ipData.ip}/geo`);
        if (!geoResponse.ok) throw new Error('Ошибка получения геоданных');
        const geoData = await geoResponse.json();
        setGeoData(geoData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      } finally {
        setLoading(false);
      }
    };

    fetchIpInfo();
  }, []);

  return { ip, geoData, loading, error };
};
