import React, {useState} from 'react';
import {Button, Text, Input} from 'react-native-elements';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import signUpStyle from './signUpStyle';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';
const {height} = Dimensions.get('window');

export default function Signup({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passowrd, setPass] = useState('');
  const [phone, setPhone] = useState('');
  const [EmailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [error, setError] = useState('');
  const [eye, setEye] = useState('eye-off');
  const [passVisible, setpassVisible] = useState(true);
  const [loading, setLoading] = useState(false);

  const signUpUser = () => {
    setLoading(true);
    setEmailError('');
    setPasswordError('');
    if (name && email && passowrd) {
      auth()
        .createUserWithEmailAndPassword(email, passowrd)
        .then(() => {
          setLoading(false);
          navigation.navigate('Dashboard');
        })
        .catch((error) => {
          setLoading(false);
          if (error.code === 'auth/email-already-in-use') {
            setEmailError('Email Id is already in use');
          }

          if (error.code === 'auth/invalid-email') {
            setEmailError('Invalid Email');
          }

          if (error.code === 'auth/weak-password') {
            setPasswordError(
              'Invalid password Password needs to be at least 6 digits',
            );
          } else {
            setError(error.code);
          }
        });
    } else {
      alert('Enter valid input');
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
    <View style={{...signUpStyle.container}}>
      <ScrollView>
        <View style={{...signUpStyle.box1}}>
          <View style={{...signUpStyle.SignUpForm}}>
            <Input
              inputContainerStyle={{
                ...signUpStyle.inputStyle,
              }}
              label="Full Name"
              placeholder="Full Name"
              placeholderTextColor={'grey'}
              labelStyle={{color: 'black'}}
              errorStyle={{color: 'red'}}
              onChangeText={(val) => setName(val)}
              leftIcon={<Icon name="person" size={15} color="red" />}
            />
            <Input
              inputContainerStyle={{
                ...signUpStyle.inputStyle,
                borderColor: EmailError ? 'red' : 'white',
              }}
              labelStyle={{color: 'black'}}
              placeholder="Email"
              placeholderTextColor={'grey'}
              label="Email"
              leftIcon={<Icon name="mail" size={15} color="red" />}
              errorStyle={{color: 'red'}}
              errorMessage={EmailError}
              onChangeText={(val) => setEmail(val)}
            />
            <Input
              inputContainerStyle={{
                ...signUpStyle.inputStyle,
                borderColor: passwordError ? 'red' : 'white',
              }}
              secureTextEntry={passVisible}
              leftIcon={<Icon name="key" size={15} color="red" />}
              rightIcon={<SetrightIcon />}
              labelStyle={{color: 'black'}}
              label="Password"
              placeholder="Password"
              errorStyle={{color: 'red'}}
              errorMessage={passwordError}
              onChangeText={(val) => setPass(val)}
            />
            <Input
              inputContainerStyle={{
                ...signUpStyle.inputStyle,
              }}
              leftIcon={<Icon name="call" size={15} color="red" />}
              labelStyle={{color: 'black'}}
              placeholderTextColor={'grey'}
              label="Contact No"
              placeholder="Contact No"
              errorStyle={{color: 'red'}}
              onChangeText={(val) => setPhone(val)}
            />
            <Button
              loading={loading}
              raised
              titleStyle={{fontFamily: 'Roboto'}}
              title="Sign Up"
              onPress={() => signUpUser()}
              buttonStyle={{
                borderRadius: 30,
                padding: 10,
                backgroundColor: '#0BBD00',
              }}
            />
          </View>
        </View>
        <View style={{...signUpStyle.socialButtonContainer}}>
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
              alignItems: 'center',
              height: height,
            }}>
            <Text style={{fontFamily: 'Roboto', padding: 2}}>
              Already Signed up ?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Sign In')}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Roboto',
                  fontSize: 18,
                }}>
                Log in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
