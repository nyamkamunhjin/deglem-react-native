import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import RootNavigator from './navigation/Drawer/Drawer';
import CookieContext from './context/cookie-context';
import CookieManager from '@react-native-community/cookies';
import { BACKEND_URL } from './env.config';
import { formatDate, getToken } from './functions/functions';

/**
 * @author
 * @function App
 **/
const App = (props) => {
  // const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [selectedDate, setSelectedDate] = useState(() => {
    console.log('setSelected called from App.js');
    let date = {};
    date[formatDate(new Date())] = { selected: true };
    return date;
  });

  const logIn = ({ token, expires }) => {
    CookieManager.set(BACKEND_URL, {
      name: 'token',
      value: token,
      expires,
    })
      .then((done) => {
        console.log('log in:', token);
        setToken(token);
        // setLoggedIn(true);

        console.log('done:', done);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logOut = () => {
    CookieManager.clearAll().then((success) => {
      // setLoggedIn(false);
      setToken(null);
    });
  };

  useEffect(() => {
    getToken().then((data) => {
      // console.log(data);
      // setLoggedIn(true);
      setToken(data);
    });
    // CookieManager.get(BACKEND_URL).then((cookie) => {
    //   if (Object.keys(cookie).length !== 0) {
    //     // console.log(CookieManager);
    //     setLoggedIn(true);
    //   }
    // });
  }, []);

  return (
    <CookieContext.Provider
      value={{
        token,
        // cookies: CookieManager,
        logIn,
        logOut,
        // loggedIn,
        getSelectedDate: (raw) =>
          raw ? selectedDate : Object.keys(selectedDate)[0],
        setSelectedDate,
      }}>
      <RootNavigator />
    </CookieContext.Provider>
  );
};

export default App;
