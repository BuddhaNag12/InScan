import React,{useState} from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  Dimensions,
  ToastAndroid
} from 'react-native';
import RNImageToPdf from 'react-native-image-to-pdf';
import {StyleSheet} from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
const Width= Dimensions.get('screen').width;
const Height= Dimensions.get('screen').height;

const style= StyleSheet.create({
container : {
    flex:1,
    justifyContent: "center",
    alignItems : 'center',
    backgroundColor: '#fff' ,
    borderWidth: 1,
    borderColor: '#000'
  },
image : {
    width: Width*0.9,
    height: Height*0.35,
    resizeMode: 'contain',
    marginTop: Height*0.02
},
titleText : {
    fontSize:20,
    fontFamily: 'monospace',
    color: 'black',
    fontWeight: 'bold',
    marginTop:Height*0.01
},
descText : {
    color: 'green',
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight:'900',
    marginTop: Height*0.03,
    marginLeft: Width*0.03
},
button : {
    borderWidth:1,
    marginTop:Height*0.04,
    padding: '2%',
    borderRadius: 5,
    backgroundColor: 'lightgreen',
    width: Width*0.75,
    height: Height*0.07,
    alignItems:'center'
},
buttonText : {
    color: 'black',
    fontSize:25,
    fontWeight:'bold',
    fontFamily:'monospace'
}
});

export default function ConvertImageToPdf({route,navigation}){
  const {uri} =route.params ? route.params :'';
  const [screenPath,setPath]=useState('');
  const getPDF = async() => {

    CameraRoll.getPhotos({
      first: 10,
      assetType: 'Photos',
    })
    .then(r => {
      const imageArray=[];
      r.edges.map((arr)=>imageArray.push(arr.node.image.uri.substr(7)));
    //  const u = pathImg[0].substr(7);
    //  setPath({screenPath: u });
      console.log(imageArray);
     convertPdf(imageArray);
    })
    .catch((err) => {
     console.log(err);
    });

   
  }

  const convertPdf= async(imgPath)=>{
    try{
      // convert image to pdf
      const options = {
        imagePaths: imgPath,
        name: `Inscan_${Date.now().toString()}.pdf`,
        maxSize: {
          // optional maximum image dimension - larger images will be resized
          width: 900,
          height: Math.round(
            (Dimensions.get('screen').height / Dimensions.get('screen').width) *
            900,
          ),
        },
        quality: 1.0, // optional compression paramter
      };
      RNImageToPdf.createPDFbyImages(options).then(pdf=>{
        navigation.navigate('Document',{
          pdfUri:pdf.filePath
        })
      })
      // ToastAndroid.show("PDF saved at location "+pdf.filePath, ToastAndroid.LONG);
     // console.log(pdf.filePath);
    }
    catch(e){
      console.log(e);
    }
  }
    return(
      <View style={style.container}>
        <Image
          source={{uri}}
          style={{ width: 400, height: 400 }}
          PlaceholderContent={<ActivityIndicator />}
        />     
     <View>
          
              <View>
                <TouchableOpacity style={style.button} 
                onPress={
                  async ()=>{
                    await getPDF();
                  }
                }>
                  <Text style={style.buttonText}>Convert To PDF</Text>
                </TouchableOpacity>
              </View> 
        </View>
      </View>
    );


}