import React from 'react';
import {ActivityIndicator, View, Image, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('screen');

const PreviewImg = ({route}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={{uri: route.params.imgPath}}
        style={{height: height - 400, width: width}}
        PlaceholderContent={<ActivityIndicator />}
      />
    </View>
  );
};

export default PreviewImg;
