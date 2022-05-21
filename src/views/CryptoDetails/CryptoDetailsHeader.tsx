import React from 'react'
import type {FunctionComponent} from 'react'

import {CryptoPriceDelta} from '../../components/CryptoPriceDelta'
import {CryptoPrice} from '../../components/CryptoPrice'
import {useMarketcap} from '../../components/hooks/useMarketcap'
import type {CryptoAsset} from '../../services/types'
import {Image, StyleSheet, Text, View} from 'react-native'
import Utils from '../../components/utils'
import {CryptoSubscribeButton} from '../../components/CryptoSubscribeButton'

type CryptoDetailsHeaderProps = {
  asset: CryptoAsset
}

export const CryptoDetailsHeader: FunctionComponent<
  CryptoDetailsHeaderProps
> = ({asset}) => {
  const {rank} = useMarketcap(asset)

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
          <Text
            style={{...styles.headerText, ...styles.headerSubtitle}}
            numberOfLines={1}>
            {rank}: {asset.name}
          </Text>
        </View>
        <View style={styles.detailPrice}>
          <CryptoPrice asset={asset} />
        </View>
        <View style={styles.detailPrice}>
          <CryptoPriceDelta asset={asset} />
        </View>
        <View style={styles.detailSubscribe}>
          <CryptoSubscribeButton onClick={() => {}} isSelected={true} />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    color: 'white',
    height: 80,
    backgroundColor: '#333',
    display: 'flex',
    flexDirection: 'row',
  },
  headerImage: {
    width: 36,
    height: 36,
    margin: 24,
    marginLeft: 5,
    marginRight: 10,
    flexGrow: 0,
  },
  detailSummary: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    flexGrow: 1,
    alignSelf: 'center',
  },
  detailPrice: {
    display: 'flex',
    margin: 5,
    marginRight: 0,
    flexGrow: 0,
    flexDirection: 'column',
    alignSelf: 'center',
  },
  headerText: {
    color: 'white',
    marginRight: 0,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 12,
    maxWidth: '80%',
    color: '#AAA',
  },
  detailSubscribe: {
    alignSelf: 'center',
    flexGrow: 0,
  },
})
