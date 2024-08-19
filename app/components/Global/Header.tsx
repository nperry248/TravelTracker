// app/components/Header.tsx

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Colors from '../../../constants/Colors';

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TravelTracker</Text>
      <Image source={require('../../../assets/images/TTlogo.png')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.nearWhite,
    borderBottomWidth: 1,
    borderColor: Colors.lighterGrey,
    paddingTop: 55
  },
  logo: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.darkerBlue,
    fontFamily: 'futura'
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default Header;
