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
  Menu,
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
    // scrollViewRef.current.scrollToEnd({animated: true});
  };
  React.useEffect(() => {
    checkAuth();
    // scrollViewRef.current.scrollToEnd({animated: true});
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
        <VStack flex={1} p={0} space={10} width={'100%'}>
          <LeaveForm />
        </VStack>
      </VStack>
    </VStack>
  );
};
export default Home;
