import React from 'react';
import {
  ActivityIndicator,
  View,
  FlatList,
  StyleSheet,
  Text,
  Alert,
  Modal,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {getPictures, logoutCurrentUser} from './store/actions';
import {colors} from './theme';

const PictureList = ({navigation}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [currentImage, setCurrentImage] = React.useState(false);
  const [loadingImage, setLoadingImage] = React.useState(false);
  const dispatch = useDispatch();
  const {pictures, loading} = useSelector((state) => state);

  React.useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      return;
    });
  }, [navigation]);

  React.useEffect(() => {
    fetchPictures();
  }, [dispatch]);

  const fetchPictures = async () => {
    try {
      await dispatch(getPictures());
    } catch (error) {
      Alert.alert('Error', 'Something went wrong fetching images');
    }
  };

  const openModalWithImage = (image) => () => {
    setCurrentImage(image);
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  const handleLogout = async () => {
    await dispatch(logoutCurrentUser());
    navigation.push('Logout');
  };

  const renderListItem = ({item}) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={openModalWithImage(item)}>
      <Text style={styles.listTitle}>{`${item.id + 1}: ${item.title}`}</Text>
      <Text style={styles.listDescription} numberOfLines={1}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  const renderImage = () => {
    return (
      <Image
        onLoadStart={() => {
          setLoadingImage(true);
        }}
        onLoadEnd={() => {
          setLoadingImage(false);
        }}
        style={styles.modalImage}
        source={{
          uri: currentImage.image,
        }}
        resizeMode={'contain'}
      />
    );
  };

  return (
    <>
      <FlatList
        renderItem={renderListItem}
        contentContainerStyle={styles.container}
        onRefresh={fetchPictures}
        ListHeaderComponent={
          <View style={styles.listHeaderContainer}>
            <Text style={styles.sectionTitle}>List of pictures</Text>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.sectionTitle}>Logout</Text>
            </TouchableOpacity>
          </View>
        }
        keyExtractor={(item, index) => `${item.id}${index}`}
        data={pictures}
        refreshing={loading}
      />
      <Modal
        animationType="fade"
        visible={isVisible}
        onRequestClose={closeModal}>
        <TouchableOpacity style={styles.modalBackdrop} onPress={closeModal}>
          <Text style={styles.modalTitle}>{currentImage.title}</Text>
          <View style={styles.imageContainer}>
            {renderImage()}
            {loadingImage && <ActivityIndicator size="large" color="#FAFAFA" />}
          </View>
          <Text style={styles.modalDescription}>
            {currentImage.description}
          </Text>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'android' ? 96 : 0,
    marginTop: 64,
  },
  listDescription: {
    fontSize: 18,
    fontWeight: '400',
    color: colors.black,
  },
  listHeaderContainer: {flexDirection: 'row', justifyContent: 'space-between'},
  listItem: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: colors.primary,
  },
  modalBackdrop: {
    backgroundColor: colors.backdrop,
    flex: 1,
    padding: 32,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  modalDescription: {
    fontSize: 18,
    paddingTop: 24,
    fontWeight: '400',
    color: colors.white,
    textAlign: 'center',
  },
  imageContainer: {alignSelf: 'center'},
  modalImage: {
    alignSelf: 'center',
    height: 320,
    width: 320,
  },
  modalTitle: {
    fontSize: 24,
    paddingBottom: 24,
    fontWeight: '600',
    color: colors.white,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
  },
});

export default PictureList;
