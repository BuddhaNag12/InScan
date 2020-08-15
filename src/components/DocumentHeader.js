import React from 'react';
import {Header, Button} from 'react-native-elements';
import {StatusBar, Text, View,TouchableWithoutFeedback} from 'react-native';
import PdfContext from './context';
import Share from 'react-native-share';
import Icon from 'react-native-vector-icons/FontAwesome5';
const DocumentHeader = ({navigation}) => {
  const PdfUri = React.useContext(PdfContext);

  const shareFile = () => {
    const shareOptions = {
      title: 'Share via',
      url: `file://${PdfUri}`,
    };
    Share.open(shareOptions)
      .then((res) => {
        console.log('shared ', res);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <StatusBar backgroundColor="#FF7772" barStyle="light-content" />
      <Header
        containerStyle={{
          borderBottomColor: 'transparent',
          elevation: 5,
          backgroundColor: '#FF7772',
          opacity: 1,
        }}
        leftComponent={
          <View style={{paddingHorizontal: 4}}>
            <TouchableWithoutFeedback   onPress={() => navigation.goBack()}>
            <Icon
              name="arrow-left"
              size={20}
              color="white"
            />
            </TouchableWithoutFeedback>
          </View>
        }
        centerComponent={
          <Text style={{color: '#fff', fontSize: 30, fontFamily: 'Ionicons'}}>
            InScan
          </Text>
        }
        rightComponent={
          <Button
            icon={<Icon name="share" color="white" size={15} />}
            title="Share"
            buttonStyle={{backgroundColor: 'transparent'}}
            onPress={() => shareFile()}
          />
        }></Header>
    </>
  );
};
export default DocumentHeader;
