import React,{useState,useEffect} from 'react';
import {View,ScrollView,ActivityIndicator,PermissionsAndroid, Platform} from 'react-native';
import {Card,Image,Text,Icon} from 'react-native-elements';
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
        CameraRoll.save(image.path,{type:"photo",album:"Inscan/Inscan_edit"});
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
            groupTypes:"Album",
            groupName:"InScan"
          })
          .then(r => {
           //console.log(r.edges);
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
          //console.log(image);
        }).catch(error=>console.log(error))
      }
      
    return(
        <View>
     <MyHeader navigation={navigation} />
          <Text style={{textAlign:"center",fontFamily:"Ionicons",fontSize:20}}>Images from InScan library</Text>
        <ScrollView >
       {photos? photos.map((p, i) => {
       return (
        <Card containerStyle={{borderRadius:30}} key={i}>
          
         <Image
           key={i}
           style={{
             width: 350,
             height: 200,
             borderRadius:30
           }}
           source={{ uri: p.node.image.uri }
          }
          PlaceholderContent={<ActivityIndicator />}
          />
           <View style={{flexDirection:"row",justifyContent:"space-around"}}>
              <Icon
                 raised
                onPress={()=>cropImage(p.node.image.uri )}
                name='create-outline'
                type='ionicon'
                color="#FF5D5D"
              />
               <Icon
                 raised
                onPress={()=>console.log("Todo")}
                name='document-attach-outline'
                type='ionicon'
                color="#574240"
              />
           </View>
         </Card>
        
       );
     }): <View style={{flex:1}}>
       <Text>No Images Found</Text>
       </View>}
     </ScrollView>
      </View>
    )
}

export default MyGallery;