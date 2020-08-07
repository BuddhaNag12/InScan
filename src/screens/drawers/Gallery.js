import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Card, Image, Text, Icon} from 'react-native-elements';
import MyHeader from '../../components/header/Header';
import CameraRoll from '@react-native-community/cameraroll';
import ImagePicker from 'react-native-image-crop-picker';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const MyGallery = ({navigation}) => {
  const [photos, setPhotos] = useState([]);
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
    CameraRoll.save(image.path, {type: 'photo', album: 'Inscan_edit'});
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
    handleButtonPress();
  }, []);

  async function handleButtonPress() {
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
      })
      .catch((err) => {
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
        console.log(image);
        saveFile(image);
        //console.log(image);
      })
      .catch((error) => console.log(error));
  }

  return (
    <View>
      <MyHeader navigation={navigation} />
      <Text style={{textAlign: 'center', fontFamily: 'Ionicons', fontSize: 20}}>
        Images from InScan library
      </Text>
      <ScrollView horizontal>
        {photos ? (
          photos.map((p, i) => {
            return (
              <Card
                containerStyle={{borderRadius: 30, height: height - 200}}
                key={i}>
                <TouchableOpacity onPress={() => openPreview(p.node.image.uri)}>
                  <Image
                    key={i}
                    style={{
                      width: 350,
                      height: height - 300,
                      borderRadius: 30,
                    }}
                    source={{uri: p.node.image.uri}}
                    PlaceholderContent={<ActivityIndicator />}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <Icon
                    raised
                    onPress={() => cropImage(p.node.image.uri)}
                    name="create-outline"
                    type="ionicon"
                    color="#FF5D5D"
                  />
                  <Icon
                    raised
                    onPress={() => console.log('Todo')}
                    name="trash-outline"
                    type="ionicon"
                    color="#574240"
                  />
                </View>
              </Card>
            );
          })
        ) : (
          <View style={{flex: 1}}>
            <Text>No Images Found</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default MyGallery;
