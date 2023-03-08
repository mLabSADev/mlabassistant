import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import LoginPage from './app/pages/login';
import SignUpPage from './app/pages/signup';
import ClaimsPage from './app/pages/claims';
import LeavePage from './app/pages/leave';
import LoadingPage from './app/pages/loading';
import ProfilePage from './app/pages/profile';
import HomePage from './app/pages/home';
import {Alert} from 'react-native';
import {ThemeColors} from './app/theme/colors';
import {View} from 'native-base';
import {connect} from 'react-redux';
import LocationPage from './app/pages/location';

const Stack = createStackNavigator();
const RootStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen
        name="Leave"
        component={LeavePage}
        options={{title: 'Login', headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpPage}
        options={{title: 'Sign Up', headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={AppStack}
        options={{title: 'Home', headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  return (
    <Drawer.Navigator drawerContent={props => <View {...props} />}>
      <Stack.Screen
        name="Home"
        component={HomeStack}
        options={{title: 'Home'}}
      />
    </Drawer.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: ThemeColors.brandPrimary,
        },
        headerTintColor: '#fff',
      }}>
      <Stack.Screen
        name="Profile"
        component={ProfilePage}
        options={{title: 'Profile', headerShown: false}}
      />
      <Stack.Screen
        name="Claims"
        component={ClaimsPage}
        options={{title: 'Claims', headerShown: false}}
      />
      <Stack.Screen
        name="Leave"
        component={LeavePage}
        options={{title: 'Leave', headerShown: false, animationEnabled: false}}
      />
      <Stack.Screen
        name="Location"
        component={LocationPage}
        options={{title: 'Location', headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const NavigationStack = ({isLoggedIn, isLoading, showAsScreen, error}) => {
  useEffect(() => {
    if (error) {
      Alert.alert('Error', error.message, [
        {
          text: 'Ok',
        },
      ]);
    }
  }, [error]);

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: ThemeColors.brandPrimary,
          },
          headerTintColor: '#fff',
        }}
        drawerContent={props => <View />}>
        <RootStack.Screen
          name="App"
          component={
            isLoading ? LoadingPage : isLoggedIn ? AuthStack : AuthStack
          }
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const mapStatesToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    isLoading: state.user.isLoading,
  };
};

export default connect(mapStatesToProps)(NavigationStack);
