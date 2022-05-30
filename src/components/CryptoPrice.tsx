import React from 'react'
import type {FunctionComponent} from 'react'
import {StyleSheet, Text, View} from 'react-native'

import type {CryptoAsset} from '../services/types'
import Utils from './utils'
import {useMarketData} from './hooks/useMarketData'

type CryptoPriceProps = {
  asset: CryptoAsset
}

export const CryptoPrice: FunctionComponent<CryptoPriceProps> = ({asset}) => {
  const {price_usd} = useMarketData(asset)

  return (
    <View>
      <Text style={styles.priceText}>{Utils.formatPrice(price_usd)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  priceText: {
    color: 'white',
    textAlign: 'right',
    fontSize: 16,
    fontWeight: 'bold',
    margin: 12,
    marginLeft: 0,
    flexGrow: 1,
  },
})
