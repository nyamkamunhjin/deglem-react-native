import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import RootNavigator from './navigation/Drawer/Drawer';
import CookieContext from './context/cookie-context';
import CookieManager from '@react-native-community/cookies';
import { BACKEND_URL } from './env.config';
import { formatDate, getToken } from './functions/functions';
import UserAPI from './api/UserAPI';

/**
 * @author
 * @function App
 **/
const App = (props) => {
  // const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [selectedDate, setSelectedDate] = useState(() => {
    console.log('setSelected called from App.js');
    let date = {};
    date[formatDate(new Date())] = { selected: true };
    return date;
  });

  const getUser = async (token) => {
    const { data, err } = await UserAPI.getUser(token);

    if (err) {
      console.error(err);
      console.log('getUser error');
    } else {
      setUser(data);
    }
  };

  const logIn = ({ token, expires }) => {
    CookieManager.set(BACKEND_URL, {
      name: 'token',
      value: token,
      expires,
    })
      .then(async (done) => {
        console.log('log in:', token);
        setToken(token);
        getUser(token);

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
      setUser(null);
    });
  };

  useEffect(() => {
    getToken().then(async (data) => {
      // console.log(data);
      // setLoggedIn(true);
      setToken(data);
      getUser(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CookieContext.Provider
      value={{
        token,
        user,
        setUser,
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
