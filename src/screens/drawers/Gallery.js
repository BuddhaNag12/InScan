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
var RNFS = require('react-native-fs');

const height = Dimensions.get('window').height;

const MyGallery = ({navigation}) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
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
    try {
      CameraRoll.deletePhotos([uri]).then(() => {
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
            console.log(err);
          });
      });
    } catch (e) {
      console.log(e);
    }
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
        console.log(err);
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
      })
      .catch((error) => console.log(error));
  }

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <MyHeader navigation={navigation} />
      <View
        style={{
          backgroundColor: '#60B6D8',
          borderRadius: 40,
          elevation: 4,
          width: 300,
          marginTop: 4,
          height: 20,
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Ionicons',
            fontSize: 20,
            color: 'white',
            textTransform: 'capitalize',
          }}>
          Documents from InScan library
        </Text>
      </View>
      {photos.length > 0 ? (
        <FlatList
          data={photos}
          numColumns={3}
          keyExtractor={(_, index) => index}
          renderItem={({item, index}) => (
            <View
              keyExtractor={(_, index) => index.toString()}
              style={{
                padding: 10,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => openPreview(item.node.image.uri)}>
                <Image
                  source={{uri: item.node.image.uri}} // Use item to set the image source
                  key={index} // Important to set a key for list items
                  style={{
                    width: 100,
                    height: 100,
                    borderWidth: 3,
                    borderColor: 'white',
                    resizeMode: 'contain',
                    margin: 8,
                  }}
                />
              </TouchableOpacity>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <Icon
                  raised
                  size={10}
                  onPress={() => cropImage(item.node.image.uri)}
                  name="create-outline"
                  type="ionicon"
                  color="#FF5D5D"
                />
                <Icon
                  size={10}
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
        <View>
          <Text style={{fontFamily: 'Roboto', fontSize: 20}}>No Images</Text>
          <Button
            title="Camera"
            titleStyle={{fontFamily: 'Roboto', color: 'white'}}
            icon={<Icon name="camera" size={20} color="#FF8066" />}
            buttonStyle={{backgroundColor: '#C34A36', borderRadius: 30}}
            onPress={() => navigation.navigate('Camera')}
          />
        </View>
      )}
    </View>
  );
};

{
  /*  */
}
export default MyGallery;
