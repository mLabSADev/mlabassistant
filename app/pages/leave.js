import React, {useState} from 'react';
import {Container, Icon, View, Text, Thumbnail} from 'native-base';
import {
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import * as form from '../assets/leave.json';
import {ThemeColors} from '../theme/colors';
import ChatForm from '../components/chat-form';
import {connect, useDispatch} from 'react-redux';
import {ChatBotName} from '../assets/app-consts';
import {LocationService} from '../services/location-service';

const LeavePage = ({navigation, profile, updateCV, route}) => {
  const dispatch = useDispatch();
  const {goBack} = navigation;
  const onGoBack = () => {
    goBack();
    goBack();
  };
  var data = {};
  const [formValues, setFormValues] = useState({});
  const update = async () => {
    data = {
      typeOfClaim: formValues['claims'],
      personalPayment: formValues['personalPayment'],
      howmuch: formValues['howmuch'],
      takePicture: formValues['takePicture'],
      upload: formValues['upload'],
      travel: formValues['travel'],
      modeOfTransportOptional: formValues['modeOfTransportOptional'],
      uberBolt: formValues['uberBolt'],
      startAddress: formValues['ownVehicle'].location,
      destination: formValues['destination'].location,
      dateOfTravel: formValues['dateOfTravel'],
      nightSpentOptional: formValues['nightSpentOptional'],
      nightSpentYes: formValues['nightSpentYes'],
      //nightSpentYes: formValues['nightSpentYes'].location,
      complete: true,
    };
    // console.log(data);
    return data;
    // updateCV('BusinessProfile', data);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <SafeAreaView style={{height: '100%'}}>
        <Container>
          {/* <ImageBackground
            style={styles.imagebackground}
            source={require('../assets/background.png')}
          /> */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              margin: 18,
              backgroundColor: 'white',
              width: '93%',
              // padding: 2,
              // borderRadius: 10,
              // shadowColor: '#000',
              // shadowOffset: {width: 0, height: 2},
              // shadowOpacity: 0.25,
              // shadowRadius: 3.84,
              // elevation: 5,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: ThemeColors.brandPrimary,
                width: 50,
                height: 50,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                type="MaterialIcons"
                name="keyboard-arrow-left"
                style={{fontSize: 40, color: 'white'}}
                onPress={() => onGoBack()}
              />
            </TouchableOpacity>
            <Text style={{fontSize: 24, fontWeight: 'bold', marginLeft: 20}}>
              {ChatBotName.name}
            </Text>
            {/* <View style={{flexDirection: 'row'}}>
              <View>
                <Thumbnail
                  style={{width: 32, height: 32, marginRight: 0}}
                  source={require('../assets/bot-avatar.jpg')}
                />
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    backgroundColor: 'green',
                    height: 10,
                    width: 10,
                    borderRadius: 100,
                  }}></View>
              </View>
              <View style={{left: -10}}>
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', marginLeft: 20}}>
                  {ChatBotName.name}
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: 'bold',
                    marginLeft: 20,
                    color: 'green',
                  }}>
                  Online
                </Text>
              </View>
            </View> */}
            <View style={{justifyContent: 'center', left: ScreenWidth / 6}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Applying for leave
              </Text>
            </View>
          </View>

          <ChatForm
            navigation={navigation}
            route={route}
            chatBubbleColor={'#073F4E'}
            form={form}
            onAction={(key, {sendMessage, nextMessage}) => {
              console.log('asdfghjk');
              console.log({key, sendMessage, nextMessage});
              switch (key) {
                case 'greeting':
                  sendMessage(
                    `Hello ${profile.fullNames}, my name is ${ChatBotName.name} and I will be helping you create your beautiful CV, by giving you suggestions about why and where you should give out your information.`,
                    true,
                  );
                  nextMessage('claims');
                  break;
                case 'thankyou':
                  sendMessage(
                    `Thank you ${profile.fullNames} for you time. You can now proceed and start using a customized version of the app`,
                    true,
                  );
                  nextMessage('continue');
                  break;
                case 'finish':
                  // console.log('dataxXx', data);
                  //   update().then((res) => {
                  //     // console.log('resxX', res);
                  //     // console.log('dataxXx', data.ownVehicle, data.destination);
                  //   });
                  //   const latOwnVehicle = data.ownVehicle.lat;
                  //   const lngOwnVehicle = data.ownVehicle.lng;
                  //   const latDestination = data.destination.lat;
                  //   const lngDestination = data.destination.lng;
                  //   const origin = `${latOwnVehicle},${lngOwnVehicle}`;
                  //   const destination = `${latDestination},${lngDestination}`;
                  //   LocationService.distanceFilter(origin, destination).then(
                  //     (datax) => {
                  //       const distanceFix = `${datax[0].elements[0].distance.text}`.replace(
                  //         'km',
                  //         '',
                  //       );
                  //       const add = parseInt(distanceFix);
                  //       console.log('distance', `R${add * 4.18}`);
                  //       const nightSpent = data.nightSpentYes;
                  //       console.log('nightSpent', `R${nightSpent * 150}`);
                  //     },
                  //   );
                  // update().finally(() => {
                  //   dispatch(GetBusinessProfile()).then((res) => {
                  //     navigation.navigate('BusinessProfilePage', {
                  //       name: 'ManageBusinessProfilePage',
                  //     });
                  //   });
                  // });
                  break;
              }
              // navigation.goBack()
            }}
            onValue={(key, value) => {
              setFormValues((values) => {
                values[key] = value;

                return values;
              });

              // if (key === 'businessRegistration') {
              //     arrayValues.push(JSON.parse(JSON.stringify(formValues)))
              // }
              // if (key === 'businessLogo') {
              //     arrayValues.push(JSON.parse(JSON.stringify(formValues)))
              // }
              // if (key === 'anotherSkill') {
              //     arrayValues.push(JSON.parse(JSON.stringify(formValues)))
              // }
              // if (key === 'anotherSkill') {
              //     arrayValues.push(JSON.parse(JSON.stringify(formValues)))
              // }

              return value;
            }}
          />
        </Container>
      </SafeAreaView>
      {/* </View> */}
    </KeyboardAvoidingView>
  );
};

const stateToProps = (state) => {
  return {
    profile: state.user.profile,
  };
};

// const dispatchToProps = (dispatch) => {
// return {
//   updateCV: (category, data) =>
//     dispatch(PostBusinessProfile({category, data})),
// };
// };

export default connect(stateToProps)(LeavePage);

let ScreenHeight = Dimensions.get('window').height;
let ScreenHeightHalf = Dimensions.get('window').height / 1.5;
let ScreenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  imagebackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  menuIconLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 16,
  },
  menuIconRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 16,
  },
  verifIconRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingTop: 8,
    color: ThemeColors.brandSuccess,
  },
  text: {
    fontSize: 50,
  },
  all: {
    fontSize: 20,
  },
  mainCard: {
    height: ScreenHeight,
    width: ScreenWidth,
    backgroundColor: 'white',
    borderRadius: 40,
    padding: 16,
  },
  list: {
    backgroundColor: '#fafafa',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
});
