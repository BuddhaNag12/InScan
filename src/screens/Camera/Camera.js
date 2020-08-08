import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {RNCamera} from 'react-native-camera';
import CameraRoll from '@react-native-community/cameraroll';
import {Dimensions} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import RNImageToPdf from 'react-native-image-to-pdf';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PendingView = () => <ActivityIndicator size="large" />;

export default function Camera({navigation}) {
  const [flash, setFlash] = useState(RNCamera.Constants.FlashMode.on);
  const [Cam, setCam] = useState(RNCamera.Constants.Type.back);
  const [loading, setloading] = useState(false);

  // Local path to file on the device
  let CameraRef = useRef(null);

  const takePicture = async () => {
    const options = {quality: 0.5, base64: true};
    const data = await CameraRef.current.takePictureAsync(options);
    CameraRoll.save(data.uri, {type: 'photo', album: 'InScan'}).then(()=>{
      showToastWithGravityAndOffset();
    }).catch(e=>{console.log(e)})
  };
  const showToastWithGravityAndOffset = () => {
        ToastAndroid.showWithGravityAndOffset(
          "Captured",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      };
  const toggleFlash = () => {
    if (flash == RNCamera.Constants.FlashMode.on) {
      setFlash(RNCamera.Constants.FlashMode.off);
    } else {
      setFlash(RNCamera.Constants.FlashMode.on);
    }
  };

  const openImagePicker = () => {
    ImagePicker.openPicker({
      multiple: true,
    })
      .then((images) => {
        const imageArray = [];
        images.map((img) => imageArray.push(img.path.substr(7)));
        convertPdf(imageArray);
        console.log(imageArray);
      })
      .catch((e) => console.log(e));
  };
  const convertPdf = async (imgPath) => {
    try {
      // convert image to pdf
      const options = {
        imagePaths: imgPath,
        name: `Inscan_${Date.now().toString()}.pdf`,
        maxSize: {
          // optional maximum image dimension - larger images will be resized
          width: 900,
          height: Math.round(
            (Dimensions.get('screen').height / Dimensions.get('screen').width) *
              900,
          ),
        },
        quality: 1.0, // optional compression paramter
      };
      RNImageToPdf.createPDFbyImages(options).then((pdf) => {
        navigation.navigate('Document', {
          pdfUri: pdf.filePath,
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <RNCamera
        style={styles.preview}
        type={Cam}
        ref={CameraRef}
        flashMode={flash}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        {({camera, status, recordAudioPermissionStatus}) => {
          if (status !== 'READY') return <PendingView />;
          return (
            <View>
              <View
                style={{
                  alignItems: 'flex-start',
                  paddingLeft: 6,
                  height: windowHeight - 100,
                }}>
                <Icon
                  name="home-outline"
                  type="ionicon"
                  size={30}
                  color="white"
                  onPress={() => navigation.navigate('Dashboard')}
                />
              </View>
              <View
                style={{
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                  width: windowWidth,
                  height: windowHeight / 8,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  backgroundColor: 'grey',
                }}>
                <Icon
                  name="images-outline"
                  type="ionicon"
                  size={30}
                  color="white"
                  onPress={() => navigation.navigate('Gallery')}
                />
                <Icon
                  name="camera-outline"
                  type="ionicon"
                  size={30}
                  color="white"
                  onPress={() => takePicture()}
                />
                <Icon
                  name={
                    flash == RNCamera.Constants.FlashMode.on
                      ? 'flash-outline'
                      : 'flash-off-outline'
                  }
                  size={30}
                  type="ionicon"
                  color="white"
                  onPress={() => toggleFlash()}
                />
                <Icon
                  name="image-outline"
                  type="ionicon"
                  size={30}
                  color="white"
                  onPress={() => openImagePicker()}
                />
              </View>
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
