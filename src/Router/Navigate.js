import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';
// Component
import {SignInTitle, SignUpTitle,EditingTitle,MultipleEditingTitle} from '../components/HeaderTitle';
// import {DropDownButton} from '../screens/drawers/Documents';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
// stack
import MyHome from '../../App';
import Camera from '../screens/Camera/Camera';
import Profile from '../screens/Profile/Profile';
import Dashboard from '../screens/Dashboard/Dashboard';
import Signin from '../screens/Auth/SignIn';
import Singup from '../screens/Auth/SignUp';
import Preview from '../screens/Preview';
import MultipleImgConvert from '../screens/MultipleImgConvert';
import EditedPhotos from '../screens/EditedPhotos';

//drawers
import CustomDrawer from '../screens/drawers/drawerLayout/CustumDrawer';
import HelpScreen from '../screens/drawers/Help';
import AboutScreen from '../screens/drawers/About';
import MyGallery from '../screens/drawers/Gallery';
import DocumentView from '../screens/drawers/Documents';
// import ConvertImageToPdf from '../screens/PdfConvert';
import * as Animatable from 'react-native-animatable';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Drawer Navigation screens
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      drawerPosition="left"
      drawerType="front"
      minSwipeDistance={20.0}
      drawerStyle={{
        backgroundColor: '#EAFFFE',
        width: windowWidth / 2,
      }}>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Gallery" component={MyGallery} />
      <Drawer.Screen name="Help" component={HelpScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
    </Drawer.Navigator>
  );
}
// Initial Screen stack navigation
export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing)
    return (
      <Animatable.View
        animation="fadeInRight"
        easing={'ease-in'}
        style={{
          flex: 1,
          height: windowHeight,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color="red" />
      </Animatable.View>
    );
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <>
            <Stack.Screen
              name="Home"
              component={MyHome}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Sign In"
              component={Signin}
              options={{
                headerTitle: (props) => <SignInTitle {...props} />,
                headerStyle: {
                  backgroundColor: '#f4511e',
                  opacity: 0.8,
                },
              }}
            />
            <Stack.Screen
              name="Sign Up"
              component={Singup}
              options={{
                headerTitle: (props) => <SignUpTitle {...props} />,
                headerStyle: {
                  backgroundColor: '#f4511e',
                  opacity: 0.8,
                },
                headerTintColor: '#fff',
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Dashboard"
              component={DrawerNavigator}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Image View"
              component={Profile}
              options={{
                headerStyle: {
                  backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name="Camera"
              component={Camera}
              options={{headerShown: false}}
            />
            <Stack.Screen name="Preview" component={Preview} />
            <Stack.Screen name="Convert" component={MultipleImgConvert}
             options={{
              headerTitle: (props) => <MultipleEditingTitle {...props} />,
              headerStyle: {
                backgroundColor: '#f4511e',
                opacity: 0.8,
              },
            }}
            />
            <Stack.Screen name="Edited Photos" component={EditedPhotos}
             options={{
              headerTitle: (props) => <EditingTitle {...props} />,
              headerStyle: {
                backgroundColor: '#f4511e',
                opacity: 0.8,
              },
            }}
            />
            <Stack.Screen
              name="Document"
              component={DocumentView}
              options={{headerShown: true}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
