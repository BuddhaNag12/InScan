import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  Dimensions,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import {Card, Image, Text, Icon} from 'react-native-elements';
import MyHeader from '../../components/header/Header';
import CameraRoll, { deletePhotos } from '@react-native-community/cameraroll';
import ImagePicker from 'react-native-image-crop-picker';
var RNFS = require('react-native-fs');

const height = Dimensions.get('window').height;

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
      "Deleted",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  const deletePhoto= async (uri)=>{
    try{
      CameraRoll.deletePhotos([uri]).then(()=>{
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
      })
     }
     catch(e){
      console.log(e);
     }
  }

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
      })
      .catch((error) => console.log(error));
  }

  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <MyHeader navigation={navigation} />
      <View
        style={{
          backgroundColor: '#60B6D8',
          borderRadius:40,
          elevation:4,
          width: 300,
          marginTop:4
        }}>
        <Text
          style={{textAlign: 'center', fontFamily: 'Ionicons', fontSize: 20,color:"white", textTransform:"capitalize"}}>
          Documents from InScan library
        </Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {photos.length>0 ? (
          photos.map((p, i) => {
            return (
              <Card
                containerStyle={{borderRadius: 30, height: height - 120}}
                key={i}>
                <TouchableOpacity onPress={() => openPreview(p.node.image.uri)}>
                  <Image
                    key={i}
                    style={{
                      width: 350,
                      height: height - 200,
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
                    onPress={() => deletePhoto(p.node.image.uri)}
                    name="trash-outline"
                    type="ionicon"
                    color="#574240"
                  />
                </View>
              </Card>
            );
          })
        ) : (
          <View style={{flex: 1,justifyContent:"center",alignItems:"center"}}>
            <Text style={{textAlign:"center",fontFamily:"Roboto",fontSize:20}}>No Images Found</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default MyGallery;
