import React from 'react';
import {Header, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity, StatusBar, View} from 'react-native';

const MyHeader = ({navigation, isSelectionAll, SelectAll}) => {
  return (
    <View>
      <StatusBar backgroundColor="#FF7772" barStyle="light-content" />
      <Header
        containerStyle={{
          borderBottomColor: 'transparent',
          elevation: 5,
          backgroundColor: '#FF7772',
          opacity: 1,
        }}
        leftComponent={
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Icon style={{color: '#fff'}} size={25} name="bars" />
          </TouchableOpacity>
        }
        centerComponent={
          <Text style={{color: '#fff', fontSize: 30, fontFamily: 'Ionicons'}}>
            InScan
          </Text>
        }
        rightComponent={
          isSelectionAll ? (
            <TouchableOpacity onPress={() => SelectAll()}>
              <Icon style={{color: '#fff'}} size={25} name="th" />
            </TouchableOpacity>
          ) : null
        }
      />
    </View>
  );
};

export default MyHeader;
