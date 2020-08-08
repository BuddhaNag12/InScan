import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Avatar, Button} from 'react-native-elements';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Icon} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import DrawerButtons from '../../../components/DrawerButtons';
const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
  Button: {
    borderRadius: 30,
    backgroundColor: 'transparent',
    width: 100,
  },
  icon: {
    padding: 4,
  },
  text: {
    fontFamily: 'Ionicons',
    fontSize: 20,
    fontWeight: 'normal',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#EAFFFE',
    margin: null,
  },
  box: {
    borderBottomRightRadius: 75,
    backgroundColor: '#FFE4DE',
    height: 0.5 * height,
  },
  bottomBox: {
    flex: 1,
  },
  profile: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fefefe',
    padding: 20,
  },
  HeadContainer: {
    backgroundColor: '#FFE4DE',
  },
});

export default function CustomDrawer(props) {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [photoURL, setPhoto] = useState('');
  const [displayName, setName] = useState('');

  function onAuthStateChanged(user) {
    if (user) {
      setUser(user);
      setPhoto(user.photoURL);
      setName(user.displayName);
    } else {
      setUser(null);
      setPhoto(null);
      setName(null);
    }
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const signOut = async () => {

    auth()
      .signOut()
      .then(() => {
        setUser(null);
      });
  };

  if (initializing) return null;
  return (
    <DrawerContentScrollView {...props}>
      <View style={{...styles.container}}>
        <View style={{...styles.profile}}>
          {photoURL ? (
            <Avatar rounded source={{uri: photoURL}} />
          ) : (
            <Avatar
              rounded
              icon={{name: 'user', type: 'font-awesome', color: '#FF6366'}}
              activeOpacity={0.7}
            />
          )}
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {displayName ? (
              <Text style={styles.text}>{displayName}</Text>
            ) : (
              <Text style={styles.text}>User</Text>
            )}
            {user ? (
              <Text style={{...styles.text, fontSize: 10}}>{user.email}</Text>
            ) : (
              <Text style={{...styles.text, fontSize: 15}}>No Email</Text>
            )}
          </View>
        </View>
        <View
          style={{
            ...styles.box,
          }}>
          <DrawerButtons
            title="Home"
            IconName="home"
            navigation={props.navigation}
            routeTo="Dashboard"
          />
          <DrawerButtons
            title="Gallery"
            IconName="align-justify"
            navigation={props.navigation}
            routeTo="Gallery"
          />
          <DrawerButtons
            title="Edited images"
            IconName="image"
            navigation={props.navigation}
            routeTo="Edited Photos"
          />
          <DrawerButtons
            title="Help"
            IconName="question"
            navigation={props.navigation}
            routeTo="Help"
          />
          <DrawerButtons
            title="About"
            IconName="info"
            navigation={props.navigation}
            routeTo="About"
          />
        </View>
        <View style={{...styles.bottomBox}}>
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: '#FFE4DE',
            }}
          />
          <View
            style={{
              borderTopLeftRadius: 75,
              backgroundColor: '#EAFFFE',
              height: height / 3.6,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Button
              titleStyle={{
                textTransform: 'uppercase',
                fontFamily: 'Ionicons',
                color: 'black',
              }}
              buttonStyle={styles.Button}
              icon={
                <Icon
                  name="log-in-outline"
                  type="ionicon"
                  color="#f50"
                  style={styles.icon}
                />
              }
              title="Log Out"
              onPress={() => signOut()}
            />
          </View>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}
