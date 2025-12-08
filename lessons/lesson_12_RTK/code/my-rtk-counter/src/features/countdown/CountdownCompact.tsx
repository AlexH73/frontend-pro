import React, { useEffect, useRef, useMemo, useCallback, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetChristmasTimeLeftQuery } from './christmasApi';
import {
  setTimeLeft,
  tickTimer,
  resetCountdown,
  setApiError,
} from './countdownSlice';
import type { RootState, AppDispatch } from '../../app/store';
import { CircularProgress, IconButton, Tooltip } from '@mui/material';
import { Refresh, ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { selectTheme } from '../../features/theme/themeSlice';

const CountdownCompact: React.FC = memo(() => {
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, error, refetch, isFetching } =
    useGetChristmasTimeLeftQuery();
  const { timeLeft, hasApiError } = useSelector(
    (state: RootState) => state.countdown
  );

  const intervalRef = useRef<number | null>(null);

  // Обработка ошибок API
  useEffect(() => {
    dispatch(setApiError(!!error));
  }, [error, dispatch]);

  // Обработка данных API
  useEffect(() => {
    if (data) {
      dispatch(setTimeLeft(data));
    }
  }, [data, dispatch]);

  // Запуск таймера при монтировании
  useEffect(() => {
    // Если данные еще не загружены, не запускаем таймер
    if (isLoading) return;

    // Запускаем интервал
    intervalRef.current = window.setInterval(() => {
      dispatch(tickTimer());
    }, 1000);

    // Очистка интервала при размонтировании
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
        dispatch(resetCountdown());
      }
    };
  }, [dispatch, isLoading]);

  // Мемоизированные единицы времени
  const timeUnits = useMemo(
    () => [
      { value: timeLeft.days, label: 'Days', color: 'bg-red-500' },
      { value: timeLeft.hours, label: 'Hours', color: 'bg-green-500' },
      { value: timeLeft.minutes, label: 'Minutes', color: 'bg-blue-500' },
      { value: timeLeft.seconds, label: 'Seconds', color: 'bg-purple-500' },
    ],
    [timeLeft]
  );

  // Мемоизированный прогресс
  const progressPercentage = useMemo(() => {
    // Если до Рождества больше 365 дней, показываем 0%
    if (timeLeft.days > 365) return 0;
    return Math.round(((365 - timeLeft.days) / 365) * 100);
  }, [timeLeft.days]);

  // Мемоизированный обработчик обновления
  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-32 bg-linear-to-r from-red-50 to-green-50 rounded-xl shadow-md border border-gray-200'>
        <div className='text-center'>
          <CircularProgress size={40} thickness={4} sx={{ color: '#dc2626' }} />
          <p className='mt-3 text-gray-600 font-medium'>
            Loading Christmas countdown...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-xl shadow-lg border  ${
        theme === 'dark'
          ? 'border-gray-900 bg-linear-to-r from-gray-800 via-blue-950 to-green-950'
          : 'border-gray-300 bg-linear-to-r from-red-50 via-white to-green-50'
      }`}
    >
      <div className='relative p-6'>
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-6'>
          {/* Заголовок */}
          <div className='flex-1'>
            <div className='flex items-center gap-3 mb-4'>
              <h3
                className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-800'
                }`}
              >
                Christmas Countdown
              </h3>
              <Tooltip title='Refresh data'>
                <IconButton
                  onClick={handleRefresh}
                  disabled={isFetching}
                  size='small'
                  className={isFetching ? 'animate-spin' : ''}
                  sx={{
                    color: '#dc2626',
                    backgroundColor: 'rgba(220, 38, 38, 0.1)',
                    '&:hover': { backgroundColor: 'rgba(220, 38, 38, 0.2)' },
                  }}
                >
                  <Refresh fontSize='small' />
                </IconButton>
              </Tooltip>
              {hasApiError && (
                <span className='text-sm text-yellow-600 bg-yellow-50 px-2 py-1 rounded'>
                  Local Mode
                </span>
              )}
            </div>

            {/* Прогресс бар */}
            <div className='space-y-2'>
              <div
                className={`flex justify-between text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                <span>Progress to Christmas</span>
                <span className='font-semibold'>{progressPercentage}%</span>
              </div>
              <div className='h-2 bg-gray-200 rounded-full overflow-hidden'>
                <div
                  className='h-full bg-linear-to-r from-red-500 via-yellow-500 to-green-500 rounded-full transition-all duration-1000'
                  style={{
                    width: `${Math.min(100, Math.max(0, progressPercentage))}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Время */}
          <div className='flex-2'>
            <TimeUnitsDisplay timeUnits={timeUnits} />
          </div>
        </div>

        {/* Статус */}
        <StatusDisplay hasApiError={hasApiError} />

        {/* Кнопка перехода */}
        <div className='shrink-0'>
          <Link
            to='/christmas-countdown'
            className='inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-red-600 to-green-600 text-white font-semibold rounded-lg hover:from-red-700 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
          >
            Full Countdown
            <ArrowForward className='w-5 h-5' />
          </Link>
        </div>
      </div>
    </div>
  );
});

// Вынесенные компоненты для оптимизации
const TimeUnitsDisplay = memo(
  ({
    timeUnits,
  }: {
    timeUnits: Array<{ value: number; label: string; color: string }>;
  }) => (
    <div className='grid grid-cols-4 gap-3'>
      {timeUnits.map((unit) => (
        <div key={unit.label} className='text-center'>
          <div className={`${unit.color} text-white rounded-lg p-3 shadow-md`}>
            <div className='text-2xl md:text-3xl font-bold'>
              {unit.value.toString().padStart(2, '0')}
            </div>
          </div>
          <div
            className={`text-xs md:text-sm font-medium mt-1`}
          >
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  )
);

const StatusDisplay = memo(({ hasApiError }: { hasApiError: boolean }) => (
  <div className={`mt-4 pt-4 border-t border-gray-200 dark:border-gray-700`}>
    <div className='flex flex-wrap items-center justify-between gap-2 text-sm text-gray-600'>
      <div className='flex items-center gap-2'>
        <div
          className={`w-2 h-2 rounded-full ${
            hasApiError ? 'bg-yellow-500' : 'bg-green-500'
          } animate-pulse`}
        />
        <span>
          {hasApiError ? 'Local calculation' : 'Live countdown active'}
        </span>
      </div>
      <div>
        <span className='text-gray-500'>Updated: </span>
        <span className='font-medium'>
          {new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </div>
  </div>
));

TimeUnitsDisplay.displayName = 'TimeUnitsDisplay';
StatusDisplay.displayName = 'StatusDisplay';

export default CountdownCompact;
