export const LOCATION_TYPES = {
  GET_LOCATION: 'GET_LOCATION'
};

export const getLocationAC = location => ({
  type: LOCATION_TYPES.GET_LOCATION,
  payload: {
    location
  }
});
