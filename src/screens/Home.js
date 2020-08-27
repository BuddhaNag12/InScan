import React from 'react';
import {Button, Header} from 'react-native-elements';
import {
  SafeAreaView,
  View,
  StatusBar,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const image = require('../../assets/home2.png');
const icon = require('../../assets/icon.png');

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function Home({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FF7772" barStyle="light-content" />
      <Header
        containerStyle={{
          borderBottomColor: 'transparent',
          elevation: 3,
          backgroundColor: '#FF7772',
        }}
        centerComponent={
          // <Icon style={{padding: 5}} name="home" size={20} color="white" />
          <Image source={icon} style={{width: 40, height: 40}} />
        }
      />
      <ImageBackground source={image} style={styles.image} />
      <View
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          flex: 1,
          padding: 4,
        }}>
        <Button
          raised
          title="Sign In"
          titleStyle={{
            color: 'white',
            fontFamily: 'Roboto',
            fontSize: 20,
          }}
          buttonStyle={{
            backgroundColor: '#FF7772',
            width: 200,
            borderRadius: 30,
            height: 50,
          }}
          icon={
            <Icon style={{padding: 5}} name="lock" size={20} color="white" />
          }
          onPress={() => navigation.navigate('Sign In')}
        />
        <View style={{height: 2}}></View>
        <Button
          raised
          title="Sign Up"
          titleStyle={{
            color: 'white',
            fontFamily: 'Roboto',
            fontSize: 20,
          }}
          buttonStyle={{
            backgroundColor: '#0BBD00',
            width: 200,
            borderRadius: 30,
            height: 50,
          }}
          icon={
            <Icon style={{padding: 5}} name="user" size={20} color="white" />
          }
          onPress={() => navigation.navigate('Sign Up')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: windowWidth,
    height: windowHeight - 50,
    transform: [{scale: 0.7}, {translateY: 5}, {translateX: -15}],
  },
});
