import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { normalizeTimeLeft } from './utils';

interface CountdownState {
  timeLeft: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  lastUpdated: string | null;
  isLocalCountdownActive: boolean;
  hasApiError: boolean;
}

const initialState: CountdownState = {
  timeLeft: {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  },
  lastUpdated: null,
  isLocalCountdownActive: false,
  hasApiError: false,
};

const countdownSlice = createSlice({
  name: 'countdown',
  initialState,
  reducers: {
    setTimeLeft: (
      state,
      action: PayloadAction<{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
      }>
    ) => {
      // Нормализуем данные при сохранении
      const normalized = normalizeTimeLeft(
        action.payload.days,
        action.payload.hours,
        action.payload.minutes,
        action.payload.seconds
      );

      state.timeLeft = {
        days: normalized.days,
        hours: normalized.hours,
        minutes: normalized.minutes,
        seconds: normalized.seconds,
      };
      state.lastUpdated = new Date().toISOString();
      state.isLocalCountdownActive = false;
      state.hasApiError = false;
    },

    // Правильная логика тикающего таймера
    tickTimer: (state) => {
      let { days, hours, minutes, seconds } = state.timeLeft;

      if (seconds > 0) {
        seconds--;
      } else {
        seconds = 59;
        if (minutes > 0) {
          minutes--;
        } else {
          minutes = 59;
          if (hours > 0) {
            hours--;
          } else {
            hours = 23;
            if (days > 0) {
              days--;
            }
            // Если days = 0, больше ничего не уменьшаем
          }
        }
      }

      // Нормализуем результат
      const normalized = normalizeTimeLeft(days, hours, minutes, seconds);

      state.timeLeft = {
        days: normalized.days,
        hours: normalized.hours,
        minutes: normalized.minutes,
        seconds: normalized.seconds,
      };
      state.isLocalCountdownActive = true;
    },

    resetCountdown: (state) => {
      state.isLocalCountdownActive = false;
    },

    setApiError: (state, action: PayloadAction<boolean>) => {
      state.hasApiError = action.payload;
    },
  },
});

export const { setTimeLeft, tickTimer, resetCountdown, setApiError } =
  countdownSlice.actions;

export default countdownSlice.reducer;
