import React from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  ScrollView,
  Linking,
} from 'react-native';
import {Avatar} from 'react-native-elements';

import MyHeader from '../../components/header/Header';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingImg: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 2,
    marginHorizontal: 2,
  },
  backgroundImage: {
    resizeMode: 'cover',
    height: height - 300,
    width: width,
    right: 2,
  },
  headingText: {
    marginVertical: 4,
    height: 40,
    width: width - 100,
    elevation: 2,
    backgroundColor: '#FF8066',
    borderRadius: 20,
    padding: 2,
  },
  h1: {
    textAlign: 'left',
    fontFamily: 'Roboto',
    fontSize: 30,
    color: 'black',
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  info: {
    textAlign: 'left',
    fontFamily: 'Roboto',
    fontSize: 20,
    textTransform: 'capitalize',
  },
  helpArea: {
    marginVertical: 4,
    height: height - 300,
    width: width - 40,
  },
  h2: {
    textTransform: 'capitalize',
    textAlign: 'left',
    fontFamily: 'Roboto',
    fontWeight: '100',
    fontSize: 20,
    color: 'black',
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  h3: {
    textAlign: 'left',
    fontFamily: 'Roboto',
    fontWeight: '100',
    fontSize: 20,
    color: 'white',
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  aboutWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    backgroundColor: 'white',
    borderRadius: 30,
    elevation: 3,
  },
  summery: {
    height: 80,
  },
});
const Images = require('../../../assets/about.png');
export default function AboutScreen({navigation}) {
  return (
    <ScrollView>
      <StatusBar backgroundColor="#dc143c" barStyle="light-content" />
      <MyHeader navigation={navigation} />
      <View style={{...styles.container}}>
        <View style={{...styles.headingImg}}>
          <ImageBackground
            source={Images}
            style={{
              ...styles.backgroundImage,
            }}
          />
        </View>
        <View style={{...styles.content}}>
          <View style={{...styles.headingText}}>
            <Text style={{...styles.h3}}>About The Developer</Text>
          </View>
          <View style={{...styles.aboutWrapper}}>
            <Avatar
              rounded
              source={{
                uri:
                  'https://scontent.fgau2-1.fna.fbcdn.net/v/t1.0-9/106093797_3105706246172854_6244516452109243435_n.jpg?_nc_cat=105&_nc_sid=09cbfe&_nc_ohc=Cm3f2moh4ZgAX8tBqRI&_nc_ht=scontent.fgau2-1.fna&oh=e1f2ff3f30c72c9649c0050e68b61a88&oe=5F572093',
              }}
            />
            <Text
              style={{...styles.h2}}
              onPress={() =>
                Linking.openURL('https://www.facebook.com/ItSBuddhaHERE/')
              }>
              Buddha Nag
            </Text>
          </View>
          <Text style={{...styles.h1}}>Summery :</Text>
          <View style={{...styles.summery}}>
            <Text style={{...styles.h2}}>
              Hi...! I'm a full stack software developer{' '}
            </Text>
            <Text style={{...styles.h2}}>
              working on simultaneous project on react native and vuejs
            </Text>
          </View>
          <Text style={{...styles.h1}}>Contact :</Text>
          <View>
            <Text style={{...styles.h2}}>Phone No. 8486436218</Text>
            <Text
              style={{
                ...styles.h2,
                backgroundColor: 'white',
                elevation: 2,
                borderRadius: 30,
              }}
              onPress={() => Linking.openURL(`mailto:rahulnag514@gmail.com`)}>
              Email : rahulnag514@gmail.com
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
