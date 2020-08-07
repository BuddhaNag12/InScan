import React from 'react';
import {
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  Dimensions,
} from 'react-native';
import {Card, Image, Text, Icon, Button} from 'react-native-elements';
import CameraRoll from '@react-native-community/cameraroll';
import RNImageToPdf from 'react-native-image-to-pdf';
const height = Dimensions.get('screen').height;

export default class EditedPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      EditedPhotos: [],
    };
  }

  async hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  componentDidMount() {
    if (Platform.OS === 'android' && !this.hasAndroidPermission()) {
      return;
    }

    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
      groupTypes: 'Album',
      groupName: 'Inscan_edit',
    })
      .then((r) => {
        this.setState({EditedPhotos: r.edges});
      })
      .catch((err) => {
        console.log(err);
      });
  }

  openPreview = (imgPath) => {
    this.props.navigation.push('Preview', {
      imgPath: imgPath,
    });
  };

  convertSinglePdf = async (imgPath) => {
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
        this.props.navigation.navigate('Document', {
          pdfUri: pdf.filePath,
        });
      });
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    return (
      <View>
        <Text
          style={{textAlign: 'center', fontFamily: 'Ionicons', fontSize: 20}}>
          Images from InScan library
        </Text>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{textAlign: 'center', fontFamily: 'Roboto'}}>
            Convert Multiple image click here
          </Text>
          <Button
            title="Multiple image convert"
            onPress={() => this.props.navigation.navigate('Convert')}
            containerStyle={{borderRadius: 30}}
            buttonStyle={{backgroundColor: 'red'}}
          />
        </View>
        <ScrollView horizontal>
          {this.state.EditedPhotos ? (
            this.state.EditedPhotos.map((p, i) => {
              //console.log(this.state.EditedPhotos);
              return (
                <Card
                  containerStyle={{borderRadius: 30, height: height - 180}}
                  key={i}>
                  <TouchableOpacity
                    onPress={() => this.openPreview(p.node.image.uri)}>
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
                      onPress={() => this.convertSinglePdf(p.node.image.uri)}
                      name="document-attach-outline"
                      type="ionicon"
                      color="#FF5D5D"
                    />
                    <Icon
                      raised
                      onPress={() => console.log('Todo')}
                      name="pencil"
                      type="ionicon"
                      color="#574240"
                    />
                    <Icon
                      raised
                      onPress={() => console.log('Todo')}
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
              <Text>No Images Found</Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}
