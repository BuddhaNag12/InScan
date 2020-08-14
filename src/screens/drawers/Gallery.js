import React, {useState, useEffect} from 'react';
import {
  View,
  PermissionsAndroid,
  Platform,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Button, Image, Text, Icon} from 'react-native-elements';
import MyHeader from '../../components/header/Header';
import CameraRoll from '@react-native-community/cameraroll';
import ImagePicker from 'react-native-image-crop-picker';

const {height,width} = Dimensions.get('window');

const MyGallery = ({navigation}) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  async function HasWritePermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  const saveFile = async (image) => {
    if (Platform.OS === 'android' && !(await HasWritePermission())) {
      return;
    }
    CameraRoll.save(image.path, {type: 'photo', album: 'InScan_edit'});
  };

  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleButtonPress();
    });
    return unsubscribe;
  }, [navigation]);

  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Deleted',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  const deletePhoto = async (uri) => {
    CameraRoll.deletePhotos([uri])
      .then(() => {
        showToastWithGravityAndOffset();
        CameraRoll.getPhotos({
          first: 20,
          assetType: 'Photos',
          groupTypes: 'Album',
          groupName: 'InScan',
        })
          .then((r) => {
            setPhotos(r.edges);
          })
          .catch((err) => {
            setError(err);
            console.log(err);
            ToastAndroid.showWithGravityAndOffset(
              error,
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
              25,
              50,
            );
          });
      })
      .catch((e) => {
        setError(e);
        ToastAndroid.showWithGravityAndOffset(
          'Wait Before deletetion complete',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      });
  };

  async function handleButtonPress() {
    setLoading(true);
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
      groupTypes: 'Album',
      groupName: 'InScan',
    })
      .then((r) => {
        setPhotos(r.edges);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }

  const openPreview = (imgPath) => {
    navigation.push('Preview', {
      imgPath: imgPath,
    });
  };
  function cropImage(path) {
    ImagePicker.openCropper({
      freeStyleCropEnabled: true,
      enableRotationGesture: true,
      showCropFrame: true,
      compressImageQuality: 1,
      cropping: true,
      path: path,
      width: 600,
      height: height,
    })
      .then((image) => {
        saveFile(image);
        ToastAndroid.showWithGravityAndOffset(
          'File saved in edited image Drawer',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
          25,
          50,
        );
      })
      .catch((error) => {
        setError(error);
        if (error == 'Error: User cancelled image selection') {
          ToastAndroid.showWithGravityAndOffset(
            'User cancelled Cropping',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
            25,
            50,
          );
        }
      });
  }

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <MyHeader navigation={navigation} />
      {photos.length > 0 ? (
        <FlatList
          data={photos}
          numColumns={2}
          keyExtractor={(_, index) => index}
          renderItem={({item, index}) => (
            <View
              keyExtractor={(_, index) => index.toString()}
              style={{
                flex:1,
                justifyContent: "space-around",
                alignItems:"center"
              }}>
              <TouchableOpacity
                onPress={() => openPreview(item.node.image.uri)}>
                <Image
                  source={{uri: item.node.image.uri}} // Use item to set the image source
                  key={index} // Important to set a key for list items
                  style={{
                    width: width/2-10,
                    height: 180,
                    borderWidth: 2,
                    borderColor: 'white',
                    resizeMode: 'cover',
                    margin: 4,
                  }}
                />
              </TouchableOpacity>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <Icon
                  raised
                  size={18}
                  onPress={() => cropImage(item.node.image.uri)}
                  name="create-outline"
                  type="ionicon"
                  color="#FF5D5D"
                />
                <Icon
                  size={18}
                  raised
                  onPress={() => deletePhoto(item.node.image.uri)}
                  name="trash-outline"
                  type="ionicon"
                  color="#574240"
                />
              </View>
            </View>
          )}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontFamily: 'Roboto', fontSize: 15, color: 'grey'}}>
            No Images
          </Text>
          <Button
            title="Camera"
            titleStyle={{fontFamily: 'Roboto', color: 'white'}}
            icon={<Icon name="camera" size={20} color="#ddd" />}
            buttonStyle={{backgroundColor: '#C34A36', borderRadius: 30}}
            onPress={() => navigation.navigate('Camera')}
          />
        </View>
      )}
    </View>
  );
};

export default MyGallery;
