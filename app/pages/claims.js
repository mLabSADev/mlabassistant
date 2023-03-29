import React, {useState, useEffect} from 'react';
import {Container, Icon, View, Text, Thumbnail} from 'native-base';
import {
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import * as form from '../assets/claims.json';
import {ThemeColors} from '../theme/colors';
import ChatForm from '../components/chat-form';
import {connect, useDispatch} from 'react-redux';
import {ChatBotName} from '../assets/app-consts';
import {LocationService} from '../services/location-service';
import moment from 'moment';

// import {
//   GetBusinessProfile,
//   PostBusinessProfile,
// } from '../redux/user-async-action';

const ClaimsPage = ({navigation, profile, updateCV, route}) => {
  const dispatch = useDispatch();
  const {goBack} = navigation;
  const onGoBack = () => {
    goBack();
  };
  var data = {};
  const [formValues, setFormValues] = useState({});
  const [numberOfLeaveDays, setNumberOfLeaveDays] = useState();
  const [leaveType, setleaveType] = useState(false);
  const [distanceStay, setdistanceStay] = useState([]);
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
      startAddress: formValues['startAddress'].location,
      destination: formValues['destination'].location,
      dateOfTravel: formValues['dateOfTravel'],
      nightSpentOptional: formValues['nightSpentOptional'],
      nightSpentYes: formValues['nightSpentYes'],
      startLeaveDay: formValues['startLeaveDay'],
      endingLeaveDay: formValues['endingLeaveDay'],
      //nightSpentYes: formValues['nightSpentYes'].location,
      complete: true,
    };
    //  (data);
    return data;
    // updateCV('BusinessProfile', data);
  };
  useEffect(() => {
    ('<--------- isFocused ---------->');
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <SafeAreaView style={{height: '100%'}}>
        <Container theme={{}}>
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
                {/* Logging a claim */}
              </Text>
            </View>
          </View>

          <ChatForm
            navigation={navigation}
            route={route}
            chatBubbleColor={'#073F4E'}
            form={form}
            onAction={(key, {sendMessage, nextMessage}) => {
              switch (key) {
                case 'greeting':
                  sendMessage(
                    `Hello ${profile.fullNames}, my name is ${ChatBotName.name} and I will be helping you create your beautiful CV, by giving you suggestions about why and where you should give out your information.`,
                    true,
                  );
                  nextMessage('claims');
                  break;
                case 'continue':
                  sendMessage(
                    `Thank you ${profile.fullNames} for you time. You can now proceed and start using a customized version of the app`,
                    true,
                  );
                  nextMessage('continue');
                  break;
                case 'finish':
                  update().then(res => {
                    'resxX', res;
                  });

                  // const latOwnVehicle = data.startAddress.lat;
                  // const lngOwnVehicle = data.startAddress.lng;
                  // const latDestination = data.destination.lat;
                  // const lngDestination = data.destination.lng;
                  // const origin = `${latOwnVehicle},${lngOwnVehicle}`;
                  // const destination = `${latDestination},${lngDestination}`;
                  // var kmTotal;
                  // let nightSpent;

                  // LocationService.distanceFilter(origin, destination)
                  //   .then((datax) => {
                  //     const distanceFix = `${datax[0].elements[0].distance.text}`.replace(
                  //       'km',
                  //       '',
                  //     );
                  //     const add = parseInt(distanceFix).toFixed(2);
                  //      ('distance', `R${add * 4.18}`);
                  //     kmTotal = add * 4.18;
                  //     nightSpent = data.nightSpentYes;
                  //      ('nightSpent', `R${nightSpent * 150}`);
                  //   })

                  //   .finally(() => {
                  if (leaveType === true) {
                    sendMessage(
                      `Thank you the total amount of the traveled is R${distanceStay[0].toFixed(
                        2,
                      )} and nightSpent amount R${distanceStay[1] * 150}`,
                      true,
                    );
                  }
                  if (leaveType !== true) {
                    sendMessage(
                      `You will be taking ${numberOfLeaveDays} days of leave `,
                      true,
                    );
                  }
                  // });

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
              setFormValues(values => {
                values[key] = value;
                ({key});
                'qwert', values[key];
                // if (key === 'greeting' && values[key] === 'Leave') {
                //    ('true is leave');
                // navigation.navigate('Leave');
                // }
                // if (key === 'locationSelected') {
                //    ('true is leave');
                //   navigation.navigate('Leave');
                // }

                if (key === 'destination') {
                  const latOwnVehicle = values['startAddress'].location.lat;
                  const lngOwnVehicle = values['startAddress'].location.lng;
                  const latDestination = values['destination'].location.lat;
                  const lngDestination = values['destination'].location.lng;
                  const origin = `${latOwnVehicle},${lngOwnVehicle}`;
                  const destination = `${latDestination},${lngDestination}`;
                  var kmTotal;
                  let nightSpent;

                  LocationService.distanceFilter(origin, destination)
                    .then(datax => {
                      const distanceFix =
                        `${datax[0].elements[0].distance.text}`.replace(
                          'km',
                          '',
                        );
                      const add = parseInt(distanceFix).toFixed(2);
                      'distance', `R${add * 4.18}`;
                      kmTotal = add * 4.18;
                      nightSpent = data.nightSpentYes;
                      'nightSpent', `R${nightSpent * 150}`;
                    })

                    .finally(() => {
                      setdistanceStay([kmTotal, nightSpent]);
                      setleaveType(true);
                    });
                }

                if (key === 'endingLeaveDay') {
                  const getDaysDiff = (
                    start_date,
                    end_date,
                    date_format = 'YYYY-MM-DD',
                  ) => {
                    const getDateAsArray = date => {
                      return moment(date.split(/\D+/), date_format);
                    };
                    return (
                      getDateAsArray(end_date).diff(
                        getDateAsArray(start_date),
                        'days',
                      ) + 1
                    );
                  };
                  const StartDatetest = moment(
                    values['startLeaveDay'],
                    'DD/MM/YYYY',
                  ).format('YYYY-MM-DD');
                  const EndDatetest = moment(
                    values['endingLeaveDay'],
                    'DD/MM/YYYY',
                  ).format('YYYY-MM-DD');

                  getDaysDiff(StartDatetest, EndDatetest);
                  const days = getDaysDiff(StartDatetest, EndDatetest);
                  setNumberOfLeaveDays(days);
                  setleaveType(false);
                }

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

const stateToProps = state => {
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

export default connect(stateToProps)(ClaimsPage);

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
