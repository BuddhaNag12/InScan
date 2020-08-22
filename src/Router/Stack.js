// import {createStackNavigator} from '@react-navigation/stack';

// const Stack = createStackNavigator();
// export const Stack = ({MyHome,Singup,DrawerNavigator,MultipleImgConvert,DocumentView,OcrText}) => {
//   return (
//     <Stack.Navigator>
//       {!user ? (
//         <>
//           <Stack.Screen
//             name="Home"
//             component={MyHome}
//             options={{headerShown: false}}
//           />
//           <Stack.Screen
//             name="Sign In"
//             component={Signin}
//             options={{
//               headerTitle: (props) => <SignInTitle {...props} />,
//               headerStyle: {
//                 backgroundColor: '#f4511e',
//                 opacity: 0.8,
//               },
//               headerTintColor: 'white',
//             }}
//           />
//           <Stack.Screen
//             name="Sign Up"
//             component={Singup}
//             options={{
//               headerTitle: (props) => <SignUpTitle {...props} />,
//               headerStyle: {
//                 backgroundColor: '#f4511e',
//                 opacity: 0.8,
//               },
//               headerTintColor: '#fff',
//             }}
//           />
//         </>
//       ) : (
//         <>
//           <Stack.Screen
//             name="Dashboard"
//             component={DrawerNavigator}
//             options={{headerShown: false}}
//           />
//           <Stack.Screen
//             name="Camera"
//             component={Camera}
//             options={{headerShown: false}}
//           />
//           <Stack.Screen name="Preview" component={Preview} />

//           <Stack.Screen
//             name="Convert"
//             component={MultipleImgConvert}
//             options={{
//               headerTitle: (props) => <MultipleEditingTitle {...props} />,
//               headerStyle: {
//                 backgroundColor: '#f4511e',
//                 opacity: 0.8,
//               },
//               headerTintColor: 'white',
//             }}
//           />
//           <Stack.Screen
//             name="Document"
//             component={DocumentView}
//             options={{
//               headerShown: false,
//             }}
//           />
//           <Stack.Screen
//             name="OCR TEXT"
//             component={OcrText}
//             options={{
//               headerTitle: 'OCR TEXT',
//             }}
//           />
//         </>
//       )}
//     </Stack.Navigator>
//   );
// };
