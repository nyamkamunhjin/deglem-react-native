import React from 'react';
// import Cookies from 'universal-cookie';

export default React.createContext({
  cookies: null,
  logIn: () => {},
  logOut: () => {},
  loggedIn: false,
  getSelectedDate: () => {},
  setSelectedDate: () => {},
});
