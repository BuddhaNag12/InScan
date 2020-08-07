import React from 'react';
import {
  FlatList,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {Card, Image, Text, Icon, Button} from 'react-native-elements';
import CameraRoll from '@react-native-community/cameraroll';
import RNImageToPdf from 'react-native-image-to-pdf';
const height = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 3,
  },
});

const ImageGrid = ({navigation}) => {
  const [photos, setPhotos] = React.useState([]);
  const [imgUri, selectedImageUri] = React.useState([]);
  const [sel, setSel] = React.useState(false);
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
// const deleteSeleted=(index)=>{
//   selectedImageUri((prev)=>[prev.splice(1,index)])
// }
  const convertSinglePdf = async () => {
    const NewImgPath=imgUri.map((i)=>i.substr(7))
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
        navigation.navigate('Document', {
          pdfUri: pdf.filePath,
        });
      });
      // ToastAndroid.show("PDF saved at location "+pdf.filePath, ToastAndroid.LONG);
      // console.log(pdf.filePath);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    if (Platform.OS === 'android' && !hasAndroidPermission()) {
      return;
    }

    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
      groupTypes: 'Album',
      groupName: 'Inscan_edit',
    })
      .then((r) => {
        setPhotos(r.edges);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const selectedImage = (uri) => {
    setSel(true);
    selectedImageUri((imgUri) => [...imgUri, uri]);
    console.log('setimgUri==>', imgUri);
  };

  return (
    <View style={{...styles.container}}>
      <View>
        <FlatList
          data={photos}
          keyExtractor={(_, index) => index}
          numColumns={4}
          renderItem={({item, index}) => (
            <View style={{flex: 1}}>
              <TouchableOpacity
                onPress={() => openPreview(item.node.image.uri)}
                onLongPress={() => selectedImage(item.node.image.uri, index)}>
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
            </View>
          )}
        />
      </View>
      {imgUri ? 
            <View style={{flex:1}}>
            {sel?  <Text style={{textAlign:"center",fontFamily:"Roboto"}}>selected Images</Text> :
            <Text style={{textAlign:"center",fontFamily:"Roboto"}}>Selected image will show here...</Text>
             }
              <FlatList
                data={imgUri}
                keyExtractor={(_, index) => index}
                numColumns={4}
                renderItem={({item, index}) => (
                  <View style={{flex: 1}}>
                      <Image
                        source={{uri:item}} // Use item to set the image source
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
                      <Icon 
                       name="trash-outline"
                       type="ionicon"
                      size={30}
                      onPress={()=>deleteSeleted(index)}
                      />
                  </View>
                )}
              />
             {sel?  <Button title="Pdf" onPress={()=>convertSinglePdf()} /> : <></> }
            </View>
          :<></>
          }
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
