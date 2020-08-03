
import React, { useRef, useState } from 'react';
import {StyleSheet, Text, View, ActivityIndicator,StatusBar,ScrollView } from 'react-native';
import {Icon} from "react-native-elements";
import { RNCamera } from 'react-native-camera';
import vision from '@react-native-firebase/ml-vision';
import CameraRoll from "@react-native-community/cameraroll";
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight=Dimensions.get('window').height;

const PendingView = () => (
    <ActivityIndicator size="large" />
  );

export default function Camera ({navigation}) {
  const [flash,setFlash]=useState(RNCamera.Constants.FlashMode.on);
  const [Cam,setCam]=useState(RNCamera.Constants.Type.back);
  const [loading,setloading]=useState(false);

  // async function processDocument(localPath) {
  //   const processed = await vision().textRecognizerProcessImage(localPath);
  //   console.log('Found text in document: ', processed.text);
  //   processed.blocks.forEach(block => {
  //     console.log('Found block with text: ', block.text);
  //     console.log('Confidence in block: ', block.confidence);
  //     console.log('Languages found in block: ', block.recognizedLanguages);
  //   });
  //   return processed.text;
  // }

  // processDocument(data.uri).then((text) =>{
  //   navigation.navigate('Convert', {
  //     path: data.uri,
  //     imageText:text
  //   }),
  //   setloading(false);
  // });

// Local path to file on the device
  let CameraRef=useRef(null);
 
  const takePicture=async()=> {
      const options = { quality: 0.5, base64: true };
      const data = await CameraRef.current.takePictureAsync(options);
      //console.log(data.uri);
      // navigation.navigate('Convert',{
      //   uri:data.uri
      // })
      CameraRoll.save(data.uri,{type:"photo",album:"InScan"});
  }

  const toggleFlash=()=>{
    if(flash==RNCamera.Constants.FlashMode.on)
    {
      setFlash(RNCamera.Constants.FlashMode.off)
    }else{
      setFlash(RNCamera.Constants.FlashMode.on)
    }
  }
  // const ToggleCam=()=>{
  //   if(Cam==RNCamera.Constants.Type.back)
  //   {
  //     setCam(RNCamera.Constants.Type.front)
  //   }else{
  //     setCam(RNCamera.Constants.Type.back)
  //   }
  // }
      return (
        <View style={styles.container}>
          <StatusBar hidden />
          <RNCamera
          style={styles.preview}
          type={Cam}
          ref={CameraRef}
          flashMode={flash}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        >
          {({ camera, status, recordAudioPermissionStatus }) => {
            if (status !== 'READY') return <PendingView />;
            return (
              <View >
                  <View style={{
                  alignItems:"flex-start",
                  paddingLeft:6,
                  height:windowHeight-100,
                }}>
                  <Icon
                  name="home-outline"
                  type="ionicon"
                  size={30}
                  color="white"
                  onPress={()=>navigation.navigate("Dashboard")}
                /> 
              </View>
              <View style={{
                borderTopLeftRadius:30,
                borderTopRightRadius:30,
                width:windowWidth,
                height:windowHeight/8,
                flexDirection: 'row',
                justifyContent: "space-around",   
                alignItems:"center",      
                backgroundColor:"grey"
              }}>
                <Icon 
                  name="images-outline"
                  type="ionicon"
                  size={30}
                  color="white"
                  onPress={()=>navigation.navigate("Gallery")}
                /> 
                 <Icon
                    name="camera-outline"
                    type="ionicon"
                  size={30}
                  color="white"
                  onPress={()=>takePicture()}
                /> 
                 <Icon
                  name={flash==RNCamera.Constants.FlashMode.on ? 'flash-outline' : 'flash-off-outline'}
                  size={30}
                  type="ionicon"
                  color="white"
                  onPress={() => toggleFlash()}
                /> 
                 <Icon
                  name="image-outline"
                  type="ionicon"
                  size={30}
                  color="white"
                  onPress={()=>takePicture()}
                />              
              </View>
              </View>
            
            );
          }}
        </RNCamera>
        </View>
      );
  }


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'black',
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20,
    },
  });