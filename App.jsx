/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NativeBaseProvider, extendTheme} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/pages/Home';
import {Provider} from 'react-redux';

import {store} from './src/redux/store';
const Stack = createNativeStackNavigator();

const App = () => {
  const theme = extendTheme({
    colors: {
      // Add new color
      primary: {
        50: '#66d1e6',
        100: '#4bc2da',
        200: '#33b1ca',
        300: '#3191a4',
        400: '#287686',
        500: '#27636f',
        600: '#25515a',
        700: '#214046',
        800: '#1c3034',
        900: '#152023',
      },

      // Redefining only one shade, rest of the color will remain same.
      amber: {
        400: '#d97706',
      },
    },
    components: {
      Button: {
        baseStyle: {
          rounded: 'full',
        },
      },
      Input: {
        baseStyle: {
          height: 50,
          rounded: 'full',
        },
      },
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: 'dark',
    },
  });
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
