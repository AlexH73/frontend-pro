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
import {
  CircularProgress,
  Alert,
  AlertTitle,
  IconButton,
  Tooltip,
  Card,
  CardContent,
} from '@mui/material';
import { Refresh } from '@mui/icons-material';

const CountdownFull: React.FC = memo(() => {
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
    if (isLoading) return;

    intervalRef.current = window.setInterval(() => {
      dispatch(tickTimer());
    }, 1000);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
        dispatch(resetCountdown());
      }
    };
  }, [dispatch, isLoading]);

  // Мемоизированные обработчики
  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  // Мемоизированные единицы времени
  const timeUnits = useMemo(
    () => [
      {
        value: timeLeft.days,
        label: 'Days',
        gradient: 'from-red-500 to-red-600',
        icon: '📅',
      },
      {
        value: timeLeft.hours,
        label: 'Hours',
        gradient: 'from-green-500 to-green-600',
        icon: '⏰',
      },
      {
        value: timeLeft.minutes,
        label: 'Minutes',
        gradient: 'from-blue-500 to-blue-600',
        icon: '⏱️',
      },
      {
        value: timeLeft.seconds,
        label: 'Seconds',
        gradient: 'from-purple-500 to-purple-600',
        icon: '⚡',
      },
    ],
    [timeLeft]
  );

  // Мемоизированный прогресс
  const progressPercentage = useMemo(() => {
    if (timeLeft.days > 365) return 0;
    return Math.round(((365 - timeLeft.days) / 365) * 100);
  }, [timeLeft.days]);


  if (isLoading) {
    return (
      <Card className='bg-linear-to-br from-red-50 to-green-50 border-0 shadow-xl'>
        <CardContent className='flex flex-col items-center justify-center py-16'>
          <CircularProgress size={80} thickness={4} sx={{ color: '#dc2626' }} />
          <p className='mt-6 text-2xl font-semibold text-gray-700'>
            Loading Christmas magic...
          </p>
          <p className='mt-2 text-gray-500'>
            Fetching real-time countdown data
          </p>
        </CardContent>
      </Card>
    );
  }

  if (hasApiError) {
    return (
      <Alert
        severity='warning'
        className='rounded-xl shadow-lg'
        action={
          <IconButton color='inherit' size='small' onClick={handleRefresh}>
            <Refresh />
          </IconButton>
        }
      >
        <AlertTitle className='font-bold text-lg'>
          Using Local Calculation
        </AlertTitle>
        Unable to connect to Christmas API. Showing local countdown to
        Christmas.
      </Alert>
    );
  }

  // Проверяем, не наступило ли уже Рождество
  const isChristmas =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  return (
    <div className='relative overflow-hidden rounded-2xl shadow-2xl bg-linear-to-br from-red-900 via-green-900 to-blue-900 p-1'>
      {/* Декоративный фон */}
      <div className='absolute inset-0 opacity-10'>
        <div className='absolute top-0 left-0 w-64 h-64 bg-red-500 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl'></div>
        <div className='absolute bottom-0 right-0 w-64 h-64 bg-green-500 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl'></div>
      </div>

      <div className='relative bg-linear-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/20'>
        {/* Заголовок и управление */}
        <div className='flex flex-col md:flex-row justify-between items-center mb-8'>
          <div>
            <p className='text-xl text-white/80'>
              Time until Christmas{' '}
              {new Date().getFullYear() + (timeLeft.days > 365 ? 1 : 0)}
            </p>
          </div>

          <div className='flex gap-2 mt-4 md:mt-0'>
            <Tooltip title='Refresh data'>
              <IconButton
                onClick={handleRefresh}
                disabled={isFetching}
                className={`bg-white/20 hover:bg-white/30 transition-colors ${
                  isFetching ? 'animate-spin' : ''
                }`}
                sx={{ color: 'white' }}
              >
                <Refresh />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        {/* Основные цифры */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
          {timeUnits.map((unit) => (
            <div
              key={unit.label}
              className={`bg-linear-to-br ${unit.gradient} rounded-xl p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-white/20`}
            >
              <div className='text-4xl mb-2'>{unit.icon}</div>
              <div className='text-5xl md:text-6xl font-bold text-white mb-2'>
                {unit.value.toString().padStart(2, '0')}
              </div>
              <div className='text-xl text-white/90 font-semibold'>
                {unit.label}
              </div>
            </div>
          ))}
        </div>

        {/* Прогресс бар и статистика */}
        <div className='mb-8'>
          <div className='flex justify-between items-center mb-4'>
            <div>
              <h3 className='text-xl font-semibold text-white'>
                Christmas Progress
              </h3>
              <p className='text-white/70 text-sm'>
                {365 - timeLeft.days} days passed since last Christmas
              </p>
            </div>
            <div className='text-3xl font-bold text-white'>
              {progressPercentage}%
            </div>
          </div>

          <div className='h-4 bg-white/20 rounded-full overflow-hidden'>
            <div
              className='h-full bg-linear-to-r from-red-500 via-yellow-500 to-green-500 rounded-full transition-all duration-1000 ease-out'
              style={{
                width: `${Math.min(100, Math.max(0, progressPercentage))}%`,
              }}
            ></div>
          </div>

          <div className='flex justify-between text-sm text-white/70 mt-2'>
            <span>January 1st</span>
            <span>Christmas Day</span>
          </div>
        </div>

        {/* Статус и информация */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
          <div className='bg-white/10 rounded-xl p-4 border border-white/20'>
            <div className='text-white/70 text-sm'>Status</div>
            <div
              className={`text-xl font-semibold ${
                hasApiError ? 'text-yellow-300' : 'text-green-300'
              }`}
            >
              {hasApiError ? 'Local Mode' : 'Live Countdown Active'}
            </div>
          </div>

          <div className='bg-white/10 rounded-xl p-4 border border-white/20'>
            <div className='text-white/70 text-sm'>Next API Update</div>
            <div className='text-xl font-semibold text-white'>
              {new Date(Date.now() + 600000).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>

          <div className='bg-white/10 rounded-xl p-4 border border-white/20'>
            <div className='text-white/70 text-sm'>Data Source</div>
            <div className='text-xl font-semibold text-white'>
              {hasApiError
                ? 'Local Calculation'
                : 'ChristmasCountdown.live API'}
            </div>
          </div>
        </div>

        {/* Сообщение */}
        <div className='text-center p-6 bg-white/10 rounded-xl border border-white/20'>
          {isChristmas ? (
            <div className='animate-bounce'>
              <p
                className='text-3xl font-bold text-yellow-300 mb-2'
                style={{ fontFamily: "'MerryChristmasFlake', cursive" }}
              >
                🎅 Merry Christmas! 🎄
              </p>
              <p className='text-white/80'>
                Wishing you peace, joy, and happiness this holiday season!
              </p>
            </div>
          ) : (
            <div>
              <p
                className='text-5xl text-yellow-200 mb-2'
                style={{ fontFamily: "'MerryChristmasFlake', cursive" }}
              >
                ❄️ The Christmas spirit is in the air! ❄️
              </p>
              <p className='text-white/70'>
                Start planning your celebrations and gift shopping!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default CountdownFull;
