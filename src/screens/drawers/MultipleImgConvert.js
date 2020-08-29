import React from 'react';
import {
  View,
  PermissionsAndroid,
  Platform,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import BottomBar from '../../components/ButtomBar';
import ListView from '../../components/ListViewEditedImages';
import vision from '@react-native-firebase/ml-vision';
import {Text, Button, Overlay} from 'react-native-elements';
import CameraRoll from '@react-native-community/cameraroll';
import RNImageToPdf from 'react-native-image-to-pdf';
import Share from 'react-native-share';
import MyHeader from '../../components/header/Header';

const {height, width} = Dimensions.get('window');
import * as Animatable from 'react-native-animatable';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const ImageGrid = ({navigation}) => {
  const [photos, setPhotos] = React.useState([]);
  const [imgUri, selectedImageUri] = React.useState([]);
  const [sel, setSel] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [OcrLoading, setOcrLoading] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleButtonPress();
    });

    return unsubscribe;
  }, [navigation]);

  async function handleButtonPress() {
    setLoading(true);

    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }

    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
      groupTypes: 'Album',
      groupName: 'InScan_edit',
    })
      .then((r) => {
        setLoading(false);
        setPhotos(r.edges);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }

  const ocrScan = async (localPath) => {
    setOcrLoading(true);
    const processed = await vision().textRecognizerProcessImage(localPath);
    let textIsFound;
    processed.blocks.forEach((block) => {
      // console.log('Found block with text: ', block.text);
      // console.log('Confidence in block: ', block.confidence);
      if (block.text) {
        textIsFound = true;
        navigation.navigate('OCR TEXT', {
          text: processed.text,
        });
      } else {
        textIsFound = false;
      }
      //console.log('Languages found in block: ', block.recognizedLanguages);
    });
    if (!textIsFound) {
      setOcrLoading(false);
      ToastAndroid.showWithGravityAndOffset(
        'Text Not Found',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else {
      setOcrLoading(false);
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

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const openPreview = (imgPath) => {
    navigation.navigate('Preview', {
      imgPath: imgPath,
    });
  };

  const SharePhotos = () => {
    const shareOptions = {
      title: 'Share via',
      // url: `file://${PdfUri}`,
      message: 'Shared Via InScanner',
      urls: imgUri,
    };
    Share.open(shareOptions)
      .then(() => {
        ToastAndroid.showWithGravityAndOffset(
          'Files shared...',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      })
      .catch(() => {
        ToastAndroid.showWithGravityAndOffset(
          'Cancelled ',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      });
  };

  // delete image selected
  const deletePhoto = async () => {
    setLoading(true);
    CameraRoll.deletePhotos(imgUri)
      .then(() => {
        setVisible(false);
        ToastAndroid.showWithGravityAndOffset(
          'Deleted',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
        CameraRoll.getPhotos({
          first: 20,
          assetType: 'Photos',
          groupTypes: 'Album',
          groupName: 'InScan_edit',
        })
          .then((r) => {
            reset();
            setLoading(false);
            setPhotos(r.edges);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((e) => {
        if (e == 'Error: Could not delete all media, only deleted 0 photos.') {
          ToastAndroid.showWithGravityAndOffset(
            'Wait before deleting...',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        }
      });
  };
  // Reset EveryThing to normal state
  const reset = () => {
    selectedImageUri([]);
    setSel(false);
    //setSelIdx([]);
  };
  // converting multiple images
  const convertMultipleImage = async () => {
    setLoading(true);
    // mapping through all the selected images and removing the first 7th position string
    // assigning to the variable NewImgPath
    const NewImgPath = imgUri.map((i) => i.substr(7));
    try {
      const options = {
        imagePaths: NewImgPath,
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
        setLoading(false);
        reset();
        ToastAndroid.show(
          'PDF saved at location ' + pdf.filePath,
          ToastAndroid.LONG,
        );
        navigation.navigate('Document', {
          pdfUri: pdf.filePath,
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  // set seleted image
  const selectedImage = (uri) => {
    setSel(true);
    selectedImageUri((imgUri) => [...imgUri, uri]);
  };

  //  deselect image
  const DeSelectImage = (img) => {
    selectedImageUri((prev) => prev.filter((i) => i !== img));
  };
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }
  if (OcrLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="red" />
        <Animatable.Text
          animation="swing"
          iterationCount="infinite"
          style={{fontSize: 20, color: 'black'}}>
          Hold on we're fetchig text...
        </Animatable.Text>
      </View>
    );
  }
  const OverlayView = () => {
    return (
      <Overlay
        animationType="fade"
        isVisible={visible}
        onBackdropPress={toggleOverlay}>
        <View style={{height: 60, width: 200, alignItems: 'center'}}>
          <Text style={{color: 'black', fontFamily: 'Roboto'}}>
            Are you sure u want to Delete ?
          </Text>
          <View style={{padding: 10}}>
            <Button
              raised
              buttonStyle={{
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: 'red',
              }}
              titleStyle={{color: 'red', fontFamily: 'Roboto'}}
              title="Delete"
              onPress={() => deletePhoto()}
            />
          </View>
        </View>
      </Overlay>
    );
  };
  return (
    <View style={{...styles.container}}>
      <MyHeader navigation={navigation} />
      <OverlayView />
      {photos.length > 0 ? (
        <View style={{paddingRight: 10}}>
          {sel ? (
            <Animatable.Text
              animation="fadeInRight"
              style={{textAlign: 'center', fontFamily: 'Roboto'}}>
              Multiple Image select clink on photos to select each of them
            </Animatable.Text>
          ) : (
            <Animatable.Text
              animation="fadeInRight"
              style={{textAlign: 'center', fontFamily: 'Roboto'}}>
              Hold on or click any photo to enable multiple selection
            </Animatable.Text>
          )}
        </View>
      ) : (
        <Text style={{textAlign: 'center', fontFamily: 'Roboto'}}>
          No Images
        </Text>
      )}
      <View
        style={{
          flex: 1,
          height: height / 2 + 100,
          width: width > height ? height : width,
        }}>
        <ListView
          photos={photos}
          selectedImage={selectedImage}
          DeSelectImage={DeSelectImage}
          imgUri={imgUri}
          openPreview={openPreview}
          ocrScan={ocrScan}
        />
      </View>
      {imgUri.length ? (
        <View
          style={{
            paddingRight: 10,
            justifyContent: 'flex-end',
            width: width > height ? height : width,
          }}>
          {imgUri.length ? (
            <BottomBar
              convertMultipleImage={convertMultipleImage}
              reset={reset}
              loading={loading}
              deletePhoto={toggleOverlay}
              sharePhotos={SharePhotos}
              ocrScan={ocrScan}
            />
          ) : (
            <></>
          )}
        </View>
      ) : (
        <Text style={{textAlign: 'center', fontFamily: 'Roboto', fontSize: 15}}>
          No image selected
        </Text>
      )}
    </View>
  );
};

export default class MultipleImgConvert extends React.Component {
  render() {
    return (
      <View style={{...styles.container}}>
        <ImageGrid navigation={this.props.navigation} />
      </View>
    );
  }
}
