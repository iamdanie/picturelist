import React from 'react';
import {StatusBar, View} from 'react-native';
import {Provider} from 'react-redux';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/store';
import Login from './src/Login';
import Logout from './src/Logout';

import PictureList from './src/PictureList';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" />
          <Stack.Navigator initialRouteName="Login" headerMode={'none'}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Logout" component={Logout} />
            <Stack.Screen name="PictureList" component={PictureList} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
