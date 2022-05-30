import React from 'react'
import type {FunctionComponent} from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {CryptoAsset} from '../services/types'
import Utils from './utils'
import {CryptoPriceDelta} from './CryptoPriceDelta'
import {CryptoPrice} from './CryptoPrice'
import {CryptoSubscribeButton} from './CryptoSubscribeButton'

type CryptoListItemProps = {
  asset: CryptoAsset
  isSelected: boolean
  onItemPressed: (id: string) => void
  onItemActionPressed: (id: string) => void
}

export const CryptoListItem: FunctionComponent<CryptoListItemProps> = ({
  asset,
  isSelected,
  onItemPressed,
  onItemActionPressed,
}) => {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        onItemPressed(asset.id)
      }}>
      <Image
        source={{uri: Utils.getImageSourceURI(asset.id, '32')}}
        style={styles.itemImage}
      />
      <View style={styles.itemName}>
        <Text style={styles.itemText}>{asset.symbol}</Text>
        <Text style={styles.itemSubtitle} numberOfLines={1}>
          {asset.metrics.marketcap.rank}: {asset.name}
        </Text>
      </View>
      <CryptoPrice asset={asset} />
      <CryptoPriceDelta asset={asset} />
      <CryptoSubscribeButton
        onPress={() => {
          onItemActionPressed(asset.id)
        }}
        isSelected={isSelected}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    width: '100%',
    height: 50,
    color: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#333',
    marginTop: 5,
    borderRadius: 10,
  },
  itemName: {
    flexGrow: 1,
    margin: 6,
    marginRight: 0,
  },
  itemText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  itemSubtitle: {
    color: '#ddd',
    fontSize: 11,
    maxWidth: '80%',
  },
  itemImage: {
    height: 24,
    width: 24,
    margin: 10,
    marginRight: 2,
    marginLeft: 5,
  },
})
