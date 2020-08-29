import React from 'react';
import {
  TouchableOpacity,
  FlatList,
  View,
  Image,
} from 'react-native';
import {Icon} from 'react-native-elements';

const ListView = ({
  photos,
  selectedImage,
  DeSelectImage,
  imgUri,
  openPreview,
  ocrScan
}) => {
  return (
    <FlatList
      data={photos}
      keyExtractor={(_, index) => index.toString()}
      numColumns={3}
      scrollEnabled={true}
      renderItem={({item, index}) => (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <TouchableOpacity
            disabled={imgUri.find((i) =>
              i == item.node.image.uri ? true : false,
            )}
            activeOpacity={0.2}
            onPress={() => selectedImage(item.node.image.uri, index)}
            onLongPress={() => selectedImage(item.node.image.uri, index)}>
            <View
              style={{
                position: 'absolute',
                zIndex: 100,
                left: '40%',
                top: '40%',
              }}>
              {imgUri.find((i) => i == item.node.image.uri) ? (
                <TouchableOpacity style={{width: 30, height: 30}}>
                  <Icon
                    name="checkmark-outline"
                    size={25}
                    type="ionicon"
                    color="#C34A36"
                    onPress={() => DeSelectImage(item.node.image.uri)}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
            <View
              style={{
                position: 'absolute',
                zIndex: 100,
                left: '70%',
                top: '10%',
              }}>
              {imgUri.find((i) => i == item.node.image.uri) ? (
                <TouchableOpacity style={{width: 30, height: 30}}>
                  <Icon
                    name="text-outline"
                    size={20}
                    type="ionicon"
                    color="white"
                    onPress={() => ocrScan(item.node.image.uri)}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
            <View
              style={{
                position: 'absolute',
                zIndex: 100,
                left: '10%',
                top: '70%',
              }}>
              {imgUri.find((i) => i == item.node.image.uri) ? (
                <TouchableOpacity style={{width: 30, height: 30}}>
                  <Icon
                    name="expand-outline"
                    size={20}
                    type="ionicon"
                    color="white"
                    onPress={() => openPreview(item.node.image.uri)}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
            <Image
              source={{uri: item.node.image.uri}} // Use item to set the image source
              key={index} // Important to set a key for list items
              style={{
                width: 120,
                height: 120,
                borderWidth: 3,
                borderColor: 'white',
                resizeMode: 'cover',
                margin: 8,
                opacity: imgUri.find((i) => i == item.node.image.uri) ? 0.4 : 1,
              }}
            />
          </TouchableOpacity>
        </View>
      )}
    />
  );
};
export default ListView;
