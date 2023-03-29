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
  useToast,
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
  const user = {
    profile: {},
    isLoggedIn: false,
  };

  var data = {};
  const [formValues, setFormValues] = useState({});
  const leaveDocument = firestore().collection('Leave');
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState({});
  const toast = useToast();

  const UserSignIn = async () => {
    try {
      GoogleSignin.configure({
        webClientId:
          '850465646909-2cfodnp5aquup07hi3kdiblasrr97bqg.apps.googleusercontent.com',
        offlineAccess: false,
      });
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setProfile(userInfo.user);
      setIsLoggedIn(true);
      toast.show({title: 'Signed in'});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        toast.show({title: 'Sign-in Cancelled'});
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        toast.show({title: 'Sign-in in Progress'});
        await GoogleSignin.signInSilently();
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        toast.show({
          title: 'Sign-in failed',
          description: 'Play service not available',
        });
        // play services not available or outdated
      } else {
        toast.show({title: 'Signin Failed', description: error.message});
        await GoogleSignin.signInSilently();
        // some other error happened
      }
    }
  };
  React.useEffect(() => {
    UserSignIn();
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
              {isLoggedIn ? (
                <Text color={'green.400'} m={0}>
                  online
                </Text>
              ) : (
                <Text color={'red.400'} m={0}>
                  offline
                </Text>
              )}
            </Box>
            {name ? <Text>{name}</Text> : <Text>Welcome</Text>}
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
                  break;
                case 'thankyou':
                  break;
                case 'finish':
                  'ChatForm > onAction > switch > finish';

                  if (isLoggedIn) {
                    ('finish > loggedIn');
                    const data = {
                      user: profile || {},
                      messages: chats || [],
                    };
                    leaveDocument
                      .add(data)
                      .then(res => {
                        toast.show({
                          render: () => {
                            return (
                              <Box
                                p={3}
                                rounded={'3xl'}
                                background={'green.600'}>
                                <Text color="white">Request sent</Text>
                              </Box>
                            );
                          },
                        });
                      })
                      .catch(err => {
                        toast.show({
                          title: 'Something went wrong',
                          description: 'Request failed to send',
                        });
                      });
                  } else {
                    ('Finish > noUser');
                    ('no Profile');
                    UserSignIn();
                  }
                  break;
              }
            }}
            onValue={(key, value) => {
              ('Formik onValue');
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
export default LeavePage;

let ScreenHeight = Dimensions.get('window').height;
let ScreenHeightHalf = Dimensions.get('window').height / 1.5;
let ScreenWidth = Dimensions.get('window').width;
