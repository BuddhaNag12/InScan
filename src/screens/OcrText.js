import React from 'react';
import {
  Text,
  ToastAndroid,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Divider} from 'react-native-elements';
import Clipboard from '@react-native-community/clipboard';
import CameraRoll from '@react-native-community/cameraroll';
import {captureRef} from 'react-native-view-shot';
import ViewShot from 'react-native-view-shot';

const OcrText = ({route, navigation}) => {
  const {text} = route.params;
  const ViewRef = React.useRef();

  const copyToClipboard = () => {
    Clipboard.setString(text);
    showToastWithGravityAndOffset();
  };

  const ScreenShot = () => {
    captureRef(ViewRef, {
      format: 'jpg',
      quality: 0.8,
    })
      .then((uri) => {
        CameraRoll.save(uri, {type: 'photo', album: 'InScan_shots'}).then(
          () => {
            ToastAndroid.showWithGravityAndOffset(
              'Captured',
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
              25,
              50,
            );
            navigation.navigate('Preview', {
              imgPath: uri,
            });
          },
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Copied',
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
      25,
      50,
    );
  };

  return (
    <View
      style={{
        flex: 1,
        width: Dimensions.get('window').width,
        backgroundColor: '#303030',
        padding: 2,
      }}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            fontFamily: 'Roboto',
            fontSize: 20,
            color: 'white',
            textTransform: 'uppercase',
            textAlign: 'center',
          }}>
          Click hold to copy text
        </Text>
        <Divider
          style={{
            backgroundColor: '#FF7772',
            width: 100,
            height: 2,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 5,
        }}>
        <TouchableOpacity
          onPress={() => copyToClipboard()}
          style={{
            height: 20,
            width: 50,
            borderBottomWidth: 2,
            borderBottomColor: '#FF7772',
          }}>
          <Text
            style={{textAlign: 'center', fontFamily: 'Roboto', color: 'white'}}>
            Copy All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => ScreenShot()}
          style={{
            height: 20,
            width: 60,
            borderBottomWidth: 2,
            borderBottomColor: '#FF7772',
          }}>
          <Text
            style={{textAlign: 'center', fontFamily: 'Roboto', color: 'white'}}>
            ScreenShot
          </Text>
        </TouchableOpacity>
      </View>
      <ViewShot ref={ViewRef} options={{format: 'jpg', quality: 1}}>
        <TextInput
        scrollEnabled={true}
          style={{
            fontSize: 20,
            lineHeight: 40,
            fontFamily: 'Roboto',
            color: 'white',
            padding: 10,
          }}
          value={text}
          multiline={true}
          editable={true}
          showSoftInputOnFocus={false}
          caretHidden={true}
          selectionColor="#FF7772"
        />
      </ViewShot>
    </View>
  );
};

export default OcrText;
