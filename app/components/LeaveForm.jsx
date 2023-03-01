import React from 'react';
import {
  ScrollView,
  VStack,
  HStack,
  Input,
  Button,
  Box,
  Menu,
  Spinner,
  Pressable,
  Divider,
  HamburgerIcon,
  Popover,
} from 'native-base';
import UserBubble from './UserBubble';
import BotBubble from './BotBubble';
import * as BotQuestions from '../Bot/leave.json';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
const LeaveForm = ({upload, camera, message}) => {
  const [loading, setLoading] = React.useState(false);
  const [inputText, setInputText] = React.useState('');
  const [selectedImage, setSelectedImage] = React.useState({
    fileName: '',
    uri: 'https://i.pinimg.com/736x/a7/30/e0/a730e0dec7f98bc11e199d7b31f22f66.jpg',
  });
  const [botKey, setBotKey] = React.useState('greeting');
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const [chats, setChats] = React.useState([]);
  const [data, setData] = React.useState({
    question: '',
    reply: '',
  });
  const dispatch = useDispatch();
  const [currentReply, setCurrentReply] = React.useState('');
  const user = useSelector(state => state.account);
  let scrollViewRef = React.useRef();
  const handleContentSizeChange = () => {
    console.log(scrollViewRef);
    // scrollViewRef.current.scrollToEnd({animated: true});
  };
  const pushBotChat = () => {
    setChats(prev => [...prev, BotQuestions[botKey]]);
    setData({question: BotQuestions[botKey].content});
  };

  const pushUserChat = reply => {
    setChats(prev => [...prev, reply]);
  };
  const pickImage = async () => {
    // dispatch(showLoading('Please wait ....'));
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      presentationStyle: 'popover',
      storageOptions: {
        skipBackup: true,
      },
    };
    console.log('Image uploaded start!');
    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        // dispatch(hideLoading());
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        // dispatch(hideLoading());
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        // dispatch(hideLoading());
      } else {
        console.log(response);
        console.log(response.assets[0].uri);
        setSelectedImage({
          fileName: response.assets[0].fileName,
          uri: response.assets[0].uri,
        });

        // const result = onValue(currentMessage.key, response.assets[0].uri);
        // console.log(result);
        // sendImage(result, false, currentMessage.key);
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
  const UserSignIn = async () => {
    GoogleSignin.configure();
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    dispatch(
      signIn({
        user: userInfo.user.name,
        image: userInfo.user.photo,
        isSignedIn: true,
      }),
    );
    setTimeout(() => {}, 2000);
  };
  React.useEffect(() => {
    for (const key in BotQuestions) {
      if (BotQuestions[key].type === 'options') {
        // console.log('options');
      } else if (BotQuestions[key].type === 'question') {
        // console.log('question');
      } else {
        // console.log(BotQuestions[key]);
      }
    }

    // console.log(BotQuestions[botKey]);
    setChats([]);
    pushBotChat();
  }, []);

  return (
    <VStack flex={1}>
      <VStack flex={1}>
        <ScrollView
          onContentSizeChange={() => {
            handleContentSizeChange();
          }}
          ref={data => {
            scrollViewRef = data;
            console.log(scrollViewRef);
          }}
          flex={1}
          contentContainerStyle={{
            paddingVertical: 10,
            paddingBottom: 66,
            paddingHorizontal: 10,
          }}>
          {chats.map((item, i) => {
            console.log(item);
            const options = item.options || [];
            return (
              <BotBubble
                key={i}
                onPress={e => {
                  console.log(e);
                }}
                text={item.content}
                options={options}
              />
            );
          })}
          <UserBubble type={'text'} text={'I want to register for a leave'} />
          <UserBubble type={'text'} text={'I want to register for a leave'} />
          <UserBubble type={'text'} text={'I want to register for a leave'} />
          <UserBubble type={'text'} text={'I want to register for a leave'} />
          <UserBubble type={'image'} text={selectedImage.uri} />
          <UserBubble type={'map'} text={'I want to register for a leave'} />
        </ScrollView>
      </VStack>

      <HStack
        position={'absolute'}
        zIndex={10}
        bottom={0}
        left={0}
        right={0}
        space={2}
        p={2}
        borderTopLeftRadius={'3xl'}
        borderTopRightRadius={'3xl'}
        background={'white'}>
        <HStack flex={1} space={2}>
          {!user.isSignedIn && (
            <Button
              disabled={loading}
              variant={loading ? 'ghost' : 'solid'}
              onPress={() => {
                setLoading(true);
                UserSignIn();
                setTimeout(() => {
                  setLoading(false);
                }, 2000);
              }}
              flex={1}
              startIcon={
                loading ? (
                  <Spinner size={17} />
                ) : (
                  <Icon name="google" size={15} color={'white'} />
                )
              }>
              {loading ? null : 'Sign In'}
            </Button>
          )}
          {user.isSignedIn && (
            <HStack space={2} flex={1}>
              <HStack bg={'gray.200'} space={1} rounded={'full'} flex={1}>
                <Input
                  onChangeText={e => {
                    setInputText(e);
                  }}
                  value={inputText}
                  borderWidth={0}
                  bg={'transparent'}
                  variant={'filled'}
                  color={'black'}
                  flex={1}
                  fontSize={16}
                  placeholder="Please reply here"
                />
                <Button
                  onPress={() => {
                    pickImage();
                  }}
                  size={51}
                  variant={'ghost'}
                  endIcon={<Icon name={'image'} size={16} color={'black'} />}
                />
                {inputText.length > 2 ? null : (
                  <Button
                    size={51}
                    variant={'ghost'}
                    endIcon={
                      <Icon name={'camera'} size={16} color={'black'} />
                    }></Button>
                )}
              </HStack>

              <Button
                onPress={() => {
                  setChats(prev => [...prev, inputText]);
                  setInputText('');
                  // console.log(scrollViewRef);
                }}
                size={51}
                endIcon={<Icon name={'send'} size={16} color={'white'} />}
              />
            </HStack>
          )}
        </HStack>
      </HStack>
    </VStack>
  );
};

export default LeaveForm;
