import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {Avatar, Button, Divider} from 'react-native-elements';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Icon} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import DrawerButtons from '../../../components/DrawerButtons';
import Share from 'react-native-share';
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  Button: {
    borderRadius: 30,
    backgroundColor: 'transparent',
    width: 100,
  },
  shareButton: {
    backgroundColor: 'transparent',
    width: '100%',
  },
  icon: {
    padding: 4,
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 'normal',
    color: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#EAFFFE',
  },
  box: {
    borderBottomRightRadius: 100,
    backgroundColor: '#FFE4DE',
    height: 0.6 * height,
  },
  bottomBox: {
    flex: 1,
  },
  profile: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F99D9F',
    top: 20,
    padding: 10,
    height: 50,
    width: width / 2 + 20,
    alignItems: 'center',
    borderRadius: 30,
    margin: 5,
    alignSelf: 'center',
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

  const shareFile = () => {
    const shareOptions = {
      title: 'Share via',
      url: `https://play.google.com/store/apps/details?id=com.inscanner&hl=en_IN`,
    };
    Share.open(shareOptions)
      .then((res) => {
        console.log('shared ', res);
        const isCancelled = false;
        showToastWithGravityAndOffset(isCancelled);
      })
      .catch((e) => {
        const isCancelled = true;
        showToastWithGravityAndOffset(isCancelled);
        console.log(e);
      });
  };

  const showToastWithGravityAndOffset = (isCancelled) => {
    let cancelled;
    isCancelled ? (cancelled = 'Cancelled') : (cancelled = 'Thanks');
    ToastAndroid.showWithGravityAndOffset(
      cancelled,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  if (initializing) return <ActivityIndicator size="large" />;
  return (
    <DrawerContentScrollView {...props}>
      <View style={{...styles.container}}>
        <View style={{...styles.profile, elevation: 2}}>
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
          <View
            style={{
              backfaceVisibility: 'red',
              height: height / 2,
              marginTop: 30,
            }}>
            <DrawerButtons
              title="Home"
              IconName="home"
              navigation={props.navigation}
              routeTo="Dashboard"
            />
            <DrawerButtons
              title="Gallery"
              IconName="images"
              navigation={props.navigation}
              routeTo="Gallery"
            />
            <DrawerButtons
              title="Edited images"
              IconName="expand"
              navigation={props.navigation}
              routeTo="Edited Documents"
            />
            <DrawerButtons
              title="Documents"
              IconName="folder-open"
              navigation={props.navigation}
              routeTo="Documents"
            />
            <DrawerButtons
              title="Help"
              IconName="question"
              navigation={props.navigation}
              routeTo="Help"
            />

            <Divider style={{backgroundColor: 'black'}} />
            <DrawerButtons
              title="About us"
              IconName="info"
              navigation={props.navigation}
              routeTo="About"
            />
            <Button
              onPress={() => shareFile()}
              title="Share this app"
              icon={
                <Icon
                  name="share"
                  type="ionicon"
                  color="rgba(200,0,0,0.5)"
                  style={{padding: 0}}
                />
              }
              buttonStyle={{
                backgroundColor: 'transparent',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingVertical: 10,
              }}
              titleStyle={{
                fontFamily: 'Roboto',
                color: 'black',
                textAlign: 'center',
                paddingHorizontal: 15,
              }}
            />
          </View>
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
                fontFamily: 'Roboto',
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
