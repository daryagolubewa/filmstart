
export const WEATHER_TYPES = {
  SET_WEATHER_START: 'SET_WEATHER_START',
  SET_WEATHER_SUCCESS: 'SET_WEATHER_SUCCESS',
  SET_WEATHER_ERROR: 'SET_WEATHER_ERROR'
};
export const setWeatherStartAC = () => ({
  type: WEATHER_TYPES.SET_WEATHER_START
});

export const setWeatherSuccessAC = weather => ({
  type: WEATHER_TYPES.SET_WEATHER_SUCCESS,
  payload: {
    weather
  }
});

export const setWeatherErrorAC = () => ({
  type: WEATHER_TYPES.SET_WEATHER_ERROR
});
