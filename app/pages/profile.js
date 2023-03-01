import React from 'react';
import {connect} from 'react-redux';
import {View, Button, Text, List, Icon} from 'native-base';
import {StyleSheet, FlatList, Image} from 'react-native';
import {ThemeColors} from '../theme/colors';
import {logOut} from '../redux/user-async-action';
import {useDispatch} from 'react-redux';

const ProfilePage = ({navigation}) => {
  const dispatch = useDispatch();
  const {goBack} = navigation;

  const onGoBack = () => {
    goBack();
  };

  const signOut = () => {
    dispatch(logOut());
  };

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Sick Leave for 3 days',
      date: '17 Jul 2022',
      daysLeft: '10 leave days left',
      status: 'Pending',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Sick Leave for 13 days',
      date: '2 Aug 2022',
      daysLeft: '10 leave days left',
      status: 'Approved',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Unpaid Leave for 3 days',
      date: '30 Sep 2022',
      daysLeft: '10 leave days left',
      status: 'Declined',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d73',
      title: 'Sick Leave for 23 days',
      date: '19 Sep 2022',
      daysLeft: '10 leave days left',
      status: 'Approved',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d99',
      title: 'Unpaid Leave for 3 days',
      date: '30 Sep 2022',
      daysLeft: '10 leave days left',
      status: 'Declined',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29123',
      title: 'Sick Leave for 23 days',
      date: '19 Sep 2022',
      daysLeft: '10 leave days left',
      status: 'Approved',
    },
  ];

  const statusColor = {
    Pending: 'orange',
    Approved: 'green',
    Declined: 'red',
  };

  const chatToBot = () => {
    navigation.navigate('Claims');
  };

  return (
    <View style={{padding: 16, backgroundColor: 'white', height: '100%'}}>
      <View style={styles.appBar}>
        <View style={styles.appBarInnerWrapper}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.iconButtonPrimary}>
              <Image
                style={styles.iconButtonPrimary}
                source={require('../assets/bot-avatar.jpg')}
              />
            </View>
            <View
              style={{
                marginLeft: 8,
                justifyContent: 'center',
              }}>
              <Text style={styles.appBarText}>Hello</Text>
              <Text style={styles.appBarTextName}>Mxolisi</Text>
            </View>
          </View>
          <Button icon style={styles.iconButtonPrimary} onPress={signOut}>
            <Icon type="MaterialIcons" name="more-vert" />
          </Button>
        </View>
      </View>
      <View style={styles.marginSpaceTop16} />
      <Text>You currently have 25 daysof leave available for you</Text>
      <View style={styles.marginSpaceTop16} />
      <View style={styles.mainWrapper}>
        <Text>Leave History</Text>
        <View style={styles.marginSpaceTop16} />
        <FlatList
          data={DATA}
          keyExtractor={(item) => item.id}
          //extraData={selectedId}
          renderItem={({item}) => (
            <List style={styles.list}>
              <View style={styles.listFlex}>
                <Text style={styles.subText}>{item.date}</Text>
                <Text style={{color: statusColor[item.status]}}>
                  {item.status}
                </Text>
              </View>
              <View style={{marginTop: 8}} />
              <Text style={styles.titlText}>{item.title}</Text>
              <View style={{marginTop: 8}} />
              <Text style={styles.subText}>{item.daysLeft}</Text>
            </List>
          )}
        />
      </View>
      <View style={styles.marginSpaceTop16} />
      <Button color={ThemeColors.brandPrimary} full rounded onPress={chatToBot}>
        <Text>Start conversation</Text>
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  appBar: {
    height: '10%',
    width: '100%',
    borderRadius: 20,
    backgroundColor: ThemeColors.brandSecondary,
  },
  mainWrapper: {
    backgroundColor: ThemeColors.brandLight,
    height: '70%',
    width: '100%',
    borderRadius: 20,
    padding: 16,
    // elevation: 5,
  },
  inputLable: {
    padding: 5,
    color: 'grey',
  },
  appBarText: {
    color: '#fff',
  },
  appBarTextName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  list: {
    padding: 8,
    borderWidth: 1,
    borderColor: ThemeColors.brandSecondary,
    borderRadius: 15,
    marginVertical: 4,
  },

  listFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  appBarInnerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
  },
  subText: {
    color: '#7b7b7b',
  },
  titlText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  marginSpaceTop16: {
    marginTop: 16,
  },

  buttonSecondary: {
    backgroundColor: ThemeColors.brandSecondary,
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  buttonPrimary: {
    backgroundColor: ThemeColors.brandPrimary,
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  iconButtonPrimary: {
    backgroundColor: ThemeColors.brandPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    width: 55,
    height: 55,
    alignSelf: 'center',
  },
});

const mapStatesToProps = (state) => {
  console.log(state.user.profile);
  return {
    isLoggedIn: state.user.isLoggedIn,
    isLoading: state.user.isLoading,
    profile: state.user.profile,
  };
};

export default connect(mapStatesToProps)(ProfilePage);
