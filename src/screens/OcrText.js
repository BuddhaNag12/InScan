import React from 'react';
import {Text, ScrollView, ToastAndroid, View, TextInput} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import {Divider} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';

const OcrText = ({route}) => {
  const {text} = route.params;

  const copyToClipboard = () => {
    Clipboard.setString(text);
    showToastWithGravityAndOffset();
  };

  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Copied',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}>
      <Text style={{fontFamily: 'Roboto', fontSize: 20}}>
        Click to copy text
      </Text>
      <Divider style={{backgroundColor: 'red', width: 100, height: 1}} />
      <TouchableOpacity onPress={() => copyToClipboard()}>
        <ScrollView>
          <Text style={{fontFamily: 'Roboto', fontSize: 20}}>{text}</Text>
        </ScrollView>
      </TouchableOpacity>
    </View>
  );
};

export default OcrText;
