import React from 'react'
import type {FunctionComponent} from 'react'
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native'

export const CryptoLoading: FunctionComponent = () => {
  return (
    <View style={styles.loading}>
      <View style={styles.center}>
        <ActivityIndicator size="large" color="white" />
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
  loadingText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center',
  },
})
