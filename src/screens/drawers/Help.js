import React from 'react';
import {Button, Text, Card, ThemeProvider} from 'react-native-elements';
import {StatusBar} from 'react-native';
import MyHeader from '../../components/header/Header';

export default function HelpScreen({navigation}) {
  return (
    <ThemeProvider>
      <StatusBar backgroundColor="#dc143c" barStyle="light-content" />
      <MyHeader navigation={navigation} />
      <Text style={{textAlign: 'center'}}>Help screen under development</Text>
    </ThemeProvider>
  );
}
