import React, {useRef, useState} from 'react';
import {
  View,
  ActivityIndicator,
  StatusBar,
  ToastAndroid,
  PermissionsAndroid,
  Platform,
  Text,
} from 'react-native';
// Components
import ButtomNavigationView from '../../components/camera/ButtomNavigationView';
import AboveNavBarView from '../../components/camera/AboveNavBarView';
import FabButton from '../../components/camera/FabButton';

import styles from './cameraStyles';
import {Icon} from 'react-native-elements';
import {RNCamera} from 'react-native-camera';
import CameraRoll from '@react-native-community/cameraroll';
import {Dimensions} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import RNImageToPdf from 'react-native-image-to-pdf';
import * as Animatable from 'react-native-animatable';
import vision from '@react-native-firebase/ml-vision';

export default function Camera({navigation}) {
  const isFocused = navigation.isFocused();

  if (!isFocused) {
    return <ActivityIndicator size="large" />;
  } else if (isFocused) {
    return <CameraView navigation={navigation} />;
  }
}

function CameraView({navigation}) {
  const [flash, setFlash] = useState(RNCamera.Constants.FlashMode.off);
  const [Cam, setCam] = useState(RNCamera.Constants.Type.back);
  const [loading, setloading] = useState(false);
  const [exposure, setExposerLevel] = useState(0.5);
  const [zoomLevel, setZoomLevel] = useState(0);
  const [isOcr, setOcrMode] = useState(false);
  const [isDocMode, setDocumentScanner] = useState(true);
  const [ratio, setRatio] = useState();
  const [imageSource, setSource] = useState();
  const [whiteBalance, setWhiteBal] = useState(
    RNCamera.Constants.WhiteBalance.auto,
  );
  const [capuring, setCapturing] = useState(false);
  const borderBottomColorOcr = isOcr ? 'white' : 'transparent';
  const borderBottomColorDocMode = isDocMode ? 'white' : 'transparent';
  // Local path to file on the device
  let CameraRef = useRef(null);

  const OcrText = async (localPath) => {
    setloading(true);
    const processed = await vision().textRecognizerProcessImage(localPath);
    let textIsFound;
    processed.blocks.forEach((block) => {
      // console.log('Found block with text: ', block.text);
      // console.log('Confidence in block: ', block.confidence);
      if (block.text) {
        textIsFound = true;
      } else {
        textIsFound = false;
      }
      //console.log('Languages found in block: ', block.recognizedLanguages);
    });
    if (!textIsFound) {
      ToastAndroid.showWithGravityAndOffset(
        'Text Not Found',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else {
      ToastAndroid.showWithGravityAndOffset(
        'Text Found',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
    return processed.text;
  };
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
    if (isOcr) {
      const options = {quality: 0.5, base64: true};
      const data = await CameraRef.current.takePictureAsync(options);
      OcrText(data.uri).then((data) => {
        setloading(false);
        navigation.navigate('OCR TEXT', {
          text: data,
        });
      });
    } else {
      try {
        setCapturing(true);
        const options = {quality: 1, base64: true};
        const data = await CameraRef.current.takePictureAsync(options);
        setSource(data.uri);
        CameraRoll.save(data.uri, {type: 'photo', album: 'InScan'})
          .then(() => {
            setCapturing(false);
            setloading(false);
            showToastWithGravityAndOffset();
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (e) {
        console.log(e);
      }
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

  const ToggleDocumentScanner = () => {
    if (isOcr) {
      setOcrMode(false);
    }
    setDocumentScanner(true);
  };
  const ToggleCopyText = () => {
    if (isDocMode) {
      setDocumentScanner(false);
    }
    setOcrMode(true);
  };

  const prepareRatio = async () => {
    if (Platform.OS === 'android' && Cam) {
      const ratios = await Cam.getSupportedRatiosAsync();
      const ratio =
        ratios.find((ratio) => ratio === DESIRED_RATIO) ||
        ratios[ratios.length - 1];

      setRatio(ratio);
    }
  };

  const CaptureBlink = () => {
    return (
      <Animatable.View
        animation="flash"
        iterationCount={2}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#303030',
          borderRadius: 60,
          opacity: 0.6,
        }}>
        <Text style={{fontSize: 20, color: 'white'}}>Capturing...</Text>
      </Animatable.View>
    );
  };
  const FetchingTextView = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#303030',
        }}>
        <ActivityIndicator size="large" color="red" />
        <Animatable.Text
          animation="swing"
          iterationCount="infinite"
          style={{fontSize: 20, color: 'white'}}>
          Hold on we're fetchig text...
        </Animatable.Text>
      </View>
    );
  };
  return (
    <View style={{...styles.container}}>
      <StatusBar hidden />
      {loading ? (
        <FetchingTextView />
      ) : (
        <RNCamera
          onCameraReady={prepareRatio}
          ratio={ratio}
          captureAudio={false}
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
          }}>
          {({camera, status}) => {
            if (status !== 'READY') return <PendingView />;
            else
              return (
                <View
                  style={{
                    justifyContent: 'space-between',
                  }}>
                  {capuring ? <CaptureBlink /> : null}
                  <FabButton navigation={navigation} />
                  <View>
                    <AboveNavBarView
                      ToggleDocumentScanner={ToggleDocumentScanner}
                      ToggleCopyText={ToggleCopyText}
                      borderBottomColorDocMode={borderBottomColorDocMode}
                      borderBottomColorOcr={borderBottomColorOcr}
                    />
                    <ButtomNavigationView
                      navigation={navigation}
                      takePicture={takePicture}
                      toggleFlash={toggleFlash}
                      openImagePicker={openImagePicker}
                      flash={flash}
                      imageSource={imageSource}
                      RNCamera={RNCamera}
                    />
                  </View>
                </View>
              );
          }}
        </RNCamera>
      )}
    </View>
  );
}
