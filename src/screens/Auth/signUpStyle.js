import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  inputStyle: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 60,
    padding: 6,
    backgroundColor: '#fefefe',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fefefe',
  },
  HeadingText: {
    fontFamily: 'Roboto_medium',
    fontWeight: 'normal',
    fontSize: 50,
    color: 'white',
    textAlign: 'center',
  },

  SignUpForm: {
    width: width - 10,
    padding: 10,
    margin: 5,
  },
  socialButtonContainer: {
    flex: 1,
  },
  heading2Text: {
    fontFamily: 'Roboto',
    textAlign: 'center',
  },
  box1: {
    borderBottomRightRadius: 75,
    backgroundColor: '#FFE4DE',
    height: 0.72 * height,
  },
});
