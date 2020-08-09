import React from 'react';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  Button: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0.6,
    borderBottomColor: 'grey',
  },
  icon: {
    flex: 1,
    padding: 3,
    margin: 2,
  },
});
const DrawerButtons = ({routeTo, navigation, title, IconName}) => {
  return (
    <Button
      titleStyle={{
        textTransform: 'uppercase',
        fontFamily: 'Ionicons',
        color: 'black',
        textAlign: 'center',
      }}
      buttonStyle={styles.Button}
      icon={
        <Icon name={IconName} size={25} color="#FF6366" style={styles.icon} />
      }
      title={title}
      onPress={() => navigation.navigate(routeTo)}
    />
  );
};

export default DrawerButtons;
