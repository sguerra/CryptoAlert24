import React from 'react'
import type {FunctionComponent} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {CryptoSubscribeButton} from './CryptoSubscribeButton'

export const CryptoWatchlistEmpty: FunctionComponent = () => {
  return (
    <View>
      <View style={styles.emptyListItem}>
        <Text style={styles.emptyText}>
          Start watching an asset by pressing on:
        </Text>
        <View style={styles.emptyListButton}>
          <CryptoSubscribeButton onPress={() => {}} isSelected={false} />
        </View>
      </View>
      <View style={styles.emptyListItem}>
        <Text style={styles.emptyText}>
          Stop watching an asset by pressing on:
        </Text>
        <View style={styles.emptyListButton}>
          <CryptoSubscribeButton onPress={() => {}} isSelected={true} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  emptyListItem: {
    margin: 15,
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  emptyText: {
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    flexShrink: 1,
    flexGrow: 1,
    margin: 10,
  },
  emptyListButton: {
    flexGrow: 1,
  },
})
