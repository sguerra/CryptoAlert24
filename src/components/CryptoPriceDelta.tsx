import React, {useMemo} from 'react'
import type {FunctionComponent} from 'react'
import {StyleSheet, Text, View} from 'react-native'

import type {CryptoAsset} from '../services/types'
import utils from './utils'
import {useMarketData} from './hooks/useMarketData'
import {Colors} from '../constants'

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
    minWidth: 65,
    margin: 8,
    marginRight: 0,
    textAlign: 'center',
  },
  priceDeltaInc: {
    backgroundColor: Colors.PriceDelta.INC,
  },
  priceDeltaDec: {
    backgroundColor: Colors.PriceDelta.DEC,
  },
  priceDeltaPercent: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13,
    fontWeight: 'bold',
    margin: 8,
  },
})
