import React, {useState, useEffect} from 'react';
import {Button, Text, Input, Icon} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import {View, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import loginStyle from './loginStyle';

import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';

export default function Signin({navigation}) {
  const inputField = React.createRef();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [EmailError, setEmailError] = useState('');
  const [pasError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passVisible, setpassVisible] = useState(true);
  const [eye, setEye] = useState('eye-off');

  async function onGoogleButtonPress() {
    setLoading(true);
    try {
      GoogleSignin.configure({
        webClientId:
          '348211842811-ggg8maqm40do9bhe7pjoenhopmcs9u9o.apps.googleusercontent.com',
        offlineAccess: true,
      });
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const user = auth().signInWithCredential(googleCredential);
      setLoading(false);
      return user;
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(error);
      } else {
        console.log(error);
      }
      return error;
    }
  }

  const Signin = () => {
    setLoading(true);
    if (!username) {
      alert('Enter valid username');
      setLoading(false);
    } else if (!password) {
      setLoading(false);
      alert('Enter valid password');
    } else {
      setEmailError('');
      setPasswordError('');
      auth()
        .signInWithEmailAndPassword(username, password)
        .then(() => {
          navigation.navigate('Dashboard');
          setLoading(false);
        })
        .catch((error) => {
          if (error.code === 'auth/invalid-email') {
            setEmailError('invalid email address');
            setLoading(false);
          }
          if (error.code === 'auth/wrong-passowrd') {
            setPasswordError('invalid passowrd');
            setLoading(false);
          }
          setPasswordError('invalid Email or passowrd');
          setLoading(false);
        });
    }
  };
  const setVisiblePassword = () => {
    setpassVisible(!passVisible);
    eye == 'eye' ? setEye('eye-off') : setEye('eye');
  };
  const SetrightIcon = () => {
    return (
      <Icon
        name={eye}
        type="ionicon"
        onPress={() => setVisiblePassword()}
        size={20}
      />
    );
  };
  return (
    <View style={loginStyle.container}>
      <ScrollView>
        <View style={{...loginStyle.box1}}>
          <Text style={loginStyle.HeadingText}>InScan</Text>
          <View style={loginStyle.LoginForm}>
            <Input
              inputContainerStyle={{
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 60,
                padding: 10,
                backgroundColor: '#fefefe',
              }}
              leftIcon={
                <Icon name="mail" type="ionicon" size={20} color="#FC8686" />
              }
              ref={inputField}
              placeholder="Email"
              errorStyle={{color: 'red'}}
              errorMessage={EmailError}
              onChangeText={(val) => setUsername(val)}
            />
            <Input
              inputContainerStyle={{
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 60,
                padding: 10,
                backgroundColor: '#fefefe',
              }}
              secureTextEntry={passVisible}
              ref={inputField}
              leftIcon={
                <Icon color="#FC8686" type="ionicon" name="key" size={20} />
              }
              rightIcon={<SetrightIcon />}
              placeholder="Password"
              errorStyle={{color: 'red'}}
              errorMessage={pasError}
              onChangeText={(val) => setPassword(val)}
            />

            <Button
              raised
              title="Log in"
              onPress={() => Signin()}
              loading={loading}
              buttonStyle={loginStyle.button}
              titleStyle={{fontFamily: 'Roboto'}}
            />
          </View>
        </View>
        <View style={{...loginStyle.socialButtonContainer}}>
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: '#FFE4DE',
            }}
          />
          <View style={{borderTopLeftRadius: 75, backgroundColor: '#EAFFFE'}}>
            <Text style={loginStyle.heading2Text}>Or Log In with</Text>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Icon
                raised
                name="logo-google"
                type="ionicon"
                onPress={async () =>
                  await onGoogleButtonPress()
                    .then(() => {
                      navigation.navigate('Dashboard');
                    })
                    .catch((error) => {
                      console.log(error);
                    })
                }
                color="red"
                size={30}
                style={{margin: 3}}
              />
              <Icon
                raised
                name="logo-facebook"
                type="ionicon"
                color="blue"
                size={30}
                style={{margin: 3}}
              />
            </View>
            <Text
              style={{
                textAlign: 'center',
                paddingTop: 20,
                fontFamily: 'Roboto',
              }}>
              Need an account
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Roboto',
                  fontSize: 15,
                }}>
                Create A new Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
