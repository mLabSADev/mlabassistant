import React, {useState, useEffect} from 'react';
import {
  Content,
  View,
  Container,
  Text,
  Input,
  Item,
  Icon,
  Picker,
  Thumbnail,
} from 'native-base';
import {Formik} from 'formik';
import {
  TouchableOpacity,
  PermissionsAndroid,
  Image,
  ImageBackground,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';

import moment from 'moment';

import {LocationService, GOOGLE_MAP_KEY} from '../services/location-service';
// import OpenAppSettings from 'react-native-app-settings';
import {
  openSettings,
  check,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {connect, useDispatch} from 'react-redux';
import {ThemeColors} from '../theme/colors';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import storage from '@react-native-firebase/storage';
import {useIsFocused} from '@react-navigation/native';
import {
  getLocationChatMap,
  deleteLocationChatMap,
} from '../services/localStorage';
import {showLoading, hideLoading} from '../redux/app';

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
          <Text>{time}</Text>
        ) : (
          <Text style={{color: '#a0a0a0'}}>Select Time</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
export const PickerDate = ({value, onChangeTime}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(value && value.length == 5 ? value : '');

  const dateConfirmed = date => {
    const selectedTime = moment(date).format('DD/MM/YYYY');
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
        onPress={() => {
          setShowDatePicker(true);
        }}>
        {time ? (
          <Text>{time}</Text>
        ) : (
          <Text style={{color: '#a0a0a0'}}>Select Date</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
export const LoadChatBubble = ({}) => {
  return (
    <View style={{marginLeft: 18}}>
      <ImageBackground
        style={{
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          width: 130,
          overflow: 'hidden',
          paddingTop: 10,
        }}
        source={require('../assets/chatbubble.png')}
        imageStyle={{
          resizeMode: 'contain',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{
            resizeMode: 'contain',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}
          source={require('../assets/loader3dot.gif')}
        />
      </ImageBackground>
      <Text style={{margin: 0, padding: 0, color: 'grey', marginLeft: 16}}>
        Typing....
      </Text>
    </View>
  );
};

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
  const inputStyle = {paddingLeft: 20, paddingRight: 20, color: 'black'};

  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  // const schema = Yup.object().shape({
  //   text: Yup.string().trim().required(),
  // });

  const locationSelected = location => {
    console.log(location);
    const link =
      `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=17&size=600x300&maptype=roadmap` +
      `&markers=color:red%7Clabel:L%7C${location.lat},${location.lng}` +
      `&key=${GOOGLE_MAP_KEY}`;

    const result = onValue(currentMessage.key, {
      location: location,
      link: link,
    });
    // console.log('locationSelected', result);
    // console.log(result.link);
    // console.log(result.location);
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
    console.log('Image uploaded start!');
    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        dispatch(hideLoading());
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        dispatch(hideLoading());
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        dispatch(hideLoading());
      } else {
        console.log(response);
        console.log(response.uri);
        const result = onValue(currentMessage.key, response.assets[0].uri);
        sendImage(result, false, currentMessage.key);
        // await storage()
        //   .ref(`businessLogo/${profile.uid}/`)
        //   .putFile(response.uri)
        //   .then(async () => {
        //     console.log('Image uploaded to the bucket!');
        //     await storage()
        //       .ref(`businessLogo/${profile.uid}/`)
        //       .getDownloadURL()
        //       .then((res) => {
        //         console.log(res);
        //         const result = onValue(currentMessage.key, res);
        //         sendImage(result, false, currentMessage.key);
        //         dispatch(hideLoading());
        //       });
        //   });
        // dispatch(hideLoading());
      }
    });

    // dispatch(hideLoading())
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
  // var messageKeyArray = []
  const nextMessage = key => {
    const message = form[key];
    messagesKey.push(key);
    setMessagesKey(messagesKey);
    // console.log('*** nextMessage Key -', key);
    //console.log(`*** nextMessage message - `,message);
    if (message == null) {
      return;
    }

    setCurrentMessage({
      ...message,
      key: key,
    });

    if (message.type == 'action') {
      if (onAction != null) {
        onAction(key, {sendMessage, nextMessage});
      }
    } else {
      sendMessage(message.content, true);
    }

    if (message.fieldType === 'dropdown') {
      const dropdownResult = onDropdownList(key, {sendMessage, nextMessage});

      if (dropdownResult instanceof Promise) {
        // App.showLoading('Loading list')
        dropdownResult
          .then(dropdown => {
            setDropdownList(dropdown);
          })
          .finally(() => {
            // App.stopLoading()
          });
      } else {
        setDropdownList(dropdownResult);
      }
    }
  };

  const sendMessage = (text, received = false, currentMessageType) => {
    setMessages(oldMessages => {
      const message = {
        text: text,
        received: received,
        currentMessageType: currentMessageType,
      };
      const newMessages = oldMessages.concat([message]);

      if (onAfterMessage != null) {
        onAfterMessage({message, currentMessage});
      }

      return newMessages;
    });
  };

  const sendImage = (text, received = false, currentMessageType) => {
    setMessages(oldMessages => {
      const message = {
        text: text,
        received: received,
        image: true,
        currentMessageType: currentMessageType,
      };
      if (onAfterMessage != null) {
        onAfterMessage({message, currentMessage});
      }

      return oldMessages.concat([message]);
    });
  };
  const loadChatBubbleOnpress = next => {
    setshowloadchatbubble(true);
    setTimeout(() => {
      setshowloadchatbubble(false);
      nextMessage(next);
    }, 1000);
  };
  //const callback = useCallback()
  const getLocation = async () => {
    setisFocusedCliked(true);
    getLocationChatMap().then(res => {
      switch (res) {
        case null:
          console.log('getLocationChatMap in null null');
          console.log('in if getLocation', res);
          navigate('Location');
          break;
        case 'Goback':
          console.log('getLocationChatMap in undefined undefined');
          console.log(isFocusedCliked);
          console.log(isFocusedCliked);
          deleteLocationChatMap();
          break;

        default:
          console.log('getLocationChatMap in Object lat lng ');
          console.log('in else getLocation', res);
          locationSelected(res);
          deleteLocationChatMap();
          setisFocusedCliked(false);
          break;
      }
    });
  };

  useEffect(() => {
    if (isFocusedCliked === true) {
      getLocation();
      console.log(
        '<--------- isFocused isFocused isFocused isFocused isFocused ---------->',
      );
    }
  }, [isFocused]);

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
    // console.log('useEffect currentMessage');
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
            // console.log('nooo nextMessage');
          }
          break;
      }
    }
  }, [currentMessage]);

  useEffect(() => {
    // console.log(`<----- useEffect ${messagesEdit} ---->`);

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

    // if (currentMessage != null) {
    //     switch (currentMessage.type) {
    //         case 'message':
    //             if (currentMessage.next) {
    //                 nextMessage(currentMessage.next)
    //             }
    //             break
    //     }
    // }
  }, [messages]);

  useEffect(() => {
    if (dropdownList && dropdownList.length > 0) {
      globalHandleChange('text')('0');
    }
  }, [dropdownList]);

  useEffect(() => {
    if (initialized === false) {
      setInit(true);

      console.log('prevForm', prevForm);
      if (prevForm != null && prevForm.currentMessage) {
        setMessages(prevForm.messages);
        setCurrentMessage(prevForm.currentMessage);

        // console.log('prevForm.currentMessage');
      } else {
        start();
      }
    } else {
    }
  }, []);

  const ChatBubble = ({
    profile,
    chatBubbleColor,
    received,
    children,
    isImage,
    chatBubbleIndex,
  }) => {
    const radius = 20;

    return (
      // console.log(Dimensions.get("window").height),
      // console.log(JSON.stringify(messages, null, "\t")),
      <View
        style={{
          paddingBottom: 10,
          alignItems: received ? 'flex-start' : 'flex-end',
          marginLeft: 20,
          marginRight: 20,
          marginTop: 5,
          flexDirection: received ? 'column' : 'row-reverse',
        }}>
        <View
          style={{
            backgroundColor: received
              ? ThemeColors.brandSecondary
              : ThemeColors.brandPrimary,
            borderWidth: received ? 0 : 1,
            borderColor: chatBubbleColor,
            padding: 10,
            borderRadius: radius,
            borderBottomLeftRadius: received ? 0 : radius,
            borderBottomRightRadius: received ? radius : 0,
            maxWidth: 250,
            shadowColor: '#000',
            shadowOffset: {
              width: 2,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            flexDirection: received ? 'row' : 'row-reverse',
            alignItems: received ? 'flex-start' : 'center',
            // marginRight: received ? 60 : 0,
            // marginLeft: received ? 0 : 60
          }}>
          {received ? (
            <Thumbnail
              style={{width: 0, height: 0, marginRight: 0}}
              // source={require('../assets/bot-avatar.jpg')}
            />
          ) : (
            <Thumbnail
              style={{width: 40, height: 40, marginLeft: 10}}
              source={
                profile.profilePicture
                  ? {uri: profile.profilePicture}
                  : require('../assets/profilepic.png')
              }
            />
          )}
          <View style={{overflow: 'hidden'}}>
            {/* {isImage ? <Image source={{ uri: children }} resizeMode='cover' style={{ width: 200, height: 200 }} />
                            : <HTML containerStyle={{flex: 1}} onLinkPress={(event, href) => {
                                Linking.openURL(href);
                            }} html={
                                `<div style="color: ${received ? 'black' : 'white'}">${children}</div>`
                            } imagesMaxWidth={230} />} */}
            {isImage ? (
              <Image
                source={{uri: children}}
                resizeMode="cover"
                style={{borderRadius: 20, width: 180, height: 180}}
              />
            ) : null}
            {isImage ? null : (
              <View style={{minHeight: 40, justifyContent: 'center'}}>
                <Text
                  style={{
                    fontSize: 14,
                    maxWidth: 180,
                    color: received ? 'white' : 'white',
                  }}>
                  {children}
                </Text>
              </View>
            )}
          </View>
        </View>
        {!received ? (
          // <TouchableOpacity onPress={() => { getChatBubbleIndex(chatBubbleIndex) }} style={{ alignSelf: 'center', alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              EditPrevChat(chatBubbleIndex);
            }}
            style={{alignSelf: 'center', alignItems: 'center'}}>
            <View
              style={{
                borderRadius: 100,
                borderWidth: 2,
                borderColor: 'black',
                margin: 10,
                padding: 3,
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <Icon
                type="MaterialIcons"
                name="edit"
                style={{color: 'black', fontSize: 20}}
              />
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };
  const EditPrevChat = async i => {
    console.log(`getChatBubbleIndex ${i}`, i);
    console.log('if EditPrevChat ', messages.length);
    console.log('if EditChat messages', messages[i].currentMessageType);
    //console.log(`getChatBubbleIndex ${i-2}`,i-2);
    let key = Math.floor(i / 2);
    //console.log(`getChatBubbleIndex key`,key);
    let currentMessageKey = messages[i].currentMessageType;
    console.log(currentMessageKey);
    setMessages(messages.splice(0, i - 1));
    nextMessage(currentMessageKey);
    setTimeout(() => {
      console.log(JSON.stringify(messages, null, '\t'));
    }, 2000);
  };

  const getChatBubbleIndex = i => {
    Alert.alert(
      'Heads up',
      "If you edit your response, you'll lose the responses that followed it",
      [
        {
          text: 'Cancel',
          onPress: () => console.log('close alert'),
        },
        {text: 'Okay', onPress: () => EditPrevChat(i)},
      ],
    );
  };

  return (
    // console.log(`messages`,messages),
    <Container
      style={{
        backgroundColor: ThemeColors.brandLight,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
      }}>
      <Content style={{flex: 1, padding: 10}} ref={c => (content = c)}>
        {messages.map((message, index) => {
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
        {showloadchatbubble ? <LoadChatBubble /> : null}
        {currentMessage && (
          <View
            style={{
              paddingBottom: 20,
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              flexDirection: 'row',
            }}>
            {currentMessage.type === 'options' &&
              currentMessage.options.map((option, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      const result = onValue(currentMessage.key, option.text);
                      sendMessage(result, false, currentMessage.key);
                      loadChatBubbleOnpress(option.next);
                      // nextMessage(option.next)
                    }}
                    key={index}
                    style={{marginRight: 5, marginBottom: 5}}>
                    {!showloadchatbubble ? (
                      <View
                        style={{
                          backgroundColor: ThemeColors.brandSuccess,
                          borderRadius: 20,
                          padding: 5,
                          paddingLeft: 15,
                          paddingRight: 15,
                          minWidth: 60,
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 14,
                            textAlign: 'center',
                          }}>
                          {option.text}
                        </Text>
                      </View>
                    ) : null}
                  </TouchableOpacity>
                );
              })}
          </View>
        )}
      </Content>
      {!showloadchatbubble ? (
        <KeyboardAvoidingView behavior={'height'}>
          <View
            style={{
              height: 80,
              padding: 10,
              margin: 10,
              backgroundColor: 'white',
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
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
                  <View style={{flexDirection: 'row'}}>
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
                      <Item
                        rounded
                        style={{
                          backgroundColor: '#efefef',
                          flex: 1,
                          borderColor: 'transparent',
                          marginRight: 10,
                        }}>
                        {currentMessage.fieldType === 'text' && (
                          <Input
                            value={values.text}
                            onBlur={handleBlur('text')}
                            onChangeText={handleChange('text')}
                            style={inputStyle}
                            placeholder="Input Text"
                            placeholderTextColor="#c0c0c0"
                          />
                        )}
                        {currentMessage.fieldType === 'phone' && (
                          <Input
                            keyboardType="phone-pad"
                            value={values.text}
                            onBlur={handleBlur('text')}
                            onChangeText={handleChange('text')}
                            style={inputStyle}
                            placeholder="Input Text"
                            placeholderTextColor="#c0c0c0"
                          />
                        )}
                        {currentMessage.fieldType === 'number' && (
                          <Input
                            keyboardType="decimal-pad"
                            value={values.text}
                            onBlur={handleBlur('text')}
                            onChangeText={handleChange('text')}
                            style={inputStyle}
                            placeholder="Input Text"
                            placeholderTextColor="#c0c0c0"
                          />
                        )}
                        {currentMessage.fieldType === 'time' && (
                          <TimePicker
                            value={values.text}
                            onChangeTime={time => {
                              handleChange('text')(time);
                            }}
                          />
                        )}
                        {currentMessage.fieldType === 'date' && (
                          <PickerDate
                            value={values.text}
                            onChangeTime={time => {
                              handleChange('text')(time);
                            }}
                          />
                        )}

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
                      </Item>
                    ) : (
                      <View style={{flex: 1}} />
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
                            <Icon
                              type="MaterialIcons"
                              name="send"
                              style={{color: 'white', fontSize: 20}}
                            />
                          )}
                          {currentMessage.fieldType === 'licenseDisk' && (
                            <Icon
                              type="MaterialIcons"
                              name="qr-scanner"
                              style={{color: 'white', fontSize: 20}}
                            />
                          )}
                          {currentMessage.fieldType === 'camera' && (
                            <Icon
                              type="MaterialIcons"
                              name="camera"
                              style={{color: 'white', fontSize: 20}}
                            />
                          )}
                          {currentMessage.fieldType === 'location' && (
                            <Icon
                              type="MaterialIcons"
                              name="pin-drop"
                              style={{color: 'white', fontSize: 20}}
                            />
                          )}
                        </View>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              }}
            </Formik>
          </View>
        </KeyboardAvoidingView>
      ) : null}
    </Container>
  );
};

const stateToProps = state => {
  return {
    profile: state.user.profile,
  };
};

export default connect(stateToProps)(ChatForm);
