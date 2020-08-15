import React from 'react';
import {
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import {Card, Image, Text, Icon, Button} from 'react-native-elements';
import MyHeader from '../../components/header/Header';
import CameraRoll from '@react-native-community/cameraroll';
import RNImageToPdf from 'react-native-image-to-pdf';
import vision from '@react-native-firebase/ml-vision';
const height = Dimensions.get('screen').height;

export default function EditedPhotos({navigation}) {
  const [EditedPhotos, setEditedPhotos] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [Buttonloading, setLoadingBtn] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleButtonPress();
    });

    return unsubscribe;
  }, [navigation]);

  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }
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
        setEditedPhotos(r.edges);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }

  const OcrText = async (localPath) => {
    setLoadingBtn(true);
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
          groupName: 'InScan_edit',
        })
          .then((r) => {
            setEditedPhotos(r.edges);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((e) => {
        if (e == 'Error: Could not delete all media, only deleted 0 photos.') {
          ToastAndroid.showWithGravityAndOffset(
            'Deleted Every photos',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        }
      });
  };
  const openPreview = (imgPath) => {
    navigation.push('Preview', {
      imgPath: imgPath,
    });
  };

  const convertSinglePdf = async (imgPath) => {
    setLoading(true);
    const NewimgPath = imgPath.substr(7);
    try {
      // convert image to pdf
      const options = {
        imagePaths: [NewimgPath],
        name: `Inscan_${Date.now().toString()}.pdf`,
        maxSize: {
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
        navigation.navigate('Document', {
          pdfUri: pdf.filePath,
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <MyHeader navigation={navigation} />
      <Text style={{textAlign: 'center', fontFamily: 'Roboto', fontSize: 20}}>
        Images from InScan library
      </Text>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{textAlign: 'center', fontFamily: 'Roboto'}}>
          Convert Multiple image click here
        </Text>

        <Button
          titleStyle={{fontFamily: 'Roboto', color: '#564147'}}
          containerStyle={{justifyContent: 'center', alignItems: 'center'}}
          buttonStyle={{borderRadius: 50, backgroundColor: '#FFE4DE'}}
          title="Multiple image convert"
          onPress={() => navigation.navigate('Convert')}
        />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {EditedPhotos.length > 0 ? (
          EditedPhotos.map((p, i) => {
            return (
              <Card
                containerStyle={{borderRadius: 30, height: height - 180}}
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
                    backgroundColor: '#CF9EAC',
                    borderRadius: 30,
                    marginTop: 5,
                    alignItems: 'center',
                  }}>
                  <Icon
                    raised
                    onPress={() => convertSinglePdf(p.node.image.uri)}
                    name="document-attach-outline"
                    type="ionicon"
                    color="#FF5D5D"
                  />
                  <Button
                    loading={Buttonloading}
                    onPress={() =>
                      OcrText(p.node.image.uri).then((data) => {
                        setLoadingBtn(false);
                        navigation.navigate('OCR TEXT', {
                          text: data,
                        });
                      })
                    }
                    buttonStyle={{backgroundColor: '#CF9EAC'}}
                    loadingStyle={{padding: 20, color: 'red'}}
                    icon={
                      <Icon
                        raised
                        name="pencil"
                        type="ionicon"
                        color="#574240"
                      />
                    }
                  />
                  <Icon
                    raised
                    onPress={() => deletePhoto(p.node.image.uri)}
                    name="trash-outline"
                    type="ionicon"
                    color="#574240"
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    paddingLeft: 5,
                  }}>
                  <Text style={{textAlign: 'center', fontFamily: 'Roboto'}}>
                    Pdf
                  </Text>
                  <Text style={{textAlign: 'center', fontFamily: 'Roboto'}}>
                    Copy text
                  </Text>
                  <Text style={{textAlign: 'center', fontFamily: 'Roboto'}}>
                    Delete
                  </Text>
                </View>
              </Card>
            );
          })
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{textAlign: 'center', fontFamily: 'Roboto', fontSize: 20}}>
              No Images Found
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
