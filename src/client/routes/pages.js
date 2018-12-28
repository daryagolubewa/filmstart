export const PAGES = {
  home: {
    name: 'home',
    path: '/'
  },
  details: {
    name: 'details',
    path: '/details/:id',
    call: id => `/details/${id}`
  },
  page404: {
    name: 'page404',
    path: '/page404'
  }
};
