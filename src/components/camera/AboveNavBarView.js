import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import styles from '../../screens/Camera/cameraStyles';

const AboveNavBarView = ({
  ToggleDocumentScanner,
  ToggleCopyText,
  borderBottomColorOcr,
  borderBottomColorDocMode,
}) => {
  return (
    <View
      style={{
        ...styles.aboveButtomNavigationView,
      }}>
      <TouchableOpacity
        style={{
          borderBottomColor: borderBottomColorOcr,
          borderBottomWidth: 2,
        }}
        onPress={() => ToggleCopyText()}>
        <Text style={{fontFamily: 'Roboto'}}>OCR SCAN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          borderBottomColor: borderBottomColorDocMode,
          borderBottomWidth: 2,
        }}
        onPress={() => ToggleDocumentScanner()}>
        <Text style={{fontFamily: 'Roboto'}}>Document Capture</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AboveNavBarView;
