import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import BaseView from './components/BaseView';
import {colors} from './theme';

const Logout = ({navigation}) => {
  const handleLogin = async () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
    navigation.push('Login');
  };

  return (
    <BaseView navigation={navigation}>
      <View style={styles.container}>
        <Text style={styles.loginTitle}>{'You have been logged out'}</Text>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>{'Log In'}</Text>
        </TouchableOpacity>
      </View>
    </BaseView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 24,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.black,
    alignSelf: 'center',
  },
  button: {
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 24,
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  buttonText: {
    fontSize: 16,
    color: colors.white,
  },
});

export default Logout;
