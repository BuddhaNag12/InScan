import React from 'react';
import {Header,Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useIsDrawerOpen} from '@react-navigation/drawer';
import * as Animatable from 'react-native-animatable';

const MyHeader=({navigation})=>{
  const isDrawerOpen = useIsDrawerOpen();

  return(
    
    <Header
    containerStyle={{borderBottomColor:"transparent",elevation:5,backgroundColor:"#F46049",opacity:0.8}}
    leftComponent={
          <Animatable.View animation={isDrawerOpen? 'bounceInLeft':'slideInRight'} delay={0} >
           <Icon
            style={{color:'#fff'}}
            size={20}
            name={isDrawerOpen? 'arrow-left' : 'bars'}
            onPress={()=>navigation.toggleDrawer()}
            />
          </Animatable.View>
        }
    centerComponent={
      <Text style={{color:"#fff",fontSize:30,fontFamily:"Ionicons"}}>InScan</Text>
      }
    />
  )
}

export default MyHeader;