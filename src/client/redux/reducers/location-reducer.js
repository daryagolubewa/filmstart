import { LOCATION_TYPES } from '../actions/location-action';

const initialState = {
  location: ''
};

export default function locationReducer(state = initialState, { type, payload }) {
  switch (type) {
    case LOCATION_TYPES.GET_LOCATION: {
      return {
        location: payload.location
      };
    }
    default:
      return state;
  }
}
