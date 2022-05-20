import React from 'react'
import type {FunctionComponent} from 'react'

import {CryptoPriceDelta} from '../../components/CryptoPriceDelta'
import {CryptoPrice} from '../../components/CryptoPrice'
import {useMarketcap} from '../../components/hooks/useMarketcap'
import type {CryptoAsset} from '../../services/types'
import {Image, StyleSheet, Text, View} from 'react-native'
import Utils from '../../components/utils'

type CryptoDetailsHeaderProps = {
  asset: CryptoAsset
}

export const CryptoDetailsHeader: FunctionComponent<
  CryptoDetailsHeaderProps
> = ({asset}) => {
  const {rank, current_marketcap_usd} = useMarketcap(asset)

  return (
    <>
      <View style={styles.header}>
        <View>
          <Image
            style={styles.headerImage}
            source={{uri: Utils.getImageSourceURI(asset.id, '128')}}
          />
        </View>
        <View style={styles.detailSummary}>
          <Text style={{...styles.headerText, ...styles.headerTitle}}>
            {asset.symbol}
          </Text>
          <Text style={{...styles.headerText, ...styles.headerSubtitle}}>
            {rank}: {asset.name}
          </Text>
          <Text style={styles.headerSubtitle}>
            Mkt. {Utils.formatLargePrice(current_marketcap_usd)}
          </Text>
        </View>
        <View style={styles.detailPrice}>
          <CryptoPrice asset={asset} />
          <CryptoPriceDelta asset={asset} />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    color: 'white',
    height: 120,
    backgroundColor: '#333',
    display: 'flex',
    flexDirection: 'row',
  },
  headerImage: {
    width: 64,
    height: 64,
    margin: 12,
  },
  detailSummary: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    margin: 20,
  },
  detailPrice: {
    display: 'flex',
    padding: 7.5,
  },
  headerText: {
    color: 'white',
  },
  headerTitle: {
    fontSize: 24,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#AAA',
  },
})
