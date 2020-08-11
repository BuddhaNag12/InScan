import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  ScrollView,
  Linking,
} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';

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
    resizeMode: 'contain',
    height: height - 300,
    width: width,
    right: 2,
  },
  headingWrapper: {
    marginVertical: 4,
    height: 40,
    width: width / 2,
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
    textAlign: 'center',
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
    height: height/6,
  },
  summeryWrap: {
    flex: 1,
  },
  summeryText: {
    textTransform: 'capitalize',
    textAlign: 'left',
    fontFamily: 'Roboto',
    fontWeight: '100',
    fontSize: 18,
    color: 'black',
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  rowArea: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffee',
    width: width / 2 + 40,
    elevation: 3,
    borderRadius: 30,
  },
});
const Images = require('../../../assets/about.png');
export default function AboutScreen({navigation}) {
  return (
    <ScrollView>
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
          <View style={{...styles.headingWrapper}}>
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
          <View style={{...styles.summeryWrap}}>
            <Text style={{...styles.h1}}>Quick Summary :</Text>
            <View style={{...styles.summery}}>
              <Text style={{...styles.summeryText}}>
                Hi...! I'm a full stack web developer and software developer{' '}
              </Text>
              <Text style={{...styles.summeryText}}>
                working on simultaneous projects on react native and vuejs
              </Text>
              <Text style={{...styles.summeryText}}>
                Working under Krypto developers pvt ltd.
              </Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text
                style={{
                  ...styles.h1,
                }}>
                Contact details:
              </Text>
              <Text style={{...styles.summeryText}}>Email me at:</Text>
              <View
                style={{
                  ...styles.rowArea,
                }}>
                <Icon
                  name="paper-plane"
                  type="font-awesome-5"
                  color="#517fa4"
                  size={15}
                />
                <Text
                  style={{
                    ...styles.summeryText,
                  }}
                  onPress={() =>
                    Linking.openURL(`mailto:rahulnag514@gmail.com`)
                  }>
                  Email : rahulnag514@gmail.com
                </Text>
              </View>
              <View style={{marginVertical: 4}}>
                <Text style={{...styles.summeryText}}>Fork me at github :</Text>
                <Icon
                  raised
                  name="github"
                  type="font-awesome-5"
                  size={20}
                  onPress={() =>
                    Linking.openURL(`https://github.com/BuddhaNag12`)
                  }
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
