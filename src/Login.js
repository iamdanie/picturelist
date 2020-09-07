import React from 'react';
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {authenticateUser} from './store/actions';
import BaseView from './components/BaseView';
import {colors} from './theme';

const Login = ({navigation}) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const {userToken, loading} = useSelector((state) => state);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (userToken) {
      navigation.navigate('PictureList');
    }
  }, []);

  const loginUser = async (payload) =>
    await dispatch(authenticateUser(payload));

  const handleChangeUsername = (newText) => {
    setUsername(newText);
  };

  const handleChangePassword = (newText) => {
    setPassword(newText);
  };

  const handleLogin = async () => {
    try {
      await loginUser({username, password});
      navigation.push('PictureList');
    } catch (error) {
      showLoginAlert('There has been an error logging in');
    }
  };

  const showLoginAlert = (error) => {
    Alert.alert('Error', error);
  };

  const buttonDisabled = () => !username.length || !password.length;

  return (
    <BaseView navigation={navigation}>
      <View style={styles.container}>
        {userToken ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <Text style={styles.loginTitle}>{'Picture List Login'}</Text>
            <View style={styles.inputContainer}>
              <TextInput
                autoCapitalize={'none'}
                style={styles.textInput}
                placeholderTextColor={'purple'}
                selectionColor={'#1FD7AE'}
                placeholder={'Username'}
                keyboardType={'email-address'}
                value={username}
                returnKeyType={'next'}
                onChangeText={handleChangeUsername}
              />
              <TextInput
                autoCapitalize={'none'}
                style={styles.textInput}
                secureTextEntry
                placeholder={'Password'}
                selectionColor={'#1FD7AE'}
                placeholderTextColor={'purple'}
                value={password}
                returnKeyType={'done'}
                onChangeText={handleChangePassword}
                onSubmitEditing={handleLogin}
              />
            </View>
            {loading ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <TouchableOpacity
                onPress={handleLogin}
                style={buttonDisabled() ? styles.disabledButton : styles.button}
                disabled={buttonDisabled()}>
                <Text style={styles.buttonText}>{'Sign In'}</Text>
              </TouchableOpacity>
            )}
          </>
        )}
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
  inputContainer: {
    padding: 24,
  },
  textInput: {
    fontSize: 16,
    paddingVertical: 24,
    color: colors.black,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  button: {
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 24,
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  disabledButton: {
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 24,
    justifyContent: 'center',
    backgroundColor: colors.disabled,
  },
  buttonText: {
    fontSize: 16,
    color: colors.white,
  },
});

export default Login;
