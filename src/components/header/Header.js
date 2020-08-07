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
          backgroundColor: '#F46049',
          opacity: 0.8,
        }}
        leftComponent={
          <TouchableOpacity>
            <Icon
              style={{color: '#fff'}}
              size={22}
              name="bars"
              onPress={() => navigation.toggleDrawer()}
            />
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
