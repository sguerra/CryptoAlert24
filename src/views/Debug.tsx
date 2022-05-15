import React, {ReactElement} from 'react'
import type {FunctionComponent} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import Config from 'react-native-config'

type DebugProps = {
  children?: ReactElement | ReactElement[]
}

export const Debug: FunctionComponent<DebugProps> = ({children}) => {
  return (
    <View style={styles.container}>
      <Text>App Mode: {Config.APP_MODE}</Text>
      <Text>API URI: {Config.API_BASE_URI}</Text>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: 25,
    backgroundColor: 'white',
    padding: 15,
  },
})
