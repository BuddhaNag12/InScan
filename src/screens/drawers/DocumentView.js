import React from 'react';
import {StyleSheet, Dimensions, View, Text} from 'react-native';
import Pdf from 'react-native-pdf';
import DocumentHeader from '../../components/DocumentHeader';
import PdfContext from '../../components/context';

export default function DocumentView({route, navigation}) {
  const {pdfUri} = route.params;
  const source = {uri: pdfUri, cache: true};

  return (
    <PdfContext.Provider value={pdfUri}>
      <DocumentHeader navigation={navigation} />
      <View style={styles.container}>
        <Pdf
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
              console.log(numberOfPages);
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
    </PdfContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  pdf: {
    flex: 1,
    padding: 10,
    width: Dimensions.get('window').width - 10,
    height: Dimensions.get('window').height,
  },
});
