import React from 'react';
import {Icon} from 'react-native-elements';
import {View, StyleSheet, Image, Text,PermissionsAndroid} from 'react-native';
import MyHeader from '../../components/header/Header';
import * as Animatable from 'react-native-animatable';

const image = require('../../../assets/phone.png');
const h1 = 30;
const h3 = 20;

export default function Dashboard({navigation}) {

  React.useEffect(()=>{
    hasAndroidPermission();
  },[])

  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  return (
    <View style={styles.container}>
      <MyHeader navigation={navigation} />
      <Animatable.View
        animation="fadeInRight"
        duration={500}
        easing={'ease-in'}
        delay={600}>
        <Text style={styles.heading}>Welcome to InScan</Text>
      </Animatable.View>
      <Animatable.Text
        style={{...styles.headingTwo, fontSize: h3}}
        animation="fadeInRight"
        duration={500}
        delay={1500}>
        A cool way to scan images
      </Animatable.Text>
      <Animatable.View
        animation="fadeIn"
        duration={500}
        easing={'ease-in'}
        delay={1500}
        style={styles.image}>
        <Image source={image}></Image>
      </Animatable.View>

      <Animatable.View
        animation="fadeInUp"
        duration={500}
        easing={'ease-in'}
        delay={1600}
        style={styles.FabButton}>
        <Icon
          raised
          type="font-awesome"
          name="camera"
          size={25}
          color="black"
          onPress={() => navigation.navigate('Camera')}
        />
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE4DE',
  },
  topSection: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    alignSelf: 'center',
  },

  heading: {
    padding: 3,
    color: 'black',
    fontSize: h1,
    fontWeight: 'normal',
    fontFamily: 'Roboto_medium',
    textAlign: 'center',
  },
  headingTwo: {
    textAlign: 'center',
    color: 'grey',
    fontWeight: 'normal',
    fontFamily: 'Ionicons',
  },

  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    resizeMode: 'contain',
  },
  FabButton: {
    zIndex: 100,
    borderRadius: 30,
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
});
