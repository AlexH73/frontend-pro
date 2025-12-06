import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface WeatherState {
  city: string;
}

const initialState: WeatherState = {
  city: "",
};

const weatherSlice = createSlice({
  name: "weatherState",
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
  },
});

export const { setCity } = weatherSlice.actions;
export default weatherSlice.reducer;
