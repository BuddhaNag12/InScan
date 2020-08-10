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
  const [error, setError] = useState('');

  const signUpUser = () => {
    if (name && email && passowrd) {
      auth()
        .createUserWithEmailAndPassword(email, passowrd)
        .then((uid) => {
          // console.log('User account created & signed in!',uid);
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            //console.log('That email address is already in use!');
            setError('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            //console.log('That email address is invalid!');
            setError('That email address is invalid!');
          }
          setError(error.code);
          console.error(error);
        });
    } else {
      alert('Enter valid input');
    }
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
              placeholderTextColor={error ? 'red' : 'grey'}
              labelStyle={{color: 'black'}}
              errorStyle={{color: 'red'}}
              onChangeText={(val) => setName(val)}
              leftIcon={<Icon name="person" size={15} color="red" />}
            />
            <Input
              inputContainerStyle={{
                ...signUpStyle.inputStyle,
              }}
              labelStyle={{color: 'black'}}
              placeholder="Email"
              label="Email"
              placeholderTextColor={error ? 'red' : 'grey'}
              leftIcon={<Icon name="mail" size={15} color="red" />}
              errorStyle={{color: 'red'}}
              // errorMessage={error}
              onChangeText={(val) => setEmail(val)}
            />
            <Input
              inputContainerStyle={{
                ...signUpStyle.inputStyle,
              }}
              leftIcon={<Icon name="key" size={15} color="red" />}
              labelStyle={{color: 'black'}}
              placeholderTextColor={error ? 'red' : 'grey'}
              label="Password"
              placeholder="Password"
              errorStyle={{color: 'red'}}
              // errorMessage={error}
              onChangeText={(val) => setPass(val)}
            />
            <Input
              inputContainerStyle={{
                ...signUpStyle.inputStyle,
              }}
              leftIcon={<Icon name="call" size={15} color="red" />}
              labelStyle={{color: 'black'}}
              placeholderTextColor={error ? 'red' : 'grey'}
              label="Contact No"
              placeholder="Contact No"
              errorStyle={{color: 'red'}}
              onChangeText={(val) => setPhone(val)}
            />
            <Button
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
