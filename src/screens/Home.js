import React from 'react';
import {Button, Header} from 'react-native-elements';
import {
  SafeAreaView,
  View,
  StatusBar,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const image = require('../../assets/home2.png');

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function Home({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FF7772" barStyle="light-content" />
      <Header
        containerStyle={{
          borderBottomColor: 'transparent',
          elevation: 5,
          backgroundColor: '#F46049',
          opacity: 1,
        }}
        centerComponent={
          <Icon style={{padding: 5}} name="home" size={20} color="white" />
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
            backgroundColor: '#FF8001',
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
  text: {
    fontFamily: 'FontAwesome',
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  image: {
    flex: 1,
    width: windowWidth,
    resizeMode: 'cover',
    height: windowHeight - 50 * 1,
    transform: [{scale: 0.7}, {translateY: 5}, {translateX: -15}],
  },
  ActionCard: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
