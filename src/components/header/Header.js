import React from 'react';
import {Header, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity, StatusBar} from 'react-native';

const MyHeader = ({navigation}) => {
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
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Icon style={{color: '#fff'}} size={25} name="bars" />
          </TouchableOpacity>
        }
        centerComponent={
          <Text style={{color: '#fff', fontSize: 30, fontFamily: 'Ionicons'}}>
            InScan
          </Text>
        }
      />
    </>
  );
};

export default MyHeader;
