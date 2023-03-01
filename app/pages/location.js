import React, {useState, useEffect, useCallback} from 'react';
import {
  Container,
  View,
  Switch,
  Item,
  Button,
  Text,
  List,
  ListItem,
  Content,
} from 'native-base';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {debounce} from 'lodash';
import DelayInput from 'react-native-debounce-input';
import {LocationService} from '../services/location-service';
import {ScrollView} from 'react-native-gesture-handler';
import {storeLocationChatMap} from '../services/localStorage';
import {BackHandler} from 'react-native';

export const TopRight = ({findMe, onFindMeChange}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Text style={{color: 'white'}}>Find Me</Text>
      <Switch value={findMe} onValueChange={(value) => onFindMeChange(value)} />
    </View>
  );
};

export const LocationPage = ({navigation, route}) => {
  // const [zoomLevel, setZoomLevel] = useState(11)
  const [findMe, setFindMe] = useState(true);
  const [address, setAddress] = useState({text: '', search: false});
  const [addresses, setAddresses] = useState([]);
  const [location, setLocation] = useState(null);
  const [addressLocation, setAddressLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [watchId, setWatchId] = useState(null);
  // const callback = route.params.callback // navigation.getParam('callback')

  const onFindMeChanged = (findMe) => {
    setFindMe(findMe);
  };

  const confirmLocation = useCallback(async () => {
    if (addressLocation) {
      await LocationService.reverseGeocode(
        addressLocation.lat,
        addressLocation.lng,
      ).then(async (add) => {
        addressLocation.address = add;
        console.log(addressLocation);
        await storeLocationChatMap(addressLocation);
      });
    } else if (currentLocation) {
      await LocationService.reverseGeocode(
        currentLocation.lat,
        currentLocation.lng,
      ).then(async (add) => {
        currentLocation.address = add;
        console.log(currentLocation);
        await storeLocationChatMap(currentLocation);
      });
    }
    navigation.goBack();
  }, [addressLocation, currentLocation, navigation]);

  useEffect(() => {
    console.log('useEffect useEffect useEffect');
    if (address && address.search) {
      console.log('useEffect address if', address);
      LocationService.addresses(address.text).then((add) => {
        setAddresses(add);
      });
    } else {
      console.log('useEffect address', address);
    }
  }, [address]);

  useEffect(() => {
    let backhandler = BackHandler.addEventListener(
      'hardwareBackPress',
      function () {
        if (route.name === 'Location') {
          console.log('LocationPage LocationPage LocationPage LocationPage');
          storeLocationChatMap('Goback').then(() => {
            navigation.goBack();
          });
          return true;
        }
        return false;
      },
    );
    return () => {
      backhandler.remove();
    };
  }, [navigation, route.name]);

  useEffect(() => {
    // navigation.setParams({findMe: true, findMeChanged: onFindMeChanged})
    const watchID = Geolocation.watchPosition(
      (loc) => {
        if (findMe) {
          setLocation({
            lat: loc.coords.latitude,
            lng: loc.coords.longitude,
          });

          setCurrentLocation({
            lat: loc.coords.latitude,
            lng: loc.coords.longitude,
          });
        }
      },
      (_err) => {},
      {
        maximumAge: 0,
        enableHighAccuracy: true,
        distanceFilter: 50,
        forceRequestLocation: true,
      },
    );
    setWatchId(watchID);

    return () => {
      console.log('Stop listening to location');
      Geolocation.clearWatch(watchID);
      Geolocation.stopObserving();
    };
  }, [findMe]);

  let locationToRender = findMe ? location : addressLocation;

  if (locationToRender == null) {
    locationToRender = currentLocation;
  }

  return (
    <Container style={{flex: 1, flexDirection: 'row'}}>
      <MapView
        onPress={(event) => {
          setFindMe(false);
          setAddressLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude,
          });
          console.log(
            'map event.nativeEvent.coordinate',
            event.nativeEvent.coordinate,
          );
        }}
        provider={PROVIDER_GOOGLE}
        style={{flex: 1}}
        region={
          locationToRender
            ? {
                latitude: locationToRender.lat,
                longitude: locationToRender.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }
            : {
                latitude: 27,
                longitude: -28,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }
        }>
        {location && (
          <Marker
            coordinate={{
              latitude: location.lat,
              longitude: location.lng,
            }}
          />
        )}

        {addressLocation && (
          <Marker
            coordinate={{
              latitude: addressLocation.lat,
              longitude: addressLocation.lng,
            }}
          />
        )}
      </MapView>

      <View
        style={{
          padding: 10,
          position: 'absolute',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
        }}>
        <Item regular style={{backgroundColor: 'white'}}>
          <DelayInput
            delayTimeout={1000}
            value={address.text}
            onChangeText={(text) => {
              setFindMe(false);
              setAddress({text: text, search: true});
              navigation.setParams({findMe: false});
              // if (!findMe) {

              // }
            }}
            disabled={findMe}
            placeholder="Type Address"
            autoCapitalize="words"
            style={{
              color: findMe ? '#000000' : '#000000',
              width: '100%',
              zIndex: 99,
              height: 50,
            }}
            placeholderTextColor={findMe ? '#000000' : '#a0a0a0'}
          />
        </Item>

        {addresses?.length > 0 && (
          <ScrollView
            contentContainerStyle={{
              backgroundColor: 'white',
              marginTop: 10,
            }}>
            <List>
              {addresses.map((add, index) => {
                return (
                  <ListItem
                    key={index}
                    button
                    onPress={() => {
                      setAddress({text: add.description, search: false});
                      setAddresses([]);
                      LocationService.geocode(add.description).then(
                        (location) => {
                          console.log('<-- location -->', location);
                          setAddressLocation(location.location);
                        },
                      );
                    }}>
                    <Text>{add.description}</Text>
                  </ListItem>
                );
              })}
            </List>
          </ScrollView>
        )}
        {/* </Content> */}
      </View>

      <View
        style={{
          padding: 10,
          position: 'absolute',
          left: 0,
          bottom: 0,
          right: 0,
        }}>
        <Button
          onPress={() => {
            // if (callback != null) {
            //     if (addressLocation) {
            //         callback(addressLocation)
            //     } else if (location) {
            //         callback(location)
            //     }
            // }
            confirmLocation();
          }}
          dark={!!(location || addressLocation)}
          light={!(location || addressLocation)}
          block>
          <Text
            style={{color: location || addressLocation ? 'white' : '#c0c0c0'}}>
            Confirm
          </Text>
        </Button>
      </View>
    </Container>
  );
};
export default LocationPage;
