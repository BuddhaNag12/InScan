import React, {useState} from 'react';
import {Button, Text, Input, SocialIcon, Icon} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import {View, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import loginStyle from './loginStyle';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
const emailRef = React.createRef();
const passwordRef = React.createRef();

export default function Signin({navigation}) {
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
      const user = auth()
        .signInWithCredential(googleCredential)
        .then((user) => {
          setLoading(false);
          if (user) {
            navigation.navigate('Dashboard');
          }
        })
        .catch((err) => {
          setLoading(false);
        });
      setLoading(false);
      return user;
    } catch (error) {
      setLoading(false);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert('Cancelled');
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
          if (error.code == 'auth/invalid-email') {
            setEmailError('invalid email address');
            setLoading(false);
            emailRef.current.clear();
            emailRef.current.shake();
            passwordRef.current.shake();
          }
          if (error.code == 'auth/wrong-password') {
            setPasswordError('invalid passowrd');
            setLoading(false);
            passwordRef.current.shake();
            passwordRef.current.clear();
          }
          if (error.code == 'auth/too-many-requests') {
            emailRef.current.clear();
            passwordRef.current.clear();
            setPasswordError('Too Many Atempts Try a bit later');
            setLoading(false);
          }
          if (error.code == 'auth/user-not-found') {
            setPasswordError('User not found try signing up');
            emailRef.current.clear();
            passwordRef.current.clear();
            setLoading(false);
          }
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
          <Text style={loginStyle.HeadingText}>Sign In</Text>
          <View style={loginStyle.LoginForm}>
            <Input
              autoCompleteType="email"
              autoCapitalize="none"
              inputContainerStyle={{
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 60,
                padding: 10,
                backgroundColor: '#fefefe',
                elevation: 2,
              }}
              leftIcon={
                <Icon name="mail" type="ionicon" size={20} color="#FC8686" />
              }
              ref={emailRef}
              placeholder="Email"
              errorStyle={{color: 'red'}}
              errorMessage={EmailError}
              onChangeText={(val) => setUsername(val)}
            />
            <Input
              autoCompleteType="password"
              autoCapitalize="none"
              inputContainerStyle={{
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 60,
                padding: 10,
                backgroundColor: '#fefefe',
                elevation: 2,
              }}
              secureTextEntry={passVisible}
              ref={passwordRef}
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
          <View
            style={{
              borderTopLeftRadius: 75,
              backgroundColor: '#EAFFFE',
              justifyContent: 'center',
              alignItems:"center"
            }}>
            <Text style={loginStyle.heading2Text}>Or Log In with</Text>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <SocialIcon
                raised
                type="google"
                onPress={() => onGoogleButtonPress()}
              />
              <SocialIcon
                raised
                type="facebook"
                onPress={() => alert('Comming soon..')}
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
            <TouchableOpacity
              onPress={() => navigation.navigate('Sign Up')}
              style={{ width: '36%',borderBottomWidth:1,borderBottomColor:'black'}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Roboto',
                  fontSize: 18,
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
