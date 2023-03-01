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
  PresenceTransition,
} from 'native-base';
import moment from 'moment';
const BotBubble = ({text, options = [], onPress}) => {
  const timline = moment().format('h:mm a');
  return (
    <PresenceTransition
      visible
      initial={{
        translateY: 20,
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        translateY: 0,
        transition: {
          delay: 250,
        },
      }}>
      <VStack my={5} space={2}>
        <HStack space={2} alignItems={'center'}>
          <Box
            shadow={'8'}
            m={2}
            bg={'blueGray.500'}
            rounded={'3xl'}
            py={2}
            px={4}
            maxWidth={'80%'}>
            <Text color={'white'} fontSize={'md'}>
              {text}
            </Text>
          </Box>
          <Text color={'blueGray.400'}>{timline}</Text>
        </HStack>
        <VStack px={4} space={1}>
          {options.map((item, i) => {
            let active = '';
            return (
              <PresenceTransition
                key={i}
                visible
                initial={{
                  translateY: 20,
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                  translateY: 0,
                  transition: {
                    delay: 110 * i,
                  },
                }}>
                <Button
                  bg={active === item.text ? 'green.900' : 'green.600'}
                  onPress={() => onPress(item)}
                  size={'sm'}>
                  <Text>{item.text}</Text>
                </Button>
              </PresenceTransition>
            );
          })}
        </VStack>
      </VStack>
    </PresenceTransition>
  );
};

export default BotBubble;
