import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  StatusBar,
  ToastAndroid,
  PermissionsAndroid,
  Button,
  Text,
} from 'react-native';
import {Icon, Slider} from 'react-native-elements';
import {RNCamera} from 'react-native-camera';
import CameraRoll from '@react-native-community/cameraroll';
import {Dimensions} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import RNImageToPdf from 'react-native-image-to-pdf';
import * as Animatable from 'react-native-animatable';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Camera({navigation}) {
  const [flash, setFlash] = useState(RNCamera.Constants.FlashMode.off);
  const [Cam, setCam] = useState(RNCamera.Constants.Type.back);
  const [loading, setloading] = useState(false);
  const [exposure, setExposerLevel] = useState(0.5);
  const [isToggleExposure, setToggleExposure] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(0);
  const [isWhiteBalance, setIsWhiteBal] = useState(false);
  const [whiteBalance, setWhiteBal] = useState(
    RNCamera.Constants.WhiteBalance.auto,
  );

  // Local path to file on the device
  let CameraRef = useRef(null);

  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  const takePicture = async () => {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }
    try {
      const options = {quality: 0.5, base64: true};
      const data = await CameraRef.current.takePictureAsync(options);
      CameraRoll.save(data.uri, {type: 'photo', album: 'InScan'})
        .then(() => {
          showToastWithGravityAndOffset();
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Captured',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
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
  const PendingView = () => {
    return (
      <View style={{flex: 1}}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };
  const setZoom = () => {
    if (zoomLevel >= 1.0) {
      setZoomLevel(0);
    } else {
      setZoomLevel(zoomLevel + 0.5);
    }
  };

  const sunny = () => {
    setWhiteBal(RNCamera.Constants.WhiteBalance.sunny);
  };
  const cloudy = () => {
    setWhiteBal(RNCamera.Constants.WhiteBalance.cloudy);
  };
  const shadow = () => {
    setWhiteBal(RNCamera.Constants.WhiteBalance.shadow);
  };
  const incandescent = () => {
    setWhiteBal(RNCamera.Constants.WhiteBalance.incandescent);
  };
  const fluorescent = () => {
    setWhiteBal(RNCamera.Constants.WhiteBalance.fluorescent);
  };
  const defaultMod = () => {
    setWhiteBal(RNCamera.Constants.WhiteBalance.auto);
  };
  const toggleWhiteBalance = () => {
    if (isToggleExposure) {
      setToggleExposure(!isToggleExposure);
    }
    setIsWhiteBal(!isWhiteBalance);
  };
  const toggleExposure = () => {
    if (isWhiteBalance) {
      setIsWhiteBal(!isWhiteBalance);
    }
    setToggleExposure(!isToggleExposure);
  };
  const setExposure = (val) => {
    // console.log(val);
    setExposerLevel(val);
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <RNCamera
        playSoundOnCapture={true}
        whiteBalance={whiteBalance}
        exposure={exposure}
        zoom={zoomLevel}
        useNativeZoom
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
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  padding: 4,
                  height: windowHeight - 100,
                }}>
                <Icon
                  name="home-outline"
                  type="ionicon"
                  size={30}
                  color="white"
                  onPress={() => navigation.navigate('Dashboard')}
                />
                <Icon
                  name="menu-outline"
                  type="ionicon"
                  color="white"
                  size={30}
                  onPress={() => toggleDrawer()}
                />
                {drawer ? (
                  <Animatable.View
                    useNativeDriver
                    animation="bounceInDown"
                    duration={500}
                    easing="ease-in"
                    style={{
                      ...styles.DrawerView,
                    }}>
                    <View
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={{color: 'white', fontSize: 20}}>
                        Under Development camera menu 0.1
                      </Text>
                    </View>
                    <View style={{...styles.DrawerContainer}}>
                      <Button
                        title={`Zoom ${zoomLevel}`}
                        onPress={() => setZoom()}
                      />
                      <Button
                        title="whiteBalance"
                        onPress={() => toggleWhiteBalance()}
                      />
                      <Button
                        title="exposure"
                        onPress={() => toggleExposure()}
                      />
                    </View>
                    {isToggleExposure ? (
                      <Animatable.View
                        animation="bounceIn"
                        style={{
                          ...styles.whiteBalanceWrapper,
                          marginVertical: 20,
                          alignItems: 'stretch',
                          justifyContent: 'center',
                        }}>
                        <Slider
                          onValueChange={(val) => setExposure(val)}
                          value={0}
                          step={0.1}
                          trackStyle={{
                            height: 10,
                            backgroundColor: 'transparent',
                          }}
                        />
                        <Text style={{fontSize: 20, color: 'white'}}>
                          Value: {exposure}
                        </Text>
                      </Animatable.View>
                    ) : null}
                    {isWhiteBalance ? (
                      <Animatable.View
                        animation="bounceIn"
                        style={{
                          ...styles.whiteBalanceWrapper,
                        }}>
                        <View
                          style={{
                            ...styles.whiteBalanceView,
                          }}>
                          <Button title="sunny" onPress={() => sunny()} />
                          <Button title="cloudy" onPress={() => cloudy()} />
                          <Button
                            title="fluorescent"
                            onPress={() => fluorescent()}
                          />
                          <Button
                            title="incandescent"
                            onPress={() => incandescent()}
                          />
                          <Button title="shadow" onPress={() => shadow()} />
                          
                          <Button
                            title="default Mod"
                            onPress={() => defaultMod()}
                          />
                        </View>
                      </Animatable.View>
                    ) : null}
                  </Animatable.View>
                ) : null}
              </View>

              <View
                style={{
                  ...styles.buttomNavigationView,
                }}>
                <Icon
                  name="images-outline"
                  type="ionicon"
                  size={40}
                  color="white"
                  onPress={() => navigation.navigate('Gallery')}
                />
                <Icon
                  name="camera-outline"
                  type="ionicon"
                  size={40}
                  color="white"
                  onPress={() => takePicture()}
                />
                <Icon
                  name={
                    flash == RNCamera.Constants.FlashMode.on
                      ? 'flash-outline'
                      : 'flash-off-outline'
                  }
                  size={40}
                  type="ionicon"
                  color="white"
                  onPress={() => toggleFlash()}
                />
                <Icon
                  name="image-outline"
                  type="ionicon"
                  size={40}
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
  DrawerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  DrawerView: {
    elevation: 2,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 30,
    padding: 10,
    position: 'absolute',
    right: 0,
    top: 50,
    width: windowWidth,
    height: 500,
    overflow: 'hidden',
  },
  buttomNavigationView: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: windowWidth,
    height: windowHeight / 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  whiteBalanceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    alignContent: 'space-around',
    flexWrap: 'wrap',
    height: 150,
  },
  whiteBalanceWrapper: {
    position: 'absolute',
    height: 200,
    width: windowWidth - 30,
    top: 50,
    right: 10,
  },
});
