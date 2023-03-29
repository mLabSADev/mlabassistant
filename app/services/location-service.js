import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid, Platform} from 'react-native';
import Axios from 'axios';
import {Alert} from 'react-native';
import {AppName} from '../assets/app-consts';

// Old PI key not working needs billing
//export const GOOGLE_MAP_KEY = "AIzaSyDy8l2MmrOl-EKprQ0Li5pwlSWXIjRosLE"
export const GOOGLE_MAP_KEY = 'AIzaSyCcTI3_A32pecq9RReD5IZwbeP9gCGnxAI';

export async function geocode(address) {
  return await Axios.get(
    'https://maps.googleapis.com/maps/api/geocode/json?address=' +
      address.split(' ').join('+') +
      '&key=' +
      GOOGLE_MAP_KEY,
  ).then(res => {
    const x = res.data.results[0];
    return x;
  });
}

export class LocationService {
  static async requestPermissions() {
    ('!!!!!!!!!! requestPermissions !!!!!!!!!!!!');
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
    }
    if (Platform.OS === 'android') {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: `${AppName.name} location permission`,
          message: `${AppName.name} requires access to your location`,
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        throw {
          message:
            "We won't be able to retrieve your location until you enable your location",
        };
      }
    }
  }

  static async addresses(address) {
    address;
    address = address.split(' ').join('+');
    const res = await Axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${address}&key=${GOOGLE_MAP_KEY}`,
    );
    return res.data.predictions;
  }

  static async distanceFilter(origin, destination) {
    const res = await Axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&units=metric&key=${GOOGLE_MAP_KEY}`,
    );
    ('res');
    JSON.stringify(res.data.rows, null, '\t');
    return res.data.rows;
  }
  static async reverseGeocode(lat, lng) {
    const res = await Axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAP_KEY}`,
    );
    const x = res.data.results[0].formatted_address;
    return x;
  }
  static async geocode(address) {
    const res = await Axios.get(
      'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        address.split(' ').join('+') +
        '&key=' +
        GOOGLE_MAP_KEY,
    );
    const x = res.data.results[0];
    const item = {
      address: x.formatted_address,
      location: x.geometry.location,
    };
    return item;
  }

  static getCurrentPosition() {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        location => {
          resolve(location);
        },
        err => {
          resolve(err.code);
          LocationService.requestPermissions();
          Alert.alert(
            'Location permission denied',
            'Please enable location from your phone settings for better experience on the app',
            [{text: 'Okay', onPress: () => 'close alert'}],
          );
        },
        {
          distanceFilter: 50,
          enableHighAccuracy: true,
          maximumAge: 10000,
          forceRequestLocation: true,
          timeout: 10000,
        },
      );
    });
  }
}
