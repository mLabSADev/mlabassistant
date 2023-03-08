import AsyncStorage from '@react-native-async-storage/async-storage';

// local storate functions

export const storeToken = async value => {
  try {
    await AsyncStorage.setItem('storeTokenLocal', value);
  } catch (e) {
    console.log(e);
    console.log(e);
  }
};

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('storeTokenLocal');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(e);
  }
};

export const storeTokenDelete = async () => {
  try {
    await AsyncStorage.removeItem('storeTokenLocal');
  } catch (e) {
    console.log(e);
  }

  console.log('Done.');
};

export const storeUIDLocal = async value => {
  try {
    await AsyncStorage.setItem('storeUIDLocal', value);
  } catch (e) {
    console.log(e);
  }
};

export const getStoreUIDLocal = async () => {
  try {
    const value = await AsyncStorage.getItem('storeUIDLocal');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(e);
  }
};

export const storeNumberdaysInApp = async value => {
  try {
    await AsyncStorage.setItem('storeNumberdaysInApp', value);
  } catch (e) {
    console.log(e);
  }
};

export const getstoreNumberdaysInApp = async () => {
  try {
    const value = await AsyncStorage.getItem('storeNumberdaysInApp');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(e);
  }
};

export const StoreFeedbackCheckNumberOfDay = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('StoreFeedbackCheckNumberOfDay', jsonValue);
  } catch (e) {
    // saving error
  }
};

export const getStoreFeedbackCheckNumberOfDay = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(
      'StoreFeedbackCheckNumberOfDay',
    );
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

export const storeLocationChatMap = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('locationChatMap', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const getLocationChatMap = () => {
  return new Promise((resolve, reject) => {
    try {
      AsyncStorage.getItem('locationChatMap').then(jsonValue => {
        resolve(jsonValue != null ? JSON.parse(jsonValue) : null);
      });
    } catch (e) {
      console.log(e);
    }
  });
};

export const deleteLocationChatMap = async () => {
  try {
    await AsyncStorage.removeItem('locationChatMap');
  } catch (e) {
    console.log(e);
  }
};
