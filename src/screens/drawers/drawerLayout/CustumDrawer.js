import React,{useEffect, useState} from 'react';
import {View,Text, StyleSheet} from 'react-native';
import {Avatar,Button,ThemeProvider } from 'react-native-elements';
import {DrawerContentScrollView, useIsDrawerOpen} from '@react-navigation/drawer';
import {Icon} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import DrawerButtons from '../../../components/DrawerButtons';
import * as Animatable from 'react-native-animatable';
  
const styles=StyleSheet.create({
    Button:{
        borderRadius:30,backgroundColor:"transparent",
    },
    icon:{
      padding:4
    },
    text:{
      fontFamily:'Ionicons',
      fontSize:20,
      fontWeight:"normal"
    }
})

export default function CustomDrawer(props){
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [photoURL,setPhoto] =useState('');
  const [displayName,setName] =useState('');


      function onAuthStateChanged(user) {
        if(user){
          setUser(user);
          setPhoto(user.photoURL);
          setName(user.displayName);
        }else{
          setUser(null)
          setPhoto(null);
          setName(null);
        }
        if (initializing) setInitializing(false);
      }
    
      useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
      }, []);

    const isDrawerOpen = useIsDrawerOpen();
    const signOut=()=>{
      auth()
        .signOut()
        .then(() => {
          setUser(null);
        });
      }
       
      if (initializing) return null;
    return(
     <DrawerContentScrollView {...props}>
        <ThemeProvider >
                <View style={{flex:1,flexDirection:"row",backgroundColor:"#E5DBCE",borderRadius:30,padding:4,height:40}}>
               {photoURL?
                 <Avatar
                 rounded
                 source={{uri:photoURL}}
                 />  
                 :  
                 <Avatar
                rounded
                icon={{name: 'user', type: 'font-awesome',color:"#FF6366"}}
                 activeOpacity={0.7}
                 />  
                  }
                  <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                  {displayName ? <Text style={styles.text}>{displayName}</Text> : <Text  style={styles.text}>User</Text>}
                  {user ? <Text  style={{...styles.text,fontSize:10}}>{user.email}</Text> : <Text  style={{...styles.text,fontSize:10}}>No Email</Text>}
                  </View>
                </View>
             <View style={{
            flex: 1,
            paddingTop:4,
            flexDirection: 'column',
          justifyContent: "space-evenly",
          }}
          >
          <Animatable.View animation={isDrawerOpen?'slideInUp' :''} duration={300} easing="ease-in-out">
          <DrawerButtons title="Home" IconName="home" navigation={props.navigation} routeTo="Dashboard" />
          </Animatable.View>
          <Animatable.View animation={isDrawerOpen?'slideInUp' :''}  duration={500} easing="ease-in-out">
          <DrawerButtons title="Gallery" IconName="align-justify" navigation={props.navigation} routeTo="Gallery" />
          </Animatable.View>
          <Animatable.View animation={isDrawerOpen?'slideInUp' :''} duration={600} easing="ease-in-out">
          <DrawerButtons title="Document" IconName="address-card" navigation={props.navigation} routeTo="Document" />
          </Animatable.View>
          <Animatable.View animation={isDrawerOpen?'slideInUp' :''} duration={700} easing="ease-in-out">
          <DrawerButtons title="Help" IconName="question" navigation={props.navigation} routeTo="Help" />
          </Animatable.View>
          <Animatable.View animation={isDrawerOpen?'slideInUp' :''} duration={850} easing="ease-in-out">
          <DrawerButtons title="About" IconName="info-circle" navigation={props.navigation} routeTo="About" />   
          </Animatable.View>         

          <View style={{flex:1,justifyContent:"flex-end",height:380}}>
          <Button
          titleStyle={{textTransform:"uppercase",fontFamily:"Ionicons",color:"black"}}
            buttonStyle={styles.Button}
            icon={
              <Icon
              name='log-in-outline'
               type='ionicon'
                color='#f50'
                style={styles.icon}
               />
          }
          title="Log Out" onPress={()=> signOut()} />
          </View>
          </View>
            </ThemeProvider>
        </DrawerContentScrollView>
    )

}


