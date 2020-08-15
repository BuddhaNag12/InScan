import React, {useState, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';
// Component
import {
  SignInTitle,
  SignUpTitle,
  MultipleEditingTitle,
} from '../components/HeaderTitle';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
// stack
import MyHome from '../../App';
import Camera from '../screens/Camera/Camera';
import Dashboard from '../screens/Dashboard/Dashboard';
import Signin from '../screens/Auth/SignIn';
import Singup from '../screens/Auth/SignUp';
import Preview from '../screens/Preview';
import OcrText from '../screens/OcrText';
import MultipleImgConvert from '../screens/MultipleImgConvert/MultipleImgConvert';
import EditedPhotos from '../screens/EditedPhotos/EditedPhotos';
//drawers
import CustomDrawer from '../screens/drawers/drawerLayout/CustumDrawer';
import HelpScreen from '../screens/drawers/Help';
import AboutScreen from '../screens/drawers/About';
import MyGallery from '../screens/drawers/Gallery';
import DocumentView from '../screens/drawers/DocumentView';
import DocumentList from '../screens/drawers/documentList';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;

// Drawer Navigation screens
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      drawerPosition="left"
      drawerType="back"
      minSwipeDistance={10}
      overlayColor="rgba(222,80,0,0.2)"
      drawerStyle={{
        backgroundColor: '#EAFFFE',
        width: windowWidth / 2 + 80,
      }}>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Gallery" component={MyGallery} />
      <Drawer.Screen name="Help" component={HelpScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
      <Drawer.Screen name="Edited Documents" component={EditedPhotos} />
      <Drawer.Screen name="Documents" component={DocumentList} />
    </Drawer.Navigator>
  );
}
// Initial Screen stack navigation
export default function App({navigation}) {
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
  }, [navigation]);

  if (initializing) {
    return <ActivityIndicator size="large" />;
  }
  return (
    <NavigationContainer >
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
                headerTintColor: 'white',
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
              name="Camera"
              component={Camera}
              options={{headerShown: false}}
            />
            <Stack.Screen name="Preview" component={Preview} />

            <Stack.Screen
              name="Convert"
              component={MultipleImgConvert}
              options={{
                headerTitle: (props) => <MultipleEditingTitle {...props} />,
                headerStyle: {
                  backgroundColor: '#f4511e',
                  opacity: 0.8,
                },
              }}
            />
            <Stack.Screen
              name="Document"
              component={DocumentView}
              options={{
              headerShown:false,
              }}
            />
            <Stack.Screen
              name="OCR TEXT"
              component={OcrText}
              options={{
                headerTitle: 'OCR TEXT',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
