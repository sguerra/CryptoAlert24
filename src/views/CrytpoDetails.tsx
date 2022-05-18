import React, {useEffect} from 'react'
import type {FunctionComponent} from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'

import type {CryptoAsset} from '../services/types'
import {Debug} from './Debug'
import Utils from '../components/utils'
import {useDispatch, useSelector} from 'react-redux'
import {selectAsset} from '../reducers/globalReducer'
import {getAssetDetailAsync} from '../actions'
import {AnyAction} from 'redux'
import {CryptoPriceDelta} from '../components/CryptoPriceDelta'
import {CryptoPrice} from '../components/CryptoPrice'
import {useMarketcap} from '../components/hooks/useMarketcap'

type CryptoDetailsHeaderProps = {
  asset: CryptoAsset
}

const CryptoDetailsHeader: FunctionComponent<CryptoDetailsHeaderProps> = ({
  asset,
}) => {
  if (!asset) {
    return null
  }

  const {rank, current_marketcap_usd} = useMarketcap(asset)

  return (
    <>
      <View style={styles.header}>
        <View>
          <Image
            style={styles.detailImage}
            source={{uri: Utils.getImageSourceURI(asset.id, '128')}}
          />
        </View>
        <View style={styles.detailSummary}>
          <Text style={{...styles.detailText, ...styles.detailTitle}}>
            {asset.symbol}
          </Text>
          <Text style={{...styles.detailText, ...styles.detailSubtitle}}>
            {rank}: {asset.name}
          </Text>
          <Text style={styles.detailSubtitle}>
            Mkt. {Utils.formatLargePrice(current_marketcap_usd)}
          </Text>
        </View>
        <View style={styles.detailPrice}>
          <CryptoPrice asset={asset} />
          <CryptoPriceDelta asset={asset} />
        </View>
      </View>
      <View style={styles.detail}>
        <Text style={{...styles.detailText, ...styles.detailTitle}}>Chart</Text>
      </View>
    </>
  )
}

export const CryptoDetails: FunctionComponent = ({route}) => {
  const assetId = route.params.id
  const asset = useSelector(selectAsset)
  const globalDispatch = useDispatch()

  useEffect(() => {
    globalDispatch(getAssetDetailAsync(assetId) as unknown as AnyAction)
  }, [globalDispatch, assetId])

  return (
    <View style={styles.container}>
      {asset && <CryptoDetailsHeader asset={asset} />}
      <Debug>
        <Text>Asset ID: {assetId}</Text>
      </Debug>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#666',
  },
  header: {
    color: 'white',
    height: 120,
    backgroundColor: '#333',
    display: 'flex',
    flexDirection: 'row',
  },
  detail: {
    flexGrow: 1,
  },
  detailImage: {
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
  detailText: {
    color: 'white',
  },
  detailTitle: {
    fontSize: 24,
  },
  detailSubtitle: {
    fontSize: 16,
    color: '#AAA',
  },
})
