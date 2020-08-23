import React from 'react';
import {Text, View, FlatList, TouchableWithoutFeedback} from 'react-native';
import MyHeader from '../../components/header/Header';
import {ListItem, Overlay, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Share from 'react-native-share';
const RNFS = require('react-native-fs');

const DocumentList = ({navigation}) => {
  const [data, setData] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const [imagePath, setImagePath] = React.useState();
  const toggleOverlay = (itemPath) => {
    setVisible(!visible);
    setImagePath(itemPath);
  };
  const shareFile = (PdfUri) => {
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
  let fetchDir = () => {
    RNFS.readDir(RNFS.ExternalDirectoryPath)
      .then((result) => {
        let arr = [];
        result.map((path) => {
          arr.push(path);
        });
        let newArr = arr.filter((i) => i.path.substr(53) != 'Pictures');
        setData(newArr);
      })
      .catch((err) => {
        console.log(err.message, err.code);
      });
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchDir();
    });
    return unsubscribe;
  }, [navigation]);
  const DeleteDoc = () => {
    try {
      RNFS.unlink(imagePath)
        .then(() => {
          fetchDir();
          setVisible(false);
          setImagePath();
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const IsDocs = () => {
    if (data.length > 0) {
      return (
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Roboto',
            textTransform: 'capitalize',
          }}>
          Documents
        </Text>
      );
    } else {
      return (
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Roboto',
            textTransform: 'capitalize',
          }}>
          No Documents Found
        </Text>
      );
    }
  };

  return (
    <View style={{flex: 1}}>
      <MyHeader navigation={navigation} />
      <View style={{height: 50, alignItems: 'center'}}>
        <IsDocs />
        <Text style={{paddingHorizontal: 4, fontSize: 18, paddingVertical: 4}}>
          No of Documents : {data.length}
        </Text>
      </View>
      <Overlay
        animationType="fade"
        isVisible={visible}
        onBackdropPress={toggleOverlay}>
        <View style={{height: 60, width: 200, alignItems: 'center'}}>
          <Text style={{color: 'black', fontFamily: 'Roboto'}}>Delete ?</Text>
          <View style={{padding: 10}}>
            <Button
              raised
              buttonStyle={{
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: 'red',
              }}
              titleStyle={{color: 'red', fontFamily: 'Roboto'}}
              title="Delete"
              onPress={() => DeleteDoc()}
            />
          </View>
        </View>
      </Overlay>
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <View>
              <ListItem
                leftIcon={<Icon name="file-pdf" size={20} />}
                rightIcon={
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                    }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 10,
                        width: 100,
                      }}>
                      <TouchableWithoutFeedback
                        onPress={() => shareFile(item.path)}>
                        <Icon name="share" size={24} />
                      </TouchableWithoutFeedback>
                      <TouchableWithoutFeedback
                        onPress={() => toggleOverlay(item.path)}>
                        <Icon name="trash" size={24} />
                      </TouchableWithoutFeedback>
                    </View>
                  </View>
                }
                key={index}
                title={item.path.substr(53)}
                onPress={() =>
                  navigation.navigate('Document', {
                    pdfUri: item.path,
                  })
                }
                onLongPress={() => toggleOverlay(item.path)}
                bottomDivider
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default DocumentList;
