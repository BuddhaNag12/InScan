import React,{useState} from 'react';
import {Button,Text,Card,Input, ThemeProvider} from 'react-native-elements';
import { View,ScrollView } from 'react-native';

import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';



export default function Signup({navigation}){
    const [name,setName] =useState('')
    const [email,setEmail] =useState('')
    const [passowrd,setPass] =useState('')
    const [phone,setPhone] =useState('')
    const [error,setError] =useState('');

    const signUpUser=()=>{
       if(name && email && passowrd){
        auth()
        .createUserWithEmailAndPassword(email,passowrd)
        .then((uid) => {
         // console.log('User account created & signed in!',uid);
        
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            //console.log('That email address is already in use!');
            setError("That email address is already in use!")
          }
      
          if (error.code === 'auth/invalid-email') {
            //console.log('That email address is invalid!');
            setError("That email address is invalid!")
          }
          setError(error.code)
          console.error(error);
        });
       }else{
         alert("Enter valid input")
       }
 

    }

    return(

        <ThemeProvider >   
          <ScrollView>
         <View style={{flex:1,justifyContent:"center"}}>
            <Card containerStyle={{padding:5}}>
            <Input

        label='Full Name'
        placeholder="Full Name"
        placeholderTextColor={error?'red':"grey"}
        labelStyle={{color:"black"}}
        errorStyle={{ color: 'red' }}
        onChangeText={(val)=>setName(val)}
        leftIcon={
          <Icon 
          name="person-outline"
          />
        }
        />
            <Input
             labelStyle={{color:"black"}}
        placeholder='Email'
        label='Email'
        placeholderTextColor={error?"red":'grey'}
        leftIcon={
          <Icon 
          name="mail-outline"
          />
        }
        errorStyle={{ color: 'red' }}
        // errorMessage={error}
            onChangeText={(val)=>setEmail(val)}
        />
           <Input
            leftIcon={
              <Icon 
              name="key-outline"
              />
            }
            labelStyle={{color:"black"}}
            placeholderTextColor={error?"red":'grey'}
            label='Password'
        placeholder='Password'
        errorStyle={{ color: 'red' }}
        // errorMessage={error}
        onChangeText={(val)=>setPass(val)}
        />
          <Input
          leftIcon={
            <Icon 
            name="call-outline"
            />
          }
          labelStyle={{color:"black"}}
            placeholderTextColor={error?"red":'grey'}
            label='Contact No'
             placeholder='Contact No'
        errorStyle={{ color: 'red' }}
        onChangeText={(val)=>setPhone(val)}
        />
           <Button raised
            titleStyle={{fontFamily:"Roboto"}}
            title="Sign Up" onPress={()=>signUpUser()}
            buttonStyle={{borderRadius:30,padding:10,backgroundColor:"red"
            }}
            />
            </Card>
            <View style={{justifyContent:"center",alignItems:"center",height:80}}>
              <Text style={{fontFamily:"Roboto",padding:2,}}>Already Signed up ?</Text>
              <Button raised 
              titleStyle={{fontFamily:"Roboto"}}
              title="login" onPress={()=>navigation.navigate('Sign In')} buttonStyle={{borderRadius:30,width:100}}/>
            </View>
            </View>
       </ScrollView>
     </ThemeProvider>

    )

}