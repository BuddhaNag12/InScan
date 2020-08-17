import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {StyleSheet, View} from 'react-native';
import {DrawerItem} from '@react-navigation/drawer';
const styles = StyleSheet.create({
  Button: {
    flex: 1,
    justifyContent: 'center',
  },
});
const DrawerButtons = ({routeTo, navigation, title, IconName}) => {
  return (
    <DrawerItem
      label={title}
      style={{...styles.Button}}
      labelStyle={{
        fontFamily: 'Roboto',
        color: 'grey',
      }}
      onPress={() => navigation.navigate(routeTo)}
      icon={({focused}) => {
        return (
          <View style={{width: 40}}>
            <Icon
              name={IconName}
              size={25}
              color="rgba(255,50,10,0.8)"
              style={{color: '#FF7772'}}
            />
          </View>
        );
      }}
    />
  );
};

export default DrawerButtons;
