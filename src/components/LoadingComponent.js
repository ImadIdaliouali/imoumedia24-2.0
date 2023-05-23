import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from '@react-native-material/core';

const LoadingComponent = () => {
  return (
    <View style={styles.container}>
      <Button title="Loading" loading disabled />
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
