import React,{useState} from 'react';
import {Button,Divider,Text,Card,Input, ThemeProvider} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import { View,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
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
export default function Signin({navigation}){

    const inputField = React.createRef();
    const [username,setUsername] =useState('');
    const [password,setPassword] =useState('');
    const [EmailError,setEmailError] =useState('');
    const [pasError,setPasswordError] =useState('');
    const [loading,setLoading] =useState(false);
    const [passVisible,setpassVisible] =useState(true);
    const [eye,setEye] =useState ('eye-slash');
    
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
              // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
              // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              // play services not available or outdated
            } else {
              console.log(error);
            }
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
        eye=='eye'? setEye('eye-slash')
        :setEye('eye');
    }
    const SetrightIcon=()=>{
        return(
            <Icon
            name={eye}
            onPress={()=>setVisiblePassword()}
            size={20}
            />
        )
    }
    return(
        <ThemeProvider theme={theme} >
            <View style={{flex:1,justifyContent:"center"}}>
            <ScrollView >
            <Card containerStyle={{borderRadius:20,elevation:2}}>
            <Input
          
            leftIcon={
                <Icon
                name="envelope"
                size={20}
                color="black"
                />
            }
            ref={inputField}
        placeholder='Email'
        errorStyle={{ color: 'red' }}
        errorMessage={EmailError}
            onChangeText={(val)=>setUsername(val)}
        />
           <Input
           secureTextEntry={passVisible} 
           ref={inputField}
           leftIcon={
            <Icon
            color="black"
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

        <Button raised title="Sign in" onPress={()=>Signin()} loading={loading} buttonStyle={{borderRadius:30,padding:10,backgroundColor:"#FC8686"}}/>
            </Card>
            <Card containerStyle={{justifyContent:"center",alignItems:"center",height:200, padding:2}}>
                <Text style={{fontFamily:"Roboto",textAlign:"center"}}>Or Sign In with</Text>
                <Button title="Google Sign In"
                 onPress={()=>onGoogleButtonPress().then(()=>{
                    navigation.navigate('Dashboard')
                    }).catch(error=>{console.log(error)})}
                raised
                titleStyle={{color:"black",fontFamily:"Roboto_medium"}}
                buttonStyle={{backgroundColor:"#fff",borderRadius:30}}
                icon={
                 <Icon name="google"
                 color="red"
                 size={30}
                 style={{margin:3}}
                 />   
                }
                /> 
                <Divider style={{height:2,backgroundColor:'transparent'}} />
                  <Button title="Facebook Sign In"
                  raised
                titleStyle={{color:"black",fontFamily:"Roboto_medium"}}
                 buttonStyle={{backgroundColor:"#fff",borderRadius:30}}
                icon={
                 <Icon name="facebook"
                 color="blue"
                 size={30}
                 style={{margin:3}}
                 />   
                }/> 
            </Card>
        </ScrollView>
            
         </View>
  
        </ThemeProvider>
         

    )

}