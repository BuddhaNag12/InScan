import React, { useState} from 'react';
import {Icon,Text,Card,Image,Overlay} from 'react-native-elements';
import {View,ActivityIndicator,ScrollView,TouchableOpacity,Clipboard,StatusBar } from 'react-native';
import { PermissionsAndroid, Platform } from "react-native";
import CameraRoll from "@react-native-community/cameraroll";


export default function Profile({route,navigation}){
    let {uri} =route.params;
    let {imageText} =route.params;
    const [deleted,setDeleted]=useState(false);
    const [isOverlay,setOverlay]=useState(false);

    const copyToClipboard = () => {
        Clipboard.setString(imageText)

      }

      async function hasAndroidPermission() {
        const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
      
        const hasPermission = await PermissionsAndroid.check(permission);
        if (hasPermission) {
          return true;
        }
        const status = await PermissionsAndroid.request(permission);
        return status === 'granted';
      }
    const saveFile= async ()=>{
        if (Platform.OS === "android" && !(await hasAndroidPermission())) {
            return;
          }
          CameraRoll.save(uri,"Inscanner");
          setOverlay(true);
    }

    const pdfConvert=()=>{
      
    }
    const deleteFile=()=>{
        // RNFS.unlink(uri)
        // .then(() => {
        //     console.log('FILE DELETED');
        //     setDeleted(true)
        // })
        // // `unlink` will throw an error, if the item to unlink does not exist
        // .catch((err) => {
        //     setDeleted(true)
        //     console.log(err.message);
        // });
    }
      return(
            <ScrollView >
                 <StatusBar hidden={false} />
                <Overlay
            isVisible={isOverlay}
            onBackdropPress={() => setOverlay(false)}
            >
            <Text>Image saved</Text>
            </Overlay>

              {deleted ?
              <Text style={{textAlign:"center"}}>File Deleted</Text>
              :
                <Card >
                <Text style={{textAlign:"center", justifyContent:"center", alignContent:"center",paddingTop:10}}> Image</Text>
                <Image
                source={{uri}}
                style={{ width: 400, height: 400 }}
                PlaceholderContent={<ActivityIndicator />}
                />
                </Card>
            }
            <View style={{
            justifyContent:"space-around",
            padding:10,
            margin:15,
            alignItems:"center" ,
            alignContent:"center",
            flexDirection:"row",
            backgroundColor:"white"
            }}>
            {deleted ?
                 <Icon
                 name='long-arrow-left'
                 type='font-awesome'
                 color='#517fa4'
                 onPress={()=>navigation.navigate('Home')}
                 />
                 :
                <Icon
                name='remove'
                type='font-awesome'
                color='#517fa4'
                onPress={()=>deleteFile()}
                />
             }
            <Icon
            name='save'
            type='font-awesome'
            color='#517fa4'
            onPress={()=>saveFile()}
            /> 
             <Icon
            name='edit'
            type='font-awesome'
            color='#517fa4'
            onPress={()=>navigation.navigate("Crop view",{
              image:uri
            })}
            />       
            </View>
            <Text h1 style={{paddingLeft:3,margin:2,textAlign:"center",color:'red',fontFamily:'Arial'}}>
                Text Recognised
            </Text>
            <TouchableOpacity onPress={() => copyToClipboard()}>
            <Text style={{paddingLeft:3,margin:2,justifyContent:'center'}}>
                {imageText}
            </Text>
            </TouchableOpacity>
        </ScrollView>
    )
}
