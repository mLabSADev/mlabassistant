import React, {useState} from 'react';
import {
  Box,
  View,
  Text,
  Thumbnail,
  VStack,
  Button,
  HStack,
  Heading,
} from 'native-base';
import {
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import * as form from '../assets/leave.json';
import {ThemeColors} from '../theme/colors';
import ChatForm from '../components/chat-form';
import {connect, useDispatch} from 'react-redux';
import {ChatBotName} from '../assets/app-consts';
import {LocationService} from '../services/location-service';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const LeavePage = ({navigation, profile, updateCV, route}) => {
  const dispatch = useDispatch();
  const {goBack} = navigation;
  const onGoBack = () => {
    goBack();
    goBack();
  };
  var data = {};
  const [formValues, setFormValues] = useState({});
  const update = async () => {
    data = {
      typeOfClaim: formValues['claims'],
      personalPayment: formValues['personalPayment'],
      howmuch: formValues['howmuch'],
      takePicture: formValues['takePicture'],
      upload: formValues['upload'],
      travel: formValues['travel'],
      modeOfTransportOptional: formValues['modeOfTransportOptional'],
      uberBolt: formValues['uberBolt'],
      startAddress: formValues['ownVehicle'].location,
      destination: formValues['destination'].location,
      dateOfTravel: formValues['dateOfTravel'],
      nightSpentOptional: formValues['nightSpentOptional'],
      nightSpentYes: formValues['nightSpentYes'],
      //nightSpentYes: formValues['nightSpentYes'].location,
      complete: true,
    };
    // console.log(data);
    return data;
    // updateCV('BusinessProfile', data);
  };

  return (
    <VStack flex={1}>
      <VStack flex={1}>
        <Box flex={1} p={3}>
          <HStack
            bg={'white'}
            p={3}
            px={5}
            paddingRight={5}
            rounded={'3xl'}
            alignItems={'center'}
            space={4}>
            <Heading fontSize={24} flex={1} fontWeight={'bold'} color={'black'}>
              {ChatBotName.name}
            </Heading>
            <Text color={'black'}>Applying for leave</Text>
          </HStack>

          <ChatForm
            navigation={navigation}
            route={route}
            chatBubbleColor={'#073F4E'}
            form={form}
            onAction={(key, {sendMessage, nextMessage}) => {
              console.log('asdfghjk');
              console.log({key, sendMessage, nextMessage});
              switch (key) {
                case 'greeting':
                  sendMessage(
                    `Hello ${profile.fullNames}, my name is ${ChatBotName.name} and I will be helping you create your beautiful CV, by giving you suggestions about why and where you should give out your information.`,
                    true,
                  );
                  nextMessage('claims');
                  break;
                case 'thankyou':
                  sendMessage(
                    `Thank you ${profile.fullNames} for you time. You can now proceed and start using a customized version of the app`,
                    true,
                  );
                  nextMessage('continue');
                  break;
                case 'finish':
                  break;
              }
            }}
            onValue={(key, value) => {
              console.log('Formik onValue');
              setFormValues(values => {
                values[key] = value;
                return values;
              });
              return value;
            }}
          />
        </Box>
      </VStack>
    </VStack>
  );
};

const stateToProps = state => {
  return {
    profile: state.user.profile,
  };
};
export default connect(stateToProps)(LeavePage);

let ScreenHeight = Dimensions.get('window').height;
let ScreenHeightHalf = Dimensions.get('window').height / 1.5;
let ScreenWidth = Dimensions.get('window').width;
