import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import MyHeader from '../../components/header/Header';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    padding: 2,
  },
  backgroundImage: {
    resizeMode: 'cover',
    height: 400,
    width: width,
    right: 0,
  },
  headingText: {
    justifyContent: 'center',
    marginVertical: 4,
    elevation: 1,
    backgroundColor: '#FF8066',
    borderRadius: 20,
    padding: 2,
  },

  info: {
    textAlign: "left",
    fontFamily: 'Roboto',
    fontSize: 18,
    textTransform: 'capitalize',
    color: 'black',
    letterSpacing: 0.4,
  },
  helpArea: {
    marginVertical: 4,
  },
  h2: {
    textTransform: 'capitalize',
    textAlign: 'left',
    fontFamily: 'Roboto',
    fontSize: 20,
    color: '#fefefe',
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
});
const Images = require('../../../assets/help.png');

const HeadingImg = () => {
  return (
    <View >
      <Image
        source={Images}
        style={{
          ...styles.backgroundImage,
        }}
      />
    </View>
  );
};

const ContextView = () => {
  return (
    <View>
      <View style={{...styles.headingText}}>
        <Text style={{...styles.h2}}>Steps:</Text>
      </View>
      <View style={{...styles.helpArea}}>
        <Text style={{...styles.info}}> * Open Camera click photo</Text>
        <Text style={{...styles.info}}> * Navigate to Gallery</Text>
        <Text style={{...styles.info}}>
          {' '}
          * Edit images into proper document size
        </Text>
        <Text style={{...styles.info}}> * Navigate to edited images</Text>
        <Text style={{...styles.info}}>
          {' '}
          * Click on convert pdf to convert pdf
        </Text>
        <View style={{...styles.headingText}}>
          <Text style={{...styles.h2}}>multiple image into pdf : </Text>
        </View>
        <Text style={{...styles.info}}> * Navigate to Edited Images</Text>
        <Text style={{...styles.info}}>
          {' '}
          * click on each images to convert multiple images
        </Text>
        <Text style={{...styles.info}}> * click pdf icon</Text>
        <Text style={{...styles.info}}> * to reset click reset button</Text>
        <View style={{...styles.headingText}}>
          <Text style={{...styles.h2}}>Documents section </Text>
        </View>
        <Text style={{...styles.info}}> * navigation document section</Text>
        <Text style={{...styles.info}}>
          {' '}
          * click on perticular pdf file to view the pdf{' '}
        </Text>
        <Text style={{...styles.info}}>
          {' '}
          * hold perticular pdf file to delete the pdf
        </Text>
      </View>
    </View>
  );
};

export default function HelpScreen({navigation}) {
  return (
    <ScrollView>
      <MyHeader navigation={navigation} />
      <View style={{...styles.container}}>
        <HeadingImg />
        <View style={{...styles.content}}>
          <ContextView />
        </View>
      </View>
    </ScrollView>
  );
}
