import React from 'react'
import type {FunctionComponent} from 'react'
import {Animated, Easing, StyleSheet, Text, View} from 'react-native'

export const CryptoLoading: FunctionComponent = () => {
  const rotateAnimated = new Animated.Value(0)

  Animated.loop(
    Animated.timing(rotateAnimated, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start()

  const spin = rotateAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  const imageStyle = [
    styles.loadingImage,
    {
      transform: [{rotate: spin}],
    },
  ]

  return (
    <View style={styles.loading}>
      <View style={styles.center}>
        <Animated.Image
          source={{
            uri: 'https://freesvg.org/img/1407708059.png',
          }}
          style={imageStyle}
        />

        <Text style={styles.loadingText}>Loading</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  loading: {
    display: 'flex',
    flexGrow: 1,
    alignContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    flexGrow: 1,
  },
  loadingImage: {
    height: 50,
    width: 50,
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center',
  },
})
