import React, {useState} from 'react';
import {connect} from 'react-redux';
import {
  Button,
  Text,
  VStack,
  Heading,
  Input,
  HStack,
  Divider,
  Box,
  Center,
  ScrollView,
} from 'native-base';
import {login} from '../redux/user';
import {StyleSheet, TextInput, ImageBackground} from 'react-native';
import {ThemeColors} from '../theme/colors';
import {useDispatch} from 'react-redux';
import {googleSignIn} from '../redux/user-async-action';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const LoginPage = ({navigation}) => {
  const dispatch = useDispatch();
  const {navigate} = navigation;
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);

  const onGoToSignUp = () => {
    // navigate('SignUp');
  };

  const onLogin = () => {
    // navigate('Home');
    // navigation.navigate('Claims');
  };
  const onChangeEmail = val => {
    console.log(val);
    setEmail(val);
  };
  const onChangePassword = val => {
    console.log(val);
    setPassword(val);
  };
  const googleLogin = () => {
    // setModalVisible(!modalVisible);
    // dispatch(showLoading('Logging in...'));
    dispatch(googleSignIn()).then(data => {
      console.log('sign up navigation fix', data.payload.error);
      //onLogin();
    });
  };

  return (
    <VStack flex={1}>
      <ImageBackground
        style={styles.imagebackground}
        source={require('../assets/imagebg.png')}
      />
      <VStack p={2} flex={1} position={'relative'} zIndex={5}>
        <VStack flex={1} justifyContent={'center'} alignItems={'center'}>
          <Heading fontSize={'4xl'} color={'white'}>
            mLab
          </Heading>
          <Text fontSize={'md'} color={'white'} F>
            Assistant
          </Text>
        </VStack>
        <VStack space={5} p={5} background={'white'} rounded={'3xl'}>
          <VStack
            shadow={'9'}
            w={130}
            h={130}
            rounded={3}
            top={'-30%'}
            right={0}
            position={'absolute'}
            style={{transform: [{rotate: '-45deg'}]}}
            bg={'yellow.300'}>
            <Box w={'100%'} h={5} bg={'yellow.400'}></Box>
            <Center flex={1}>
              <Text>Out of office</Text>
            </Center>
          </VStack>
          <ScrollView>
            <VStack p={5}>
              <Heading textAlign={'center'}>Sign In</Heading>
              <Text textAlign={'center'}>Please log in to continue</Text>
            </VStack>
            <VStack space={2}>
              <Input
                inputMode="email"
                keyboardType="email-address"
                fontSize={16}
                value={email}
                onChangeText={onChangeEmail}
                // secureTextEntry={true}
                autoCapitalize={'none'}
                rounded={'full'}
                placeholder={'Email'}
              />
              <VStack position={'relative'}>
                <Box right={0} zIndex={3} position={'absolute'}>
                  <Button
                    variant={'ghost'}
                    rounded={'full'}
                    w={46}
                    h={46}
                    endIcon={
                      <Icon name="eye" size={20} color={'gray'} />
                    }></Button>
                </Box>
                <Input
                  fontSize={16}
                  value={password}
                  onChangeText={onChangePassword}
                  secureTextEntry={true}
                  rounded={'full'}
                  placeholder={'Password'}
                />
              </VStack>
              <HStack px={5} justifyContent={'flex-end'}>
                <Button variant={'ghost'} rounded={'full'}>
                  Forgot Password
                </Button>
              </HStack>
              <Button bg={'blueGray.700'} rounded={'full'}>
                <Text color={'white'} fontSize={16}>
                  Sign In
                </Text>
              </Button>
              <HStack my={5} space={3} alignItems={'center'}>
                <Divider flex={1} />
                <Text>or continue with</Text>
                <Divider flex={1} />
              </HStack>
              <HStack justifyContent={'center'}>
                <Button
                  // variant={'ghost'}
                  onPress={() => {
                    googleLogin();
                  }}
                  rounded={'full'}
                  bg={'red.600'}
                  w={46}
                  h={46}
                  endIcon={
                    <Icon name="google" size={20} color={'white'} />
                  }></Button>
              </HStack>
            </VStack>
          </ScrollView>
        </VStack>
      </VStack>
    </VStack>
  );
};

const styles = StyleSheet.create({
  imagebackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 0,
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
});

const dispatchToState = dispatch => {
  return {
    login: () => dispatch(login()),
  };
};

export default connect(null, dispatchToState)(LoginPage);
