import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  Linking,
} from 'react-native';
import MyHeader from '../../components/header/Header';

import {Avatar, Icon} from 'react-native-elements';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingImg: {
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 2,
    marginHorizontal: 2,
  },
  backgroundImage: {
    width: width,
    height: 400,
    right: 2,
    resizeMode: 'cover',
  },
  headingWrapper: {
    marginVertical: 4,
    height: 40,
    width: width - 100,
    elevation: 2,
    backgroundColor: '#FF8066',
    borderRadius: 20,
    padding: 2,
  },
  h1: {
    textTransform: 'capitalize',
    textAlign: 'left',
    fontFamily: 'Roboto',
    fontSize: 20,
    color: 'black',
    paddingVertical: 4,
    paddingHorizontal: 4,
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 2,
    borderRadius: 30,
  },

  summeryText: {
    textTransform: 'capitalize',
    textAlign: 'left',
    fontFamily: 'Roboto',
    fontSize: 18,
    color: 'grey',
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  rowArea: {
    paddingHorizontal: 4,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffee',
    width: width - 20,
    elevation: 3,
    borderRadius: 30,
  },
});

const imgUrl = require('../../../assets/about.png');

export default function AboutScreen({navigation}) {
  return (
    <ScrollView>
      <MyHeader navigation={navigation} />
      <View>
        <View style={{...styles.container}}>
          <ImageHeading />
          <AboutMeAvatar />
          <View style={{...styles.content}}>
            <Text style={{...styles.h1}}>Quick Summary :</Text>
            <SummeryText />
            <LicenseDetails />
            <ContactDetails />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const ImageHeading = () => {
  return (
    <View style={{...styles.headingImg}}>
      <Image
        source={imgUrl}
        style={{
          ...styles.backgroundImage,
        }}
      />
    </View>
  );
};

const AboutMeAvatar = () => {
  return (
    <View>
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
    </View>
  );
};

const SummeryText = () => {
  return (
    <View>
      <Text style={{...styles.summeryText}}>
        Hi...! I'm a full stack web developer and software developer{' '}
      </Text>
      <Text style={{...styles.summeryText}}>
        working on simultaneous projects on react native and vuejs
      </Text>
      <Text style={{...styles.summeryText}}>
        I'm very passionate and hard working guy love programing and coding all
        day...
      </Text>
      <Text style={{...styles.summeryText}}>
        I'm currently working and contributing to a private company i.e Working
        under Krypto developers pvt ltd.
      </Text>
    </View>
  );
};
const LicenseDetails = () => {
  return (
    <View style={{justifyContent: 'center'}}>
      <View>
        <Text
          style={{
            ...styles.h1,
          }}>
          Project License Details:
        </Text>
        <Text
          style={{
            fontFamily: 'Roboto',
            fontSize: 15,
            color: 'grey',
            paddingHorizontal: 4,
          }}>
          GNU_GPL 3.0
        </Text>
        <Icon
          onPress={() =>
            Linking.openURL(
              `https://github.com/BuddhaNag12/InScan/blob/master/LICENSE`,
            )
          }
          raised
          name="id-badge"
          type="font-awesome-5"
          color="#517fa4"
          size={20}
        />
      </View>
    </View>
  );
};

const ContactDetails = () => {
  return (
    <View>
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
          onPress={() => Linking.openURL(`mailto:rahulnag514@gmail.com`)}>
          Email : rahulnag514@gmail.com
        </Text>
      </View>

      <View style={{marginVertical: 4}}>
        <Text style={{...styles.summeryText, color: 'black'}}>
          Fork me at github :
        </Text>
        <Icon
          raised
          name="github"
          type="font-awesome-5"
          size={20}
          onPress={() => Linking.openURL(`https://github.com/BuddhaNag12`)}
        />
      </View>
    </View>
  );
};
