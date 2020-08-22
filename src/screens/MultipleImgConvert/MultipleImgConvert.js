import React from 'react';
import {
  FlatList,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Platform,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import {Image, Text, Icon} from 'react-native-elements';
import CameraRoll from '@react-native-community/cameraroll';
import RNImageToPdf from 'react-native-image-to-pdf';
import Share from 'react-native-share';

const {height, width} = Dimensions.get('window');
import * as Animatable from 'react-native-animatable';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  BottomText: {
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 15,
  },
});

const ImageGrid = ({navigation}) => {
  const [photos, setPhotos] = React.useState([]);
  const [imgUri, selectedImageUri] = React.useState([]);
  const [sel, setSel] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (Platform.OS === 'android' && !hasAndroidPermission()) {
      return;
    }
    setLoading(true);
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
  }, []);

  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
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
      .then((res) => {
        ToastAndroid.showWithGravityAndOffset(
          'Files shared...',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      })
      .catch((e) => {
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
  return (
    <View style={{...styles.container}}>
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
      <View style={{flex: 1, height: height / 2 + 100, width: (width>height) ? height : width}}>
        <ListView
          photos={photos}
          selectedImage={selectedImage}
          DeSelectImage={DeSelectImage}
          imgUri={imgUri}
          openPreview={openPreview}
        />
      </View>
      {imgUri.length ? (
        <View
          style={{
            paddingRight: 10,
            justifyContent: 'flex-end',
            width: (width>height) ? height : width
          }}>
          {imgUri.length ? (
            <BottomBar
              convertMultipleImage={convertMultipleImage}
              reset={reset}
              loading={loading}
              deletePhoto={deletePhoto}
              sharePhotos={SharePhotos}
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

const ListView = ({photos, selectedImage, DeSelectImage, imgUri,openPreview}) => {
  return (
    <FlatList
      data={photos}
      keyExtractor={(_, index) => index.toString()}
      numColumns={3}
      scrollEnabled={true}
      renderItem={({item, index}) => (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <TouchableOpacity
            disabled={imgUri.find((i) =>
              i == item.node.image.uri ? true : false,
            )}
            activeOpacity={0.2}
            onPress={() => selectedImage(item.node.image.uri, index)}
            onLongPress={() => selectedImage(item.node.image.uri, index)}>
            <View
              style={{
                position: 'absolute',
                zIndex: 100,
                left:"40%",
                top:"40%"
              }}>
              {imgUri.find((i) => i == item.node.image.uri) ? (
                <TouchableOpacity style={{width: 30, height: 30}}>
                  <Icon
                    name="checkmark-outline"
                    size={28}
                    type="ionicon"
                    color="#C34A36"
                    onPress={() => DeSelectImage(item.node.image.uri)}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
            <View
              style={{
                position: 'absolute',
                zIndex: 100,
                left:"10%",
                top:"70%"
              }}>
              {imgUri.find((i) => i == item.node.image.uri) ? (
                <TouchableOpacity style={{width: 30, height: 30}}>
                  <Icon
                    name="eye-outline"
                    size={22}
                    type="ionicon"
                    color="#C34A36"
                    onPress={() => openPreview( item.node.image.uri)}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
            <Image
              source={{uri: item.node.image.uri}} // Use item to set the image source
              key={index} // Important to set a key for list items
              style={{
                width: 120,
                height: 120,
                borderWidth: 3,
                borderColor: 'white',
                resizeMode: 'cover',
                margin: 8,
                opacity: imgUri.find((i) => i == item.node.image.uri) ? 0.4 : 1,
              }}
            />
          </TouchableOpacity>
        </View>
      )}
    />
  );
};
const BottomBar = ({convertMultipleImage, reset, deletePhoto, sharePhotos}) => {
  return (
    <Animatable.View
      animation="slideInUp"
      easing="ease-in"
      duration={600}
      style={{
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#DFE0DF',
        width: width,
        height: 100,
      }}>
      <TouchableOpacity onPress={() => convertMultipleImage()}>
        <Icon
          raised
          name="document-attach-outline"
          type="ionicon"
          color="#FF5D5D"
        />
        <Text style={styles.BottomText}>Export</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deletePhoto()}>
        <Icon raised name="trash-outline" type="ionicon" color="#FF5D5D" />
        <Text style={styles.BottomText}>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => sharePhotos()}>
        <Icon
          raised
          name="share-social-outline"
          type="ionicon"
          color="#FF5D5D"
        />
        <Text style={styles.BottomText}>Share</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => reset()}>
        <Icon
          raised
          name="remove-circle-outline"
          type="ionicon"
          color="#FF5D5D"
        />
        <Text style={styles.BottomText}>Reset</Text>
      </TouchableOpacity>
    </Animatable.View>
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

// {sel ? (
//   <Text style={{textAlign: 'center', fontFamily: 'Roboto'}}>
//     selected Images
//   </Text>
// ) : (
//   <Text style={{textAlign: 'center', fontFamily: 'Roboto'}}>
//     Selected image will show here...
//   </Text>
// )}
// <FlatList
//   data={imgUri}
//   horizontal
//   keyExtractor={(_, index) => index.toString()}
//   // numColumns={4}
//   renderItem={({item, index}) => (
//     <Animatable.View
//       animation="bounceIn"
//       style={{
//         flex: 1,
//         alignItems: 'flex-start',
//         justifyContent: 'center',
//       }}>
//       <TouchableOpacity onPress={() => openPreview(item)}>
//         <Image
//           source={{uri: item}} // Use item to set the image source
//           key={index} // Important to set a key for list items
//           style={{
//             width: 100,
//             height: 100,
//             borderWidth: 3,
//             borderColor: 'white',
//             resizeMode: 'cover',
//             margin: 10,
//           }}
//         />
//       </TouchableOpacity>
//     </Animatable.View>
//   )}
// />
