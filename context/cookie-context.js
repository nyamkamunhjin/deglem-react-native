import React from 'react';
// import Cookies from 'universal-cookie';

export default React.createContext({
  token: null,
  user: null,
  setUser: () => {},
  // cookies: null,
  logIn: () => {},
  logOut: () => {},
  // loggedIn: false,
  getSelectedDate: () => {},
  setSelectedDate: () => {},
});
