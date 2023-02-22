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
} from 'native-base';
const BotBubble = () => {
  return (
    <VStack space={2}>
      <HStack space={2} alignItems={'center'}>
        <Box bg={'blueGray.500'} rounded={'3xl'} py={2} px={4} maxWidth={'80%'}>
          <Text color={'white'}>
            mLab is a tech-centred business that prepares innovators and
            entrepreneurs for opportunities within the digital economy. mLab is
            registered as a Not-for-Profit Company (NPC) with public benefit
            organisation (PBO) status and is a Level 1 B-BBEE service provider.
          </Text>
        </Box>
        <Text color={'blueGray.400'}>15:47</Text>
      </HStack>
      <HStack px={4} space={1}>
        <Button variant={'outline'} size={'sm'}>
          Option 1
        </Button>
        <Button size={'sm'}>Option 1</Button>
        <Button size={'sm'}>Option 1</Button>
      </HStack>
    </VStack>
  );
};

export default BotBubble;
