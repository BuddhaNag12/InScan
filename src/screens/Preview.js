import React from 'react'
import { View, Dimensions, Animated } from 'react-native'
import { PinchGestureHandler, State } from 'react-native-gesture-handler'

const { width , height} = Dimensions.get('window')

const PreviewImg = ({route}) => {
  scale = new Animated.Value(1)

  onZoomEvent = Animated.event(
    [
      {
        nativeEvent: { scale: this.scale }
      }
    ],
    {
      useNativeDriver: true
    }
  )

  onZoomStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(this.scale, {
        toValue: 1,
        useNativeDriver: true
      }).start()
    }
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <PinchGestureHandler
        onGestureEvent={this.onZoomEvent}
        onHandlerStateChange={this.onZoomStateChange}>
        <Animated.Image
         source={{uri: route.params.imgPath}}
          style={{
            width: width,
            height: height,
            transform: [{ scale: this.scale }]
          }}
          resizeMode='contain'
        />
      </PinchGestureHandler>
    </View>
  )
}
export default PreviewImg;
