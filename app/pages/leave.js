import React, {useState} from 'react';
import {
  Box,
  View,
  Text,
  Thumbnail,
  VStack,
  Button,
  HStack,
  Heading,
  Avatar,
} from 'native-base';
import {
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import * as form from '../assets/claims.json';
import firestore from '@react-native-firebase/firestore';
import {ThemeColors} from '../theme/colors';
import ChatForm from '../components/chat-form';
import {connect, useDispatch, useSelector} from 'react-redux';
import {ChatBotName} from '../assets/app-consts';
import {LocationService} from '../services/location-service';
import {signIn} from '../redux/userAccountSlice';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const LeavePage = ({navigation, updateCV, route}) => {
  const profile = useSelector(state => state.user);
  const app = useSelector(state => state.app);
  const dispatch = useDispatch();
  const {goBack} = navigation;
  const onGoBack = () => {
    goBack();
    goBack();
  };
  var data = {};
  const [formValues, setFormValues] = useState({});
  const leaveDocument = firestore().collection('Leave');
  const [messages, setMessages] = useState([]);
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
  const UserSignIn = async () => {
    GoogleSignin.configure();
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log('Leave > UserSignIn ', userInfo);
  };
  React.useEffect(() => {
    for (key in app) {
      console.log(app[key] + '<<<' + key);
    }
  }, []);
  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <VStack space={5} bg={'blueGray.700'} flex={1}>
        <VStack space={3} flex={1} p={3}>
          <HStack
            bg={'blueGray.800'}
            p={3}
            px={5}
            paddingRight={5}
            rounded={'3xl'}
            alignItems={'center'}
            space={4}>
            <Avatar source={require('../assets/bot-avatar.jpg')} />
            <Box flex={1}>
              <Text fontSize={24} m={0} fontWeight={'bold'} color={'white'}>
                {ChatBotName.name}
              </Text>
              {profile.isLoggedIn ? (
                <Text color={'green.400'} m={0}>
                  online
                </Text>
              ) : (
                <Text color={'red.400'} m={0}>
                  offline
                </Text>
              )}
            </Box>
            {app.botType === 'claims' && (
              <Text color={'blueGray.400'}>Claiming for a trip</Text>
            )}
            {app.botType === 'leave' && (
              <Text color={'blueGray.400'}>Applying for leave</Text>
            )}
            {app.botType === 'Welcome' && (
              <Text color={'blueGray.400'}>{app.botType}</Text>
            )}
          </HStack>

          <ChatForm
            navigation={navigation}
            route={route}
            profile={profile}
            chatBubbleColor={'#073F4E'}
            form={form}
            onAction={async (key, {sendMessage, nextMessage, chats}) => {
              setMessages(chats);
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
                  console.log('ChatForm > onAction > switch > finish');

                  if (profile.isLoggedIn) {
                    console.log('finish > loggedIn');
                    const data = {
                      user: profile.profile.displayName || {},
                      messages: chats || [],
                    };
                    leaveDocument
                      .add(data)
                      .then(res => {
                        console.log('Firebase Document added');
                      })
                      .catch(err => {
                        console.log('Firebase Document Error ', err);
                      });
                  } else {
                    console.log('Finish > noUser');
                    console.log('no Profile');
                    UserSignIn();
                  }
                  break;
              }
            }}
            onValue={(key, value) => {
              console.log('Formik onValue');
              setFormValues(values => {
                values[key] = value;
                return values;
              });
              return value;
            }}
          />
        </VStack>
      </VStack>
    </KeyboardAvoidingView>
  );
};

const stateToProps = state => {
  return {
    profile: state.user.profile,
  };
};
export default connect(stateToProps)(LeavePage);

let ScreenHeight = Dimensions.get('window').height;
let ScreenHeightHalf = Dimensions.get('window').height / 1.5;
let ScreenWidth = Dimensions.get('window').width;
