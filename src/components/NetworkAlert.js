import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Banner, Button, Avatar} from '@react-native-material/core';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NetInfo from '@react-native-community/netinfo';

import {COLORS, FONTS} from '../constants';

function NetworkAlert() {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    unsubscribe();
  }, []);

  if (!isConnected) {
    return (
      <Banner
        style={styles.container}
        illustration={props => (
          <Avatar
            color={COLORS.ACTIVE}
            icon={props => <Icon name="wifi-off" {...props} />}
            {...props}
          />
        )}
        text="No internet connection try again."
        textContainerStyle={styles.textContainer}
        textStyle={styles.text}
        buttons={<Button key="fix-it" variant="text" title="Fix it" compact />}
      />
    );
  }
  return null;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BASIC_BACKGROUND,
  },
  textContainer: {
    justifyContent: 'center',
  },
  text: {
    fontSize: 15,
    fontFamily: FONTS.BLACK,
  },
});

export default NetworkAlert;
