import React from 'react';
import {
  Box,
  Text,
  HStack,
  VStack,
  ScrollView,
  Heading,
  Input,
  Button,
  Spinner,
  PlayIcon,
} from 'native-base';
// import {ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BotBubble from '../components/BotBubble';
import UserBubble from '../components/UserBubble';
import {signInWithGoogle} from '../services/firebase';
import {useSelector, useDispatch} from 'react-redux';
import {signIn} from '../redux/userAccountSlice';
import * as BotQuestions from '../Bot/leave.json';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import LeaveForm from '../components/LeaveForm';
const Home = () => {
  const [inputText, setInputText] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [chats, setChats] = React.useState([]);

  const user = useSelector(state => state.account);
  const dispatch = useDispatch();
  let scrollViewRef = React.useRef();
  const checkAuth = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      const userInfo = await GoogleSignin.getCurrentUser();
      dispatch(
        signIn({
          user: userInfo.user.name,
          image: userInfo.user.photo,
          isSignedIn: true,
        }),
      );
    }
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
  const handleContentSizeChange = () => {
    scrollViewRef.current.scrollToEnd({animated: true});
  };
  React.useEffect(() => {
    checkAuth();
    scrollViewRef.current.scrollToEnd({animated: true});
  }, []);
  return (
    <VStack style={{flex: 1}}>
      <HStack p={5} alignItems={'center'}>
        <Heading flex={1} color={'black'}>
          {user.user}
        </Heading>

        {user.isSignedIn ? (
          <Text color={'green.400'}>Signed in</Text>
        ) : (
          <Text color={'amber.600'}>Signed out </Text>
        )}
      </HStack>
      <VStack
        background={'gray.200'}
        flex={1}
        borderTopLeftRadius={'3xl'}
        borderTopRightRadius={'3xl'}>
        <ScrollView
          onContentSizeChange={handleContentSizeChange}
          ref={scrollViewRef}
          flex={1}
          contentContainerStyle={{alignItems: 'flex-end'}}>
          <VStack p={5} space={10} width={'100%'}>
            <LeaveForm />
          </VStack>
        </ScrollView>

        <HStack
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
                    size={51}
                    variant={'ghost'}
                    endIcon={
                      <Icon name={'attachment'} size={16} color={'black'} />
                    }></Button>
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
                    console.log(scrollViewRef);
                  }}
                  size={51}
                  endIcon={<Icon name={'send'} size={16} color={'white'} />}
                />
              </HStack>
            )}
          </HStack>
        </HStack>
      </VStack>
    </VStack>
  );
};
export default Home;
