import React from 'react';
import moment from 'moment';
import {
  Box,
  Text,
  HStack,
  VStack,
  ScrollView,
  Heading,
  Input,
  Button,
  Avatar,
} from 'native-base';
const UserBubble = ({text = 'Hello world'}) => {
  return (
    <VStack space={2}>
      <HStack space={2} alignItems={'center'} justifyContent={'flex-end'}>
        <Text color={'blueGray.400'}>{moment().format('h:mm a')}</Text>
        <Box bg={'blueGray.700'} rounded={'3xl'} py={2} px={4} maxWidth={'80%'}>
          <Text color={'white'}>{text}</Text>
        </Box>
        <Avatar size={'sm'} source={require('../assets/avatar.jpg')} />
      </HStack>
      <HStack justifyContent={'flex-end'}>
        {/* <Box rounded={'3xl'} w={'80%'} h={200} bg={'gray.100'}></Box> */}
      </HStack>
    </VStack>
  );
};

export default UserBubble;
