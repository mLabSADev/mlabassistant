import React from 'react';
import {connect} from 'react-redux';
import {View, Text, Button} from 'native-base';
import {logout} from '../redux/user';
import {LocationService} from '../services/location-service';

import {Dimensions, StyleSheet} from 'react-native';
const HomePage = ({navigation, profile, logout}) => {
  const onLogout = () => {
    // logout();
    navigation.navigate('Claims');
    // LocationService.addresses()
    //   .then((addresses) => {
    //     console.log('addresses');
    //     console.log(addresses);
    //   })
    //   .catch((e) => {
    //     console.log('error');
    //     console.log(e);
    //   });
  };
  const onLeave = () => {
    // logout();
    navigation.navigate('Leave');
  };
  return (
    <View style={{padding: 16}}>
      <Text style={{paddingBottom: 50, textAlign: 'center', fontSize: 28}}>
        Welcome
      </Text>
      <Button block onPress={onLogout}>
        <Text>Log A Claims</Text>
      </Button>

      <Button style={{marginTop: 24}} block onPress={onLeave}>
        <Text>Apply for Leave</Text>
      </Button>
    </View>
  );
};

const stateToProps = state => {
  return {
    profile: state.user.profile,
  };
};

// const dispatchToProps = (dispatch) => {
// return {
//   logout: () => dispatch(logout()),
// };
// };
let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  loginBottomsheet: {
    backgroundColor: 'red',
    height: '50%',
    width: '100%',
    top: '30%',
    // borderRadius: 20,
  },
});
export default connect(stateToProps)(HomePage);
