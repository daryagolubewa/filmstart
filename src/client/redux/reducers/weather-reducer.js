import { WEATHER_TYPES } from '../actions/weather-actions';

const initialState = {
  weather: []
};

export default function weatherReducer(state = initialState, { type, payload }) {
  switch (type) {
    case WEATHER_TYPES.SET_WEATHER_START: {
      return { ...state };
    }
    case WEATHER_TYPES.SET_WEATHER_SUCCESS: {
      return {
        weather: payload.weather
      };
    }
    case WEATHER_TYPES.SET_WEATHER_ERROR: {
      return { ...state };
    }
    default:
      return state;
  }
}
