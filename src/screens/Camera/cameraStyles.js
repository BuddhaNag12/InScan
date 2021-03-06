import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  FabButton: {
    zIndex: 999,
    borderRadius: 30,
    position: 'absolute',
    width: 50,
    height: 50,
    justifyContent: 'center',
    right: 350,
    bottom: 670,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  DrawerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  DrawerView: {
    elevation: 2,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 30,
    padding: 10,
    position: 'absolute',
    right: 0,
    top: 50,
    width: windowWidth,
    height: 500,
  },

  aboveButtomNavigationView: {
    width: windowWidth - 40,
    height: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 5,
    marginHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'grey',
  },
  buttomNavigationView: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: windowWidth,
    height: windowHeight / 8 - 25,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  whiteBalanceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    alignContent: 'space-around',
    flexWrap: 'wrap',
    height: 150,
  },
  whiteBalanceWrapper: {
    position: 'absolute',
    height: 200,
    width: windowWidth - 30,
    top: 50,
    right: 10,
  },
});

export default styles;
