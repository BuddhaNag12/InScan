import React from 'react';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  Button: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    flex: 1,
    padding: 3,
    margin: 2,
    color:"#FF7D85"
  },
});
const DrawerButtons = ({routeTo, navigation, title, IconName}) => {
  return (
    <Button
      titleStyle={{
        textTransform: 'capitalize',
        fontFamily: 'Roboto',
        color: '#46332E',
        textAlign: 'left',
        flex: 4,
      }}
      buttonStyle={styles.Button}
      icon={
        <Icon
          name={IconName}
          size={25}
          color="rgba(255,50,10,0.8)"
          style={styles.icon}
        />
      }
      title={title}
      onPress={() => navigation.navigate(routeTo)}
    />
  );
};

export default DrawerButtons;
