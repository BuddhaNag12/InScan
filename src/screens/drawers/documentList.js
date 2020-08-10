import React from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import MyHeader from '../../components/header/Header';
import {ListItem, Overlay, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
const RNFS = require('react-native-fs');

const DocumentList = ({navigation}) => {
  const [data, setData] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  let fetchDir = () => {
    RNFS.readDir(RNFS.ExternalDirectoryPath)
      .then((result) => {
        let arr = [];
        result.map((path) => {
          arr.push(path);
          // console.log(path.path);
        });
        let newArr = arr.filter((i) => i.path.substr(53) != 'Pictures');
        setData(newArr);
        // return Promise.all([RNFS.stat(result[0].path), result[0].path]);
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
  const DeleteDoc = (itemPath) => {
    try {
      RNFS.unlink(itemPath)
        .then(() => {
          fetchDir();
          setVisible(false);
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
      </View>
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <View>
              <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                <View style={{height: 60, width: 200, alignItems: 'center'}}>
                  <Text style={{color: 'black', fontFamily: 'Roboto'}}>
                    Delete ?
                  </Text>
                  <View style={{padding: 10}}>
                    <Button
                      raised
                      buttonStyle={{backgroundColor: 'transparent'}}
                      titleStyle={{color: 'black', fontFamily: 'Roboto'}}
                      title="Delete"
                      onPress={() => DeleteDoc(item.path)}
                    />
                  </View>
                </View>
              </Overlay>
              <ListItem
                leftAvatar={<Icon name="file-pdf" size={20} />}
                key={index}
                title={item.path.substr(53)}
                onPress={() =>
                  navigation.navigate('Document', {
                    pdfUri: item.path,
                  })
                }
                onLongPress={() => toggleOverlay()}
                bottomDivider
              />
            </View>
          );
        }}
      />
    </View>
  );
};

// const ListDos=()=>{
//   <FlatList
//   data={data}
//   keyExtractor={(_, index) => index.toString()}
//   renderItem={({item, index}) => (
//     <View>
//       <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
//         <View style={{height: 60, width: 200, alignItems: 'center'}}>
//           <Text style={{color: 'black', fontFamily: 'Roboto'}}>
//             Delete ?
//           </Text>
//           <View style={{padding: 10}}>
//             <Button
//               raised
//               buttonStyle={{backgroundColor: 'transparent'}}
//               titleStyle={{color: 'black', fontFamily: 'Roboto'}}
//               title="Delete"
//               onPress={() => DeleteDoc(item.path)}
//             />
//           </View>
//         </View>
//       </Overlay>
//       <ListItem
//         leftAvatar={<Icon name="file-pdf" size={20} />}
//         key={index}
//         title={item.path.substr(53)}
//         onPress={() =>
//           navigation.navigate('Document', {
//             pdfUri: item.path,
//           })
//         }
//         onLongPress={() => toggleOverlay()}
//         bottomDivider
//       />
//       )
//     </View>
//   )}
// />
// }
export default DocumentList;
