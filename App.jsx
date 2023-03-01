import React from 'react';
import reducers from './app/redux/reducers';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'remote-redux-devtools';
import thunkMiddleware from 'redux-thunk';
// import {requestCurrentUser}r from './app/redux/auth/auth-actions'
import {NativeBaseProvider} from 'native-base';
import 'react-native-gesture-handler';
import NavigationStack from './NavigationStack';
import Loader from './app/components/loader';
import {onAuthStateChange} from './app/redux/user-async-action';

export default function App() {
  const composeEnhancers = composeWithDevTools({
    realtime: true,
    hostname: '192.168.8.20',
    port: 8000,
  }); // Change IP address to your machine's IP address if you would like to use devtools
  const store = createStore(
    reducers,
    {},
    composeEnhancers(applyMiddleware(thunkMiddleware)),
  );
  store.dispatch(onAuthStateChange());
  // store.dispatch(requestCurrentUser())

  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <NavigationStack />
        <Loader />
      </Provider>
    </NativeBaseProvider>
  );
}
