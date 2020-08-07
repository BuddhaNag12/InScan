import React from 'react';
import {Text, ThemeProvider} from 'react-native-elements';
import {StatusBar} from 'react-native';
import MyHeader from '../../components/header/Header';

export default function AboutScreen({navigation}) {
  return (
    <ThemeProvider>
      <StatusBar backgroundColor="#dc143c" barStyle="light-content" />
      <MyHeader navigation={navigation} />
      <Text style={{textAlign: 'center'}}>About screen under development</Text>
    </ThemeProvider>
  );
}
