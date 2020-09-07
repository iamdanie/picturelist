import React from 'react';
import {View, StyleSheet} from 'react-native';

const BaseView = ({navigation, children}) => {
  React.useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      return;
    });
  }, [navigation]);

  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
  },
});

export default BaseView;
