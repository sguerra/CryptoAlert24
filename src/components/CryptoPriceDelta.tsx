import React, {useMemo} from 'react'
import type {FunctionComponent} from 'react'
import {StyleSheet, Text, View} from 'react-native'

import type {CryptoAsset} from '../services/types'
import utils from './utils'
import {useMarketData} from './hooks/useMarketData'

type CryptoPriceDeltaProps = {
  asset: CryptoAsset
}

export const CryptoPriceDelta: FunctionComponent<CryptoPriceDeltaProps> = ({
  asset,
}) => {
  const {percent_change_usd_last_24_hours} = useMarketData(asset)

  const deltaStyle = useMemo(() => {
    return {
      ...styles.priceDelta,
      ...(percent_change_usd_last_24_hours >= 0
        ? styles.priceDeltaInc
        : styles.priceDeltaDec),
    }
  }, [percent_change_usd_last_24_hours])

  return (
    <View style={deltaStyle}>
      <Text style={styles.priceDeltaPercent}>
        {utils.formatPercent(percent_change_usd_last_24_hours)}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  priceDelta: {
    borderRadius: 10,
    flexGrow: 0,
    minWidth: 80,
    margin: 8,
    textAlign: 'center',
  },
  priceDeltaInc: {
    backgroundColor: '#36c252',
  },
  priceDeltaDec: {
    backgroundColor: '#e04638',
  },
  priceDeltaPercent: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    margin: 5,
  },
})
