import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

import {COLORS} from '../constants';

const LoadingComponent = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={COLORS.ACTIVE} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
});

export default LoadingComponent;
