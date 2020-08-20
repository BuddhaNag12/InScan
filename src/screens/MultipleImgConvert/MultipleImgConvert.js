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
} from 'react-native';
import {Image, Text, Icon, Button} from 'react-native-elements';
import CameraRoll from '@react-native-community/cameraroll';
import RNImageToPdf from 'react-native-image-to-pdf';
const height = Dimensions.get('screen').height;
import * as Animatable from 'react-native-animatable';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 3,
  },
});
let opacity = 1;
const ImageGrid = ({navigation}) => {
  const [photos, setPhotos] = React.useState([]);
  const [imgUri, selectedImageUri] = React.useState([]);
  const [sel, setSel] = React.useState(false);
  const [selUris, setSelUris] = React.useState({});
  const [loading, setLoading] = React.useState(false);

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
  //todo delete image selected
  const reset = () => {
    selectedImageUri([]);
    setSel(false);
    //setSelIdx([]);
  };
  const convertMultipleImage = async () => {
    setLoading(true);
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

  const selectedImage = (uri) => {
    setSel(true);
    selectedImageUri((imgUri) => [...imgUri, uri]);
  };

  // TOdo deselect image
  const DeSelectImage = (index) => {
    // setSel(true);
    // selectedImageUri((imgUri) => [...imgUri, uri]);
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
      <View>
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
        <FlatList
          data={photos}
          keyExtractor={(_, index) => index}
          numColumns={4}
          renderItem={({item, index}) => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
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
                    paddingHorizontal: 40,
                    paddingVertical: 45,
                  }}>
                  {imgUri.find((i) => i == item.node.image.uri) ? (
                    <TouchableOpacity style={{width: 30, height: 30}}>
                      <Icon
                        name="checkmark"
                        size={25}
                        type="ionicon"
                        color="#C34A36"
                        onPress={() => console.log('pressed')}
                      />
                    </TouchableOpacity>
                  ) : null}
                </View>
                <Image
                  source={{uri: item.node.image.uri}} // Use item to set the image source
                  key={index} // Important to set a key for list items
                  style={{
                    width: 100,
                    height: 100,
                    borderWidth: 3,
                    borderColor: 'white',
                    resizeMode: 'cover',
                    margin: 8,
                    opacity: imgUri.find((i) => i == item.node.image.uri)
                      ? 0.4
                      : 1,
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      {sel ? (
        <View style={{flex: 1}}>
          {sel ? (
            <Text style={{textAlign: 'center', fontFamily: 'Roboto'}}>
              selected Images
            </Text>
          ) : (
            <Text style={{textAlign: 'center', fontFamily: 'Roboto'}}>
              Selected image will show here...
            </Text>
          )}
          <FlatList
            data={imgUri}
            keyExtractor={(_, index) => index}
            numColumns={4}
            renderItem={({item, index}) => (
              <Animatable.View
                animation="bounceIn"
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity onPress={() => openPreview(item)}>
                  <Image
                    source={{uri: item}} // Use item to set the image source
                    key={index} // Important to set a key for list items
                    style={{
                      width: 100,
                      height: 100,
                      borderWidth: 3,
                      borderColor: 'white',
                      resizeMode: 'cover',
                      margin: 10,
                    }}
                  />
                </TouchableOpacity>
              </Animatable.View>
            )}
          />

          {sel ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 3,
                flex: 0.5,
                flexDirection: 'row',
              }}>
              <Button
                raised
                titleStyle={{fontFamily: 'Roboto', color: 'black'}}
                containerStyle={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                buttonStyle={{borderRadius: 50, backgroundColor: '#FFE4DE'}}
                title="reset selection"
                onPress={() => reset()}
              />
              <Button
                loading={loading}
                onPress={() => convertMultipleImage()}
                buttonStyle={{backgroundColor: 'transparent'}}
                loadingStyle={{padding: 20, color: 'red'}}
                icon={
                  <Icon
                    raised
                    name="document-attach-outline"
                    type="ionicon"
                    color="#FF5D5D"
                  />
                }
              />
            </View>
          ) : (
            <></>
          )}
        </View>
      ) : (
        <Text style={{textAlign: 'center', fontFamily: 'Roboto', fontSize: 20}}>
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
