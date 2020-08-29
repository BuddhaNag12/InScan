import React from 'react';
import {TouchableOpacity,View} from 'react-native';
import {Icon} from 'react-native-elements';
import styles from '../../screens/Camera/cameraStyles';


const FabButton = ({navigation}) => (
  <View style={styles.FabButton}>
    <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
      <Icon name="home-outline" type="ionicon" size={30} color="white" />
    </TouchableOpacity>
  </View>
);

export default FabButton;
