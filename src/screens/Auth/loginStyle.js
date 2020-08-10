import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAFFFE',
  },
  HeadingText: {
    fontFamily: 'Roboto_medium',
    fontSize: 50,
    color: '#FF8066',
    textAlign: 'center',
    textTransform:"uppercase"
  },
  button: {
    borderRadius: 30,
    padding: 10,
    backgroundColor: '#FC8686',
  },
  LoginForm: {
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
    height: 0.5 * height,
  },
});
