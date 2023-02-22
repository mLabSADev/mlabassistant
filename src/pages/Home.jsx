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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BotBubble from '../components/BotBubble';
import UserBubble from '../components/UserBubble';
import {signInWithGoogle} from '../services/firebase';
import * as BotQuestions from '../Bot/leave.json';
const Home = () => {
  const [inputText, setInputText] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [chats, setChats] = React.useState([]);

  React.useEffect(() => {
    console.log(BotQuestions);
  }, []);
  return (
    <VStack style={{flex: 1}}>
      <HStack p={5} alignItems={'center'}>
        <Heading flex={1} color={'black'}>
          mLab Assistant
        </Heading>
        <Text color={'amber.600'}>Signed out</Text>
      </HStack>
      <VStack
        background={'gray.200'}
        flex={1}
        borderTopLeftRadius={'3xl'}
        borderTopRightRadius={'3xl'}>
        <ScrollView flex={1} contentContainerStyle={{alignItems: 'flex-end'}}>
          <VStack p={5} space={10} width={'100%'}>
            <BotBubble />
            {chats.map((text, i) => {
              return <UserBubble key={i} text={text} />;
            })}
          </VStack>
        </ScrollView>

        <HStack
          space={2}
          p={5}
          borderTopLeftRadius={'3xl'}
          borderTopRightRadius={'3xl'}
          background={'white'}>
          <HStack flex={1} space={2}>
            <Button
              disabled={loading}
              variant={loading ? 'ghost' : 'solid'}
              onPress={() => {
                setLoading(true);
                // signInWithGoogle();
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
            {/* <Input
              onChange={e => {
                console.log(e.value);
              }}
              borderWidth={0}
              bg={'gray.200'}
              variant={'filled'}
              color={'black'}
              flex={1}
              placeholder="Please reply here"></Input>
            <Button
              onPress={() => {
                setChats(prev => [...prev, 'chat']);
              }}
              size={51}
              endIcon={<PlayIcon />}
            /> */}
          </HStack>
        </HStack>
      </VStack>
    </VStack>
  );
};
export default Home;
