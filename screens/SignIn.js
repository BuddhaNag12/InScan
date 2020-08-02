import React,{useState} from 'react';
import {Button,Divider,Text,Card,Input,Icon} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import { View,ScrollView,StyleSheet,Dimensions } from 'react-native';

const {height, width} = Dimensions.get('window');

import {
    GoogleSignin,
    statusCodes,
  } from '@react-native-community/google-signin';


const fontName="Roboto_medium";

const theme={
    inputStyle:{
        borderRadius:30,
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,justifyContent:"center",alignItems:"center",  
        backgroundColor:"#EAFFFE",
    },
    HeadingText:{
        fontFamily:"Roboto",
        fontSize:50,
        color:"white",
        textAlign:"center"
    },
    button:{
        borderRadius:30,padding:10,backgroundColor:"#FC8686"
    },
    LoginForm:{
        width:(width-10),
        padding:10,
        margin:5
    },
    socialButtonContainer:{
        flex:1,
    },
    heading2Text:{
        fontFamily:"Roboto",
        textAlign:"center"
    },
    box1:{
        borderBottomRightRadius:75,
        backgroundColor:"#FFE4DE",
        height:0.50*height,
    }
})
export default function Signin({navigation}){

    const inputField = React.createRef();
    const [username,setUsername] =useState('');
    const [password,setPassword] =useState('');
    const [EmailError,setEmailError] =useState('');
    const [pasError,setPasswordError] =useState('');
    const [loading,setLoading] =useState(false);
    const [passVisible,setpassVisible] =useState(true);
    const [eye,setEye] =useState ('eye-off');
    
    // const isSignedIn = async () => {
    //     try {
    //         await GoogleSignin.revokeAccess();
    //         await GoogleSignin.signOut();

    //       } catch (error) {
    //         console.error(error);
    //       }
    //   };
    //   useEffect(()=>{
    //     isSignedIn()
    //   },[])

 
    async function onGoogleButtonPress() {
        try {
            GoogleSignin.configure({
                webClientId: '348211842811-ggg8maqm40do9bhe7pjoenhopmcs9u9o.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
                offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
                });
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const {name,email,photo} = userInfo.user;
             return userInfo.user;

          } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                return error;
              // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
              // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              // play services not available or outdated
            } else {
              console.log(error);
            }
            return error;
        }
      }


      const CheckUser=()=>{
        setLoading(true);
         auth().onAuthStateChanged((user)=>{
          if(user){
            setLoading(false);
              navigation.navigate("Dashboard")
          }
          else{
            setLoading(false);
          }
         })
      }
    const Signin=()=>{
        setLoading(true);
        if(!username){
            alert("Enter valid username");
            setLoading(false);
        }else if(!password){
            setLoading(false);
            alert("Enter valid password");
        }
            else{
            setEmailError("");
            setPasswordError("");
                    auth()
            .signInWithEmailAndPassword(username,password)
            .then((uid) => {
                navigation.navigate("Dashboard",{
                    id:uid.uid
                });
                setLoading(false);
            })
            .catch(error => {
                if (error.code === 'auth/invalid-email') {
                    setEmailError("invalid email address");
                    setLoading(false);
                }
                if (error.code === 'auth/wrong-passowrd') {
                    setPasswordError("invalid passowrd");
                    setLoading(false);
                    }
                setPasswordError("invalid Email or passowrd");
                setLoading(false);
            });
        }
       
    }
    const setVisiblePassword=()=>{
        setpassVisible(!passVisible)
        eye=='eye'? setEye('eye-off')
        :setEye('eye');
    }
    const SetrightIcon=()=>{
        return(
            <Icon
            name={eye}
            type="ionicon"
            onPress={()=>setVisiblePassword()}
            size={20}
            />
        )
    }
    return(
    
    <View style={styles.container}>
        <ScrollView >
            <View style={{...styles.box1}}>
          <Text style={styles.HeadingText}>InScan</Text>
            <View style={styles.LoginForm}>
            <Input
            
            inputContainerStyle={{
                borderWidth:2,borderColor:'white',borderRadius:60,padding:10,
                backgroundColor:"#fefefe"
            }}
            leftIcon={
                <Icon
                name="mail"
                type="ionicon"
                size={20}
                color="#FC8686"
                />
            }
            ref={inputField}
             placeholder='Email'
             errorStyle={{ color: 'red' }}
             errorMessage={EmailError}
            onChangeText={(val)=>setUsername(val)}
           />
           <Input
               inputContainerStyle={{
                borderWidth:2,borderColor:'white',borderRadius:60,padding:10,
                backgroundColor:"#fefefe"
            }}
           secureTextEntry={passVisible} 
           ref={inputField}
           leftIcon={
            <Icon
            color="#FC8686"
            type="ionicon"
            name="key"
            size={20}
            />}
         rightIcon={
            <SetrightIcon />
            }
        placeholder='Password'
        errorStyle={{ color: 'red' }}
        errorMessage={pasError}
        onChangeText={(val)=>setPassword(val)}
        />

            <Button raised title="Sign in" onPress={()=>Signin()} loading={loading}
             buttonStyle={styles.button}/>
             </View>
            </View>
            <View style={{...styles.socialButtonContainer}}>
             <View style={{...StyleSheet.absoluteFillObject,backgroundColor:"#FFE4DE"}} />
                <View style={{borderTopLeftRadius:75,backgroundColor:"#EAFFFE" ,

                    }}>
                    <Text style={styles.heading2Text}>Or Sign In with</Text>
                    <View style={{alignItems:"center",flexDirection:"row",justifyContent:"center"}}>
                     <Icon
                     raised
                     name="logo-google"
                     type="ionicon"
                     onPress={async()=>await onGoogleButtonPress().then(()=>{
                     navigation.navigate('Dashboard')
                    }).catch(error=>{console.log(error)})}
                     color="red"
                     size={30}
                     style={{margin:3}}
                   />   
                 <Icon
                 raised
                  name="logo-facebook"
                  type="ionicon"
                     color="blue"
                     size={30}
                     style={{margin:3}}
                 />   
                    </View>
                    <Button title="Create A new Account" onPress={()=>navigation.navigate("Sign Up")}
                     titleStyle={{fontFamily:"Roboto"}}
                      buttonStyle={{borderRadius:50,backgroundColor:"#FC8686"}}
                      containerStyle={{width:200,alignSelf:"center"}}
                      />
                      
                   </View>
            </View>
          
        </ScrollView>
     </View>
    )
}