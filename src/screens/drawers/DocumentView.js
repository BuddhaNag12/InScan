import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {Button} from 'react-native-elements';

import Pdf from 'react-native-pdf';
import Share from 'react-native-share';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function DocumentView({route}) {
  const {pdfUri} = route.params;
  const source = {uri: pdfUri, cache: true};
  const shareFile = () => {
    const shareOptions = {
      title: 'Share via',
      url: `file://${pdfUri}`,
    };
    Share.open(shareOptions)
      .then((res) => {
        console.log('shared ', res);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.pdfContainer}>
        <View style={{alignItems: 'flex-end'}}>
          <Button
            title="Share this pdf"
            onPress={() => shareFile()}
            icon={
              <Icon
              name="file-pdf"
              size={20}
              />
            }
            buttonStyle={{
              backgroundColor: "transparent"
            }}
            titleStyle={{color: 'black', fontFamily: 'Roboto'}}
          />
        </View>
        <Pdf
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`current page: ${page}`);
          }}
          onError={(error) => {
            console.log(error);
          }}
          onPressLink={(uri) => {
            console.log(`Link presse: ${uri}`);
          }}
          style={styles.pdf}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  pdfContainer: {
    flex: 1,
  },
});
