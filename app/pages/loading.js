import React from 'react';
import {connect} from 'react-redux';
import {View, Text, Spinner} from 'native-base';

const HomePage = () => {
  return (
    <View>
      <Text>Loading</Text>
      <Spinner />
    </View>
  );
};

export default connect()(HomePage);
