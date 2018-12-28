import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import weatherReducer from './weather-reducer';
import locationReducer from './location-reducer';

const reducers = history => combineReducers({
  router: connectRouter(history),
  weather: weatherReducer,
  location: locationReducer
});

export default reducers;
