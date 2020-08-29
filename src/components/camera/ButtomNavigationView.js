import React from 'react';
import {
    View,
    Image,
    TouchableOpacity,
  } from 'react-native';
  import {Icon} from 'react-native-elements';
  import styles from '../../screens/Camera/cameraStyles';

const ButtomNavigationView = ({
    navigation,
    takePicture,
    toggleFlash,
    openImagePicker,
    flash,
    imageSource,
    RNCamera
  }) => {
    return (
      <View
        style={{
          ...styles.buttomNavigationView,
        }}>
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
          name="camera-outline"
          type="ionicon"
          size={40}
          color="white"
          onPress={() => takePicture()}
        />
        <Icon
          name="image-outline"
          type="ionicon"
          size={40}
          color="white"
          onPress={() => openImagePicker()}
        />
        {imageSource ? (
          <TouchableOpacity onPress={() => navigation.navigate('Gallery')}>
            <Image
              source={{
                uri: imageSource,
              }}
              style={{width: 40, height: 40}}
            />
          </TouchableOpacity>
        ) : (
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor: 'rgba(0,0,0,0.8)',
            }}></View>
        )}
      </View>
    );
  };

  export default ButtomNavigationView;