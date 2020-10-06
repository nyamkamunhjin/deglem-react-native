import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import RootNavigator from './navigation/Drawer/Drawer';
import CookieContext from './context/cookie-context';
import CookieManager from '@react-native-community/cookies';
import { BACKEND_URL } from './env.config';
import SignIn from './screens/SignIn';

/**
 * @author
 * @function App
 **/
const App = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = ({ token, expires }) => {
    CookieManager.set(BACKEND_URL, {
      name: 'token',
      value: token,
      expires,
    })
      .then((done) => {
        setLoggedIn(true);
        console.log('done:', done);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logOut = () => {
    CookieManager.clearAll().then((success) => {
      setLoggedIn(false);
    });
  };

  useEffect(() => {
    CookieManager.get(BACKEND_URL).then((cookie) => {
      if (Object.keys(cookie).length !== 0) {
        // console.log(CookieManager);
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  return (
    <CookieContext.Provider
      value={{
        cookies: CookieManager,
        logIn: logIn,
        logOut: logOut,
        loggedIn,
      }}>
      {<RootNavigator />}
    </CookieContext.Provider>
  );
};

export default App;
