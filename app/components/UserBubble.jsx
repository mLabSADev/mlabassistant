import React from 'react';
import moment from 'moment';
import {
  Box,
  Text,
  HStack,
  VStack,
  ScrollView,
  Heading,
  Image,
  Input,
  Button,
  Avatar,
} from 'native-base';
import MapView from 'react-native-maps';
const InputRender = ({type = 'text', text}) => {
  switch (type) {
    case 'text': // disabled field
      return (
        <VStack space={2}>
          <HStack
            overflow={'visible'}
            space={2}
            alignItems={'center'}
            justifyContent={'flex-end'}>
            <Text color={'blueGray.400'}>{moment().format('h:mm a')}</Text>
            <Box
              shadow={'8'}
              bg={'blueGray.700'}
              rounded={'3xl'}
              py={2}
              px={4}
              maxWidth={'80%'}>
              <Text color={'white'} fontSize={'md'}>
                {text}
              </Text>
            </Box>
            <Avatar
              shadow={'8'}
              size={'sm'}
              source={require('../assets/avatar.jpg')}
            />
          </HStack>
          <HStack justifyContent={'flex-end'}>
            {/* <Box rounded={'3xl'} w={'80%'} h={200} bg={'gray.100'}></Box> */}
          </HStack>
        </VStack>
      );
      return;
      break;
    case 'image': // image render
      return (
        <VStack space={2}>
          <HStack
            overflow={'visible'}
            space={2}
            alignItems={'center'}
            justifyContent={'flex-end'}>
            <Text color={'blueGray.400'}>{moment().format('h:mm a')}</Text>
            <Image
              source={{
                uri: text,
              }}
              rounded={'3xl'}
              alt="Alternate Text"
              size="xl"
            />
            <Avatar
              shadow={'8'}
              size={'sm'}
              source={require('../assets/avatar.jpg')}
            />
          </HStack>
          <HStack justifyContent={'flex-end'}>
            {/* <Box rounded={'3xl'} w={'80%'} h={200} bg={'gray.100'}></Box> */}
          </HStack>
        </VStack>
      );
      break;
    case 'map': // Google API Key for this function is missing
      return (
        <VStack space={2}>
          <HStack
            overflow={'visible'}
            space={2}
            alignItems={'center'}
            justifyContent={'flex-end'}>
            <Text color={'blueGray.400'}>{moment().format('h:mm a')}</Text>
            <Box shadow={'1'} rounded={'3xl'} overflow={'hidden'}>
              <MapView
                // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={{width: 130, height: 130}}
                region={{
                  latitude: -26.2041,
                  longitude: 28.0473,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}></MapView>
            </Box>

            <Avatar
              shadow={'8'}
              size={'sm'}
              source={require('../assets/avatar.jpg')}
            />
          </HStack>
          <HStack justifyContent={'flex-end'}>
            {/* <Box rounded={'3xl'} w={'80%'} h={200} bg={'gray.100'}></Box> */}
          </HStack>
        </VStack>
      );
      break;
    default:
      break;
  }
};
const UserBubble = ({text, type}) => {
  return <InputRender type={type} text={text} />;
};

export default UserBubble;
