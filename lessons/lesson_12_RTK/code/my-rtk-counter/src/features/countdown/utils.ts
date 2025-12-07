export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * Нормализует время до Рождества
 * Приводит к целым числам и корректным диапазонам:
 * - дни: целое число
 * - часы: от 0 до 23
 * - минуты: от 0 до 59
 * - секунды: от 0 до 59
 */
export function normalizeTimeLeft(
  rawDays: number,
  rawHours: number,
  rawMinutes: number,
  rawSeconds: number
): TimeLeft {
  // Преобразуем все в секунды
  let totalSeconds = Math.floor(
    rawDays * 86400 + rawHours * 3600 + rawMinutes * 60 + rawSeconds
  );

  // Корректируем отрицательные значения
  totalSeconds = Math.max(0, totalSeconds);

  // Пересчитываем с корректными диапазонами
  const days = Math.floor(totalSeconds / 86400);
  totalSeconds %= 86400;

  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}
