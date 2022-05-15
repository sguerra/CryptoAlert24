import React from 'react'
import type {FunctionComponent} from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {CryptoAsset} from '../services/types'
import Utils from './utils'

type CryptoListItemProps = {
  asset: CryptoAsset
  onItemPressed: (id: string) => void
}

export const CryptoListItem: FunctionComponent<CryptoListItemProps> = ({
  asset,
  onItemPressed,
}) => {
  const {market_data} = asset.metrics
  const {price_usd, percent_change_usd_last_24_hours} = market_data

  const deltaStyle = {
    ...styles.itemDelta,
    ...(percent_change_usd_last_24_hours >= 0
      ? styles.itemDeltaInc
      : styles.itemDeltaDec),
  }

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
      <Text style={{...styles.itemText, ...styles.itemPrice}}>
        {Utils.formatPrice(price_usd)}
      </Text>
      <View style={deltaStyle}>
        <Text style={{...styles.itemText, ...styles.itemPercent}}>
          {Utils.formatPercent(percent_change_usd_last_24_hours)}
        </Text>
      </View>
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
  itemPrice: {
    textAlign: 'right',
    fontSize: 18,
    fontWeight: 'bold',
    margin: 12,
  },
  itemImage: {
    height: 28,
    width: 28,
    margin: 7,
  },
  itemDelta: {
    borderRadius: 10,
    flexGrow: 0,
    minWidth: 80,
    margin: 8,
    textAlign: 'center',
  },
  itemDeltaInc: {
    backgroundColor: '#36c252',
  },
  itemDeltaDec: {
    backgroundColor: '#e04638',
  },
  itemPercent: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    margin: 5,
  },
})
