import React from 'react'
import type {FunctionComponent} from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {CryptoAsset} from '../services/types'
import Utils from './utils'
import {CryptoPriceDelta} from './CryptoPriceDelta'
import {CryptoPrice} from './CryptoPrice'

type CryptoListItemProps = {
  asset: CryptoAsset
  onItemPressed: (id: string) => void
}

export const CryptoListItem: FunctionComponent<CryptoListItemProps> = ({
  asset,
  onItemPressed,
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
        <Text style={styles.itemSubtitle}>
          {asset.metrics.marketcap.rank}: {asset.name}
        </Text>
      </View>
      <CryptoPrice asset={asset} />
      <CryptoPriceDelta asset={asset} />
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
  },
  itemText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemSubtitle: {
    color: '#ddd',
    fontSize: 12,
  },
  itemImage: {
    height: 28,
    width: 28,
    margin: 7,
  },
})
