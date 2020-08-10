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
const image = require('../../assets/back.png');

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
      <View style={{justifyContent: 'flex-end', alignItems: 'center', flex: 1}}>
        <Button
          title="Sign In"
          titleStyle={{
            color: 'white',
            fontFamily: 'Roboto',
            fontWeight: '200',
          }}
          buttonStyle={{
            backgroundColor:"rgba(200,100,0,0.7)",
            width: 200,
            borderRadius: 30,
            height: 50,
            shadowRadius: 20,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          icon={<Icon style={{padding: 5}} name="lock" size={20} color="white" />}
          onPress={() => navigation.navigate('Sign In')}
        />
        <View style={{height: 2}}></View>
        <Button
          title="Sign Up"
          type="clear"
          onPress={() => navigation.navigate('Sign Up')}
          titleStyle={{
            color: 'black',
            fontFamily: 'Roboto',
            fontWeight: '200',
          }}
          buttonStyle={{
            backgroundColor: '#FFF4F0',
            opacity: 0.8,
            borderRadius: 30,
            width: 200,
            height: 50,
            elevation: 2,
          }}
          icon={<Icon style={{padding: 5}} name="user" size={20} color="red" />}
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
    resizeMode: 'contain',
    height: windowHeight - 50 * 1.2,
    transform: [{translateY: -20}],
  },
  ActionCard: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
