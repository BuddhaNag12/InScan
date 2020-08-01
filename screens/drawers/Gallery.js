import React,{useState,useEffect} from 'react';
import {View,ScrollView,ActivityIndicator,PermissionsAndroid, Platform, TouchableOpacity} from 'react-native';
import {Card,Image} from 'react-native-elements';
import MyHeader from '../../components/header/Header';
import CameraRoll from "@react-native-community/cameraroll";
import ImagePicker from 'react-native-image-crop-picker';


const MyGallery=({navigation})=>{
    const [photos,setPhotos] =useState([]);
    async function HasWritePermission() {
      const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
      const hasPermission = await PermissionsAndroid.check(permission);
      if (hasPermission) {
        return true;
      }
      const status = await PermissionsAndroid.request(permission);
      return status === 'granted';
    }

  const saveFile= async (image)=>{
      if (Platform.OS === "android" && !(await HasWritePermission())) {
          return;
        }
        CameraRoll.save(image.path,"Inscanner");
  }

    async function hasAndroidPermission() {
        const permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
        const hasPermission = await PermissionsAndroid.check(permission);
        if (hasPermission) {
          return true;
        }
        const status = await PermissionsAndroid.request(permission);
        return status === 'granted';
      }
      
      useEffect(()=>{
        handleButtonPress();
      },[])
      async function handleButtonPress() {
        if (Platform.OS === "android" && !(await hasAndroidPermission())) {
          return;
        }
      
        CameraRoll.getPhotos({
            first: 20,
            assetType: 'Photos',
          })
          .then(r => {
            setPhotos(r.edges);
          })
          .catch((err) => {
           console.log(err);
          });
      };

      
      function cropImage(path){
        ImagePicker.openCropper({
          path: path,
          width: 300,
          height: 400
        }).then(image => {
          saveFile(image);
          console.log(image);
        }).catch(error=>console.log(error))
      }
      
    return(
        <View>
     <MyHeader navigation={navigation} />

        <ScrollView>
       {photos.map((p, i) => {
       return (
        <Card  key={i}>
       <TouchableOpacity onPress={()=>cropImage(p.node.image.uri )}>
         <Image
           key={i}
           style={{
             width: 350,
             height: 200,
           }}
           source={{ uri: p.node.image.uri }
          }
          PlaceholderContent={<ActivityIndicator />}
         />
         </TouchableOpacity>
         </Card>
        
       );
     })}
     </ScrollView>
      </View>
    )
}

export default MyGallery;