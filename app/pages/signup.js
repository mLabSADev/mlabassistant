import React, {useState} from 'react';
import {connect} from 'react-redux';
import {View, Button, Text, Icon} from 'native-base';
import {login} from '../redux/user';
import {Dimensions, StyleSheet, TextInput, ImageBackground} from 'react-native';
import {ThemeColors} from '../theme/colors';
// import LinearGradient from 'react-native-linear-gradient';

const SignUpPage = ({navigation}) => {
  const {navigate} = navigation;
  const [email, setemail] = useState(undefined);

  const onGoToSignIn = () => {
    navigate('Login');
  };

  const onLogin = () => {
    // login();
    navigation.navigate('Home');
  };
  const onChangeemail = val => {
    val;
    setemail(val);
  };
  return (
    <View style={{backgroundColor: ThemeColors.brandSecondary}}>
      {/* <LinearGradient
        colors={[ThemeColors.brandSecondary, ThemeColors.brandSecondary]}
        start={{y: 0.0, x: 0.0}}
        end={{y: 0.0, x: 1.0}}></LinearGradient> */}
      <ImageBackground
        style={styles.imagebackground}
        source={require('../assets/imagebg.png')}
      />
      <View style={styles.loginTopsheet}>
        <View style={styles.logoTextWrapper}>
          <Text style={styles.logoHeading}>mlab</Text>
          <Text style={styles.logoSubcenterText}>Assistan</Text>
        </View>
      </View>
      <View style={styles.loginBottomsheet}>
        <View style={styles.marginSpaceTop16} />
        <Text style={styles.heading}>Sign Up</Text>
        <View style={styles.marginSpaceTop16} />
        <Text style={styles.centerText}>Please log in to continue </Text>
        <View style={{padding: 16}}>
          <TextInput
            placeholder="Email"
            style={styles.input}
            autoCapitalize="none"
            value={email}
            onChangeText={onChangeemail}
          />
          <View style={styles.marginSpaceTop16} />
          <TextInput
            placeholder="Password"
            style={styles.input}
            autoCapitalize="none"
            value={email}
            onChangeText={onChangeemail}
            secureTextEntry={false}
          />
          <View style={styles.marginSpaceTop16} />
          <View style={styles.buttonFlex}>
            <Button style={styles.buttonSecondary} onPress={onGoToSignIn}>
              <Text style={styles.centerText}>Sign In</Text>
            </Button>
            <Button style={styles.buttonPrimary} onPress={onLogin}>
              <Text style={styles.centerText}>Sign Up</Text>
            </Button>
          </View>
          <View style={styles.marginSpaceTop16} />
          <Text style={styles.centerText}>Please log in to continue </Text>
          <View style={styles.marginSpaceTop16} />
          <Button icon style={styles.iconButtonPrimary}>
            <Icon type="FontAwesome" name="google" />
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginTopsheet: {
    height: '43%',
    width: '100%',
    borderRadius: 20,
  },
  loginBottomsheet: {
    backgroundColor: ThemeColors.brandLight,
    height: '57%',
    width: '95%',
    borderRadius: 20,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    bottom: 10,
  },
  inputLable: {
    padding: 5,
    color: 'grey',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 8,
    borderRadius: 15,
    height: 45,
    color: 'black',
    backgroundColor: '#F1F1F1',
  },
  buttonFlex: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
  },
  centerText: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  marginSpaceTop16: {
    marginTop: 16,
  },
  buttonSecondary: {
    backgroundColor: ThemeColors.brandSecondary,
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  buttonPrimary: {
    backgroundColor: ThemeColors.brandPrimary,
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  iconButtonPrimary: {
    backgroundColor: ThemeColors.brandPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    width: 55,
    height: 55,
    alignSelf: 'center',
  },
  logoHeading: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 46,
    fontWeight: 'bold',
    color: 'white',
  },
  logoSubcenterText: {
    textAlign: 'right',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    color: 'white',
  },
  logoTextWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  imagebackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
});

const dispatchToState = dispatch => {
  return {
    login: () => dispatch(login()),
  };
};

export default connect(null, dispatchToState)(SignUpPage);

// import React from 'react';
// import {connect} from 'react-redux';
// import {View, Button, Text} from 'native-base';

// const SignUpPage = ({navigation}) => {
//   const {goBack} = navigation;

//   const onGoBack = () => {
//     goBack();
//   };

//   return (
//     <View>
//       <Button onPress={onGoBack}>
//         <Text>Go back</Text>
//       </Button>
//     </View>
//   );
// };

// export default connect()(SignUpPage);
