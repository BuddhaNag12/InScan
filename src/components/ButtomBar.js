import React from 'react';
import {TouchableOpacity, StyleSheet, Dimensions,View} from 'react-native';
import {Text, Icon} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  BottomText: {
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 15,
  },
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#DFE0DF',
    width: width,
    height: 100,
  },
});

const BottomBar = ({
  convertMultipleImage,
  reset,
  deletePhoto,
  sharePhotos,
  ocrScan,
}) => {
  return (
    <Animatable.View
      animation="fadeInUp"
      easing="ease-in"
      duration={600}
      style={{
        ...styles.container,
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
        <View>
          <Icon raised name="trash-outline" type="ionicon" color="#FF5D5D" />
          <Text style={styles.BottomText}>Delete</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => sharePhotos()}>
        <View>
        <Icon
          raised
          name="share-social-outline"
          type="ionicon"
          color="#FF5D5D"
        />
        <Text style={styles.BottomText}>Share</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log('todo')}>
        <View>
        <Icon raised name="text-outline" type="ionicon" color="#FF5D5D" />
        <Text style={styles.BottomText}>Extract Text</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => reset()}>
       <View>
       <Icon
          raised
          name="remove-circle-outline"
          type="ionicon"
          color="#FF5D5D"
        />
        <Text style={styles.BottomText}>Reset</Text>
       </View>
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default BottomBar;
