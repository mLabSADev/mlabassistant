import React, {useState, useEffect} from 'react';
import {
  Box,
  VStack,
  HStack,
  Heading,
  View,
  Text,
  Input,
  Button,
  Picker,
  Avatar,
  Divider,
  Image,
  PresenceTransition,
} from 'native-base';
import {Formik} from 'formik';
import {
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  ScrollView,
} from 'react-native';
import * as leave from '../assets/leave.json';
import * as claims from '../assets/claims.json';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {LocationService, GOOGLE_MAP_KEY} from '../services/location-service';
import {openSettings} from 'react-native-permissions';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {connect, useDispatch, useSelector} from 'react-redux';
import {ThemeColors} from '../theme/colors';
import {launchImageLibrary} from 'react-native-image-picker';
import {useIsFocused} from '@react-navigation/native';
import {
  getLocationChatMap,
  deleteLocationChatMap,
} from '../services/localStorage';
import {setBotType} from '../redux/app';
import {showLoading, hideLoading} from '../redux/app';
import {opacity} from '../theme/transitions';

export const TimePicker = ({value, onChangeTime}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(value && value.length === 5 ? value : '');

  const timeConfirmed = date => {
    const selectedTime = moment(date).format('HH:mm');
    setTime(selectedTime);
    setShowDatePicker(false);

    if (onChangeTime != null) {
      onChangeTime(selectedTime);
    }
  };

  const cancelDatePicker = () => {
    setShowDatePicker(false);
  };

  return (
    <View style={{paddingLeft: 20, flex: 1}}>
      <DateTimePicker
        isVisible={showDatePicker}
        onConfirm={timeConfirmed}
        onCancel={cancelDatePicker}
        mode="time"
        is24Hour={true}
        date={time ? moment(`2012-01-01 ${time}`).toDate() : new Date()}
      />

      <TouchableOpacity
        onPress={() => {
          setShowDatePicker(true);
        }}>
        {time ? (
          <Text color="white">{time}</Text>
        ) : (
          <Text style={{color: 'white'}}>Select Time</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
export const PickerDate = ({value, onChangeTime}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(value && value.length == 5 ? value : '');

  const dateConfirmed = date => {
    const selectedTime = moment(date).format('ddd, Do MMM');
    setTime(selectedTime);
    setShowDatePicker(false);

    if (onChangeTime != null) {
      onChangeTime(selectedTime);
    }
  };

  const cancelDatePicker = () => {
    setShowDatePicker(false);
  };

  return (
    <Box
      style={{paddingLeft: 20, flex: 1}}
      borderColor={'blueGray.600'}
      bg={'blueGray.600'}
      borderWidth={0}
      rounded={'3xl'}>
      <DateTimePicker
        testID="dateTimePicker"
        isVisible={showDatePicker}
        onConfirm={dateConfirmed}
        onCancel={cancelDatePicker}
        value={new Date(2006, 12, 12).toString()}
        mode="date"
        is24Hour={true}
        display={Platform.OS === 'ios' ? 'inline' : 'default'}
        animationType={'fade'}
        androidMode={'default'}
      />
      <TouchableOpacity
        style={{flex: 1, justifyContent: 'center'}}
        onPress={() => {
          setShowDatePicker(true);
        }}>
        {time ? (
          <Text color={'white'}>{time}</Text>
        ) : (
          <Text style={{color: 'white'}}>Select Date</Text>
        )}
      </TouchableOpacity>
    </Box>
  );
};
export const LoadChatBubble = ({}) => {
  return (
    <HStack style={{marginLeft: 18}}>
      <Text mx={9} color={'gray.300'}>
        Typing....
      </Text>
    </HStack>
  );
};
/**
 *  ChatForm
 * @param {object} profile
 * @param {str} chatBubbleColor
 * @param {str} backgroundColor
 * @param {obj} form gets data straight from leave.json
 * @param {func} onValue
 * @param {func} onAction (key, {sendMessage, nextMessage})
 * @param {func} onDropdownList
 * @param {obj} navigation gets navigation props from page
 * @param {func} onAfterMessage
 * @param {obj} prevForm
 * @param {func} onCurrentMessage
 * @returns
 */
const ChatForm = ({
  profile,
  chatBubbleColor = 'black',
  backgroundColor = 'white',
  form,
  onValue,
  onAction,
  onDropdownList,
  navigation,
  onAfterMessage,
  prevForm,
  onCurrentMessage,
  route,
}) => {
  let content;
  let datepicker;
  let globalHandleChange;
  const {navigate} = navigation;
  const [messages, setMessages] = useState([]);
  const [currentText, setCurrentText] = useState('');
  const [initialized, setInit] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(null);
  const [dropdownList, setDropdownList] = useState([]);
  const [showloadchatbubble, setshowloadchatbubble] = useState(true);
  const [location, setlocation] = useState('Type business address');
  const [messagesKey, setMessagesKey] = useState([]);
  const [picturePicker, setpicturePicker] = useState();
  const [isFocusedCliked, setisFocusedCliked] = useState(false);
  const [messagesEdit, setMessagesEdit] = useState(false);

  let scrollViewRef;

  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const botType = useSelector(state => state.app.botType);
  //
  const locationSelected = location => {
    const link =
      `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=17&size=600x300&maptype=roadmap` +
      `&markers=color:red%7Clabel:L%7C${location.lat},${location.lng}` +
      `&key=${GOOGLE_MAP_KEY}`;

    const result = onValue(currentMessage.key, {
      location: location,
      link: link,
    });

    sendImage(result.link, false, currentMessage.key);
  };

  const pictureTaken = async () => {
    dispatch(showLoading('Please wait ....'));
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };
    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        dispatch(hideLoading());
      } else if (response.error) {
        dispatch(hideLoading());
      } else if (response.customButton) {
        dispatch(hideLoading());
      } else {
        const result = onValue(currentMessage.key, response.assets[0].uri);
        sendImage(result, false, currentMessage.key);
      }
    });
  };

  const licenseDiskScanned = licenseDisk => {
    const result = onValue(currentMessage.key, licenseDisk);
    sendMessage(result, true);
    nextMessage(currentMessage.next);
  };

  const scanLicenseDisk = () => {
    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA).then(
      hasPermission => {
        if (!hasPermission) {
          requestCameraPermission();
        } else {
          navigate('ScanLicenseDisk', {
            callback: licenseDiskScanned,
          });
        }
      },
    );
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'mPowa Requires Camera Permission',
          message: 'mPowa needs access to your camera to scan the license disk',
          buttonNegative: 'Cancel',
          buttonPositive: 'Ok',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        navigate('ScanLicenseDisk', {
          callback: licenseDiskScanned,
        });
      } else {
        this.props.navigation.goBack();
      }
    } catch (err) {}
  };

  const start = () => {
    setTimeout(() => {
      nextMessage(form.start);
    }, 500);
  };
  /**
   *  Next Message
   * sets current message
   * triggers onAction if message.type == 'action' else triggers sendMessage
   * sets dropdown list
   * @param {*} key 'greeting'
   * @returns
   */
  const nextMessage = key => {
    // 1 get key data
    setCurrentMessage(null);
    if (key === 'leave') {
      dispatch(setBotType(key));
    } else if (key === 'claims') {
      dispatch(setBotType(key));
    }
    // const message = botType === 'claims' ? claims[key] : leave[key];
    const message = claims[key];

    // 2 push key data
    setMessagesKey(prev => [...prev, key]);

    // stop if no message...
    if (message == null) return;

    // set active current message
    // message = entire 'greeting: {}' obj + key = 'greeting' (index)
    setCurrentMessage({...message, key: key});

    if (message.type == 'action') {
      if (onAction != null) {
        // key = 'greeting'
        const chats = messages;
        onAction(key, {sendMessage, nextMessage, chats});
      }
    } else {
      sendMessage(message.content, true, key);
    }

    // does not seem to be used for applying leave
    if (message.fieldType === 'dropdown') {
      const dropdownResult = onDropdownList(key, {sendMessage, nextMessage});

      if (dropdownResult instanceof Promise) {
        dropdownResult
          .then(dropdown => {
            setDropdownList(dropdown);
          })
          .finally(() => {});
      } else {
        setDropdownList(dropdownResult);
      }
    }
  };

  /**
   * Send Message
   * @param {*} text content text
   * @param {*} received true when nextMessage
   * @param {*} currentMessageType
   */
  const sendMessage = (text, received = false, currentMessageType) => {
    const message = {
      text: text,
      received: received,
      currentMessageType: currentMessageType,
    };
    setMessages(oldMessages => [...oldMessages, message]);

    if (onAfterMessage != null) {
      onAfterMessage({message, currentMessage});
    }
  };

  /**
   *  Send Image
   * adds 'image' property as true
   * @param {*} text
   * @param {*} received
   * @param {*} currentMessageType
   */
  const sendImage = (text, received = false, currentMessageType) => {
    const message = {
      text: text,
      received: received,
      image: true,
      currentMessageType: currentMessageType,
    };
    setMessages(oldMessages => [...oldMessages, message]);
    if (onAfterMessage != null) {
      onAfterMessage({message, currentMessage});
    }
  };

  /**
   * Loading Chat Bubble
   * @param {*} next
   */
  const loadChatBubbleOnpress = next => {
    setshowloadchatbubble(true);
    setTimeout(() => {
      nextMessage(next);
      setshowloadchatbubble(false);
    }, 900);
  };

  // Get location
  const getLocation = async () => {
    setisFocusedCliked(true);
    getLocationChatMap().then(res => {
      switch (res) {
        case null:
          navigate('Location');
          break;
        case 'Goback':
          deleteLocationChatMap();
          break;

        default:
          locationSelected(res);
          deleteLocationChatMap();
          setisFocusedCliked(false);
          break;
      }
    });
  };

  /**
   * @param {*} values
   * @param {*} handleReset
   * @param {*} currentMessageType
   */
  const send = (values, handleReset, currentMessageType) => {
    if (onValue != null) {
      const value = values.text;
      handleReset();
      switch (currentMessage.fieldType) {
        case 'text':
        case 'number':
        case 'phone':
        case 'time':
        case 'date':
          const result = onValue(currentMessage.key, value);
          if (value.trim().length > 0) {
            sendMessage(result, false, currentMessageType);
          }

          if (currentMessage.fieldType == 'date') {
            // datepicker.setState({
            //     chosenDate: null
            // })
          }

          break;
        case 'licenseDisk':
          scanLicenseDisk();
          break;
        case 'camera':
          pictureTaken();
          // navigate('Camera', {
          //     callback: pictureTaken
          // })
          break;
        case 'location':
          LocationService.requestPermissions()
            .then(() => {
              // navigate('Location', {
              //     callback: 'locationSelected'
              // })
              getLocation();
              // navigate('Location', {locationSelectedx:locationSelected })
            })
            .catch(err => {
              Alert.alert('Error', err.message, [
                {
                  text: 'Location Settings',
                  onPress: () => {
                    openSettings();
                    // OpenAppSettings.open();
                  },
                },
                {
                  text: 'Cancel',
                },
              ]);
            });

          break;
        case 'dropdown':
          const newValue = dropdownList[parseInt(value)];
          const result2 = onValue(currentMessage.key, newValue);
          sendMessage(result2, false);
          setDropdownList([]);
          break;
      }
      // handleReset()
    }
  };

  useEffect(() => {
    if (isFocusedCliked === true) {
      getLocation();
    }
  }, [isFocused]);

  useEffect(() => {
    if (onCurrentMessage != null) {
      onCurrentMessage(currentMessage);
    }

    if (currentMessage) {
      switch (currentMessage.type) {
        case 'message':
          if (currentMessage.next) {
            setshowloadchatbubble(true);
            setTimeout(() => {
              nextMessage(currentMessage.next);
            }, 1100);
          } else {
          }
          break;
      }
    }
  }, [currentMessage]);

  // triggers the next message and chatbubble loading animation whem 'messages' updates
  useEffect(() => {
    setTimeout(() => {
      setshowloadchatbubble(false);
    }, 1000);
    if (messages.length > 0) {
      if (
        messages[messages.length - 1].received == false &&
        currentMessage.next
      ) {
        nextMessage(currentMessage.next);
      }
    }

    setTimeout(() => {
      if (content && content._root) {
        content._root.scrollToEnd();
      }
    }, 300);
  }, [messages]);

  useEffect(() => {
    if (dropdownList && dropdownList.length > 0) {
      globalHandleChange('text')('0');
    }
  }, [dropdownList]);

  useEffect(() => {
    if (initialized === false) {
      setInit(true);
      if (prevForm != null && prevForm.currentMessage) {
        setMessages(prevForm.messages);
        setCurrentMessage(prevForm.currentMessage);
      } else {
        start();
      }
    } else {
    }
  }, []);

  /**
   *  Chat bot and User chat bubble
   * @param {object} profile signed in user profile
   * @param {string} chatBubbleColor
   * @param {boolean} received
   * @param {string} children text to show
   * @param {boolean} isImage indicates if reply is an image
   * @param {number} chatBubbleIndex indicates chat to edit
   * @returns
   */
  const ChatBubble = ({
    profile,
    chatBubbleColor,
    received, // true when the message is from the bot
    children,
    isImage,
    chatBubbleIndex,
  }) => {
    const radius = 20;
    return (
      <VStack
        space={2}
        alignSelf={received ? 'flex-start' : 'flex-end'}
        alignItems={'center'}
        style={{
          paddingBottom: 10,
          flexDirection: received ? 'column' : 'row-reverse',
        }}>
        <HStack
          bg={received ? 'blueGray.600' : 'green.800'}
          borderWidth={received ? 0 : 0}
          p={1}
          space={0}
          rounded={20}
          shadow={'1'}
          maxW={'96f%'}
          style={{
            // borderBottomLeftRadius: received ? 0 : radius,
            // borderBottomRightRadius: received ? radius : 0,
            flexDirection: received ? 'row' : 'row-reverse',
            // alignItems: received ? 'flex-start' : 'center',
          }}>
          {/* Thumbanils on chat bubbles */}
          {/* Switches between user and bot avatar */}
          {received ? (
            <Avatar
              size={'sm'}
              alt={'avatar'}
              source={require('../assets/bot-avatar.jpg')}
            />
          ) : (
            <Avatar
              size={'sm'}
              alt={''}
              source={
                profile.photoURL
                  ? {uri: profile.photoURL}
                  : {
                      uri: 'https://res.cloudinary.com/practicaldev/image/fetch/s--uFcwVGC1--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/27jpnicrgz7wztex78k4.jpg',
                    }
              }
            />
          )}

          {/* Text / media rendered on chatbubble for both user and chatbot*/}
          <HStack>
            {isImage ? (
              <Box w={150} h={200}>
                <Image
                  flex={1}
                  rounded={'2xl'}
                  resizeMode={'cover'}
                  source={{uri: children}}
                  alt={'image'}
                />
                {/* <Avatar source={{uri: children}} resizeMode="cover" /> */}
              </Box>
            ) : (
              <VStack justifyContent={'center'} p={2}>
                <Text
                  marginRight={received ? 6 : 0}
                  lineHeight={18}
                  // flex={1}
                  fontSize={14}
                  color={received ? 'white' : 'white'}>
                  {children}
                </Text>
              </VStack>
            )}
          </HStack>
        </HStack>

        {/* edit */}
        {!received ? (
          <Button
            mx={2}
            bg={'blueGray.700'}
            variant={'subtle'}
            onPress={() => {
              EditPrevChat(chatBubbleIndex);
            }}
            size={10}
            endIcon={
              <Icon name="pencil" size={20} color={'#DAE1D1'} />
            }></Button>
        ) : null}
      </VStack>
    );
  };

  const EditPrevChat = async i => {
    // dispatch(setBotType('Welcome'));
    let key = Math.floor(i / 2);
    let currentMessageKey = messages[i].currentMessageType;
    setMessages(messages.splice(0, i - 1));
    nextMessage(currentMessageKey);
    setTimeout(() => {}, 2000);
  };

  const getChatBubbleIndex = i => {
    Alert.alert(
      'Heads up',
      "If you edit your response, you'll lose the responses that followed it",
      [
        {
          text: 'Cancel',
          onPress: () => {},
        },
        {text: 'Okay', onPress: () => EditPrevChat(i)},
      ],
    );
  };

  return (
    <VStack
      flex={1}
      bg={'blueGray.700'}
      borderTopLeftRadius={30}
      borderTopRightRadius={30}>
      <ScrollView
        ref={ref => {
          scrollViewRef = ref;
        }}
        contentContainerStyle={{padding: 10}}
        onContentSizeChange={() => {
          if (scrollViewRef) {
            scrollViewRef.scrollToEnd({animated: true});
          }
        }}>
        <VStack flex={1} py={5} ref={c => (content = c)}>
          {/* Shows chats */}
          {/* can render inputs */}
          {messages?.map((message, index) => {
            return (
              <ChatBubble
                profile={profile}
                chatBubbleIndex={index}
                chatBubbleColor={chatBubbleColor}
                isImage={!!message.image}
                key={index}
                messageText={message.text}
                received={message.received}>
                {message.text}
              </ChatBubble>
            );
          })}

          {/* chatbot loading bubble */}

          {showloadchatbubble ? <LoadChatBubble /> : null}

          {/* message options */}
          {currentMessage && !showloadchatbubble && (
            <Button.Group
              direction="column"
              space={0}
              p={2}
              rounded={'3xl'}
              marginBottom={10}>
              {currentMessage?.type === 'options' &&
                currentMessage?.options?.map((option, index) => {
                  return (
                    <VStack key={index}>
                      <Button
                        variant={'ghost'}
                        onPress={() => {
                          const result = onValue(
                            currentMessage.key,
                            option.text,
                          );
                          sendMessage(result, false, currentMessage.key);
                          loadChatBubbleOnpress(option.next);
                          // setCurrentMessage(null);
                        }}
                        my={1}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 14,
                            textAlign: 'center',
                          }}>
                          {option.text}
                        </Text>
                      </Button>
                      <Divider bg={'blueGray.600'} />
                    </VStack>
                  );
                })}
            </Button.Group>
          )}
        </VStack>
      </ScrollView>
      {/* user reply section */}
      {!showloadchatbubble ? (
        <VStack p={2} mt={2} bg={'blueGray.700'} rounded={'3xl'}>
          <Formik
            enableReinitialize={true}
            onSubmit={(values, helpers) =>
              send(values, helpers.resetForm, currentMessage.key)
            }
            initialValues={{text: currentText}}>
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
            }) => {
              globalHandleChange = handleChange;
              return (
                <HStack>
                  {currentMessage &&
                  [
                    'text',
                    'date',
                    'dropdown',
                    'number',
                    'phone',
                    'time',
                    'camera',
                    'pin',
                  ].indexOf(currentMessage.fieldType) > -1 ? (
                    <VStack
                      rounded={'3xl'}
                      style={{
                        // backgroundColor: '#efefef',
                        flex: 1,
                        borderColor: 'transparent',
                        marginRight: 10,
                      }}>
                      {/* changes input type if currentMessage == true and its fieldType matches */}
                      {/* render determined by field type */}
                      {/* text */}
                      {currentMessage.fieldType === 'text' && (
                        <Input
                          flex={1}
                          borderColor={'blueGray.600'}
                          bg={'blueGray.600'}
                          color={'gray.100'}
                          fontSize={16}
                          value={values.text}
                          onBlur={handleBlur('text')}
                          onChangeText={handleChange('text')}
                          placeholder="Reply..."
                          placeholderTextColor="#c0c0c0"
                        />
                      )}

                      {/* phone */}
                      {currentMessage.fieldType === 'phone' && (
                        <Input
                          flex={1}
                          borderColor={'blueGray.600'}
                          bg={'blueGray.600'}
                          fontSize={16}
                          color={'gray.100'}
                          keyboardType="phone-pad"
                          value={values.text}
                          onBlur={handleBlur('text')}
                          onChangeText={handleChange('text')}
                          placeholder="Reply..."
                          placeholderTextColor="#c0c0c0"
                        />
                      )}

                      {/* number */}
                      {currentMessage.fieldType === 'number' && (
                        <Input
                          flex={1}
                          borderColor={'blueGray.600'}
                          bg={'blueGray.600'}
                          fontSize={16}
                          color={'gray.100'}
                          keyboardType="decimal-pad"
                          value={values.text}
                          onBlur={handleBlur('text')}
                          onChangeText={handleChange('text')}
                          placeholder="Reply..."
                          placeholderTextColor="#c0c0c0"
                        />
                      )}

                      {/* time */}
                      {currentMessage.fieldType === 'time' && (
                        <TimePicker
                          value={values.text}
                          onChangeTime={time => {
                            handleChange('text')(time);
                          }}
                        />
                      )}

                      {/* date */}
                      {currentMessage.fieldType === 'date' && (
                        <PickerDate
                          value={values.text}
                          onChangeTime={time => {
                            handleChange('text')(time);
                          }}
                        />
                      )}

                      {/* dropdown */}
                      {currentMessage.fieldType === 'dropdown' && (
                        <Picker
                          selectedValue={values.text}
                          onValueChange={value => {
                            setFieldValue('text', value);
                          }}>
                          {dropdownList &&
                            dropdownList.map((item, index) => {
                              return (
                                <Picker.Item
                                  key={index}
                                  label={item.name}
                                  value={`${index}`}
                                />
                              );
                            })}
                        </Picker>
                      )}
                    </VStack>
                  ) : (
                    <HStack flex={1}></HStack>
                  )}

                  {currentMessage && currentMessage.type === 'question' && (
                    <TouchableOpacity
                      onPress={() => {
                        handleSubmit();
                      }}>
                      <View
                        style={{
                          backgroundColor: ThemeColors.brandPrimary,
                          width: 50,
                          height: 50,
                          borderRadius: 20,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        {(currentMessage.fieldType === 'text' ||
                          currentMessage.fieldType === 'date' ||
                          currentMessage.fieldType === 'time' ||
                          currentMessage.fieldType === 'dropdown' ||
                          currentMessage.fieldType === 'number' ||
                          currentMessage.fieldType === 'phone') && (
                          <Icon name="send" size={20} color={'white'} />
                        )}
                        {currentMessage.fieldType === 'licenseDisk' && (
                          <Icon name="qr-scanner" size={20} color={'white'} />
                        )}
                        {currentMessage.fieldType === 'camera' && (
                          <Icon name="camera" size={20} color={'white'} />
                        )}
                        {currentMessage.fieldType === 'location' && (
                          <Icon name="pin-drop" size={20} color={'white'} />
                        )}
                      </View>
                    </TouchableOpacity>
                  )}
                </HStack>
              );
            }}
          </Formik>
        </VStack>
      ) : null}
    </VStack>
  );
};

export default ChatForm;
// export default ChatForm;
