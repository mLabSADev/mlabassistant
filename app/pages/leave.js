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
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {googleSignIn, onAuthStateChange} from '../redux/user-async-action';
const LeavePage = ({navigation, updateCV, route, userProfile}) => {
  var data = {};
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({});
  const leaveDocument = firestore().collection('Leave');
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const toast = useToast();
  const {profile, isLoggedIn, isLoading} = useSelector(state => state.user);
  React.useEffect(() => {
    if (!isLoggedIn) {
      dispatch(googleSignIn());
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
            {profile?.displayName ? (
              <Text>{profile.displayName}</Text>
            ) : (
              <Text>Welcome</Text>
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
                  break;
                case 'thankyou':
                  break;
                case 'finish':
                  if (isLoggedIn) {
                    const data = {
                      user:
                        {name: profile?.displayName, email: profile?.email} ||
                        {},
                      messages: chats || [],
                    };
                    console.log(data);
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
                    dispatch(onAuthStateChange());
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
export default connect(stateToProps)(LeavePage);

let ScreenHeight = Dimensions.get('window').height;
let ScreenHeightHalf = Dimensions.get('window').height / 1.5;
let ScreenWidth = Dimensions.get('window').width;
