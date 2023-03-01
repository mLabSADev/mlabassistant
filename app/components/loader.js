import React from 'react';
import {connect} from 'react-redux';
import {View, Text, Spinner} from 'native-base';

const Loader = ({isLoading, showAsScreen, message}) => {
  return isLoading && !showAsScreen ? (
    <View
      style={{
        position: 'absolute',
        zIndex: 10000,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 8,
          minWidth: 250,
          maxWidth: 250,
          padding: 20,
        }}>
        <Text style={{textAlign: 'center'}}>
          {message ? message : 'Please wait'}
        </Text>
        <Spinner color="black" style={{marginTop: 10}} />
      </View>
    </View>
  ) : null;
};

const mapStatesToProps = (state) => {
  return {
    isLoading: state.user.isLoading,
    showAsScreen: true,
    message: 'Loading',
  };
};

export default connect(mapStatesToProps)(Loader);
