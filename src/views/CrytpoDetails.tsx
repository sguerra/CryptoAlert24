import React, {useEffect, useState} from 'react'
import type {FunctionComponent} from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'
import Assets from '../services/assets'

import type {CryptoAsset} from '../services/types'
import {Debug} from './Debug'
import Utils from '../components/utils'

type CryptoDetailsHeaderProps = {
  asset: CryptoAsset
}

const CryptoDetailsHeader: FunctionComponent<CryptoDetailsHeaderProps> = ({
  asset,
}) => {
  return (
    <>
      <View style={Styles.header}>
        <View>
          <Image
            style={Styles.detailImage}
            source={{uri: Utils.getImageSourceURI(asset.id, '128')}}
          />
        </View>
        <View style={Styles.detailSummary}>
          <Text style={{...Styles.detailText, ...Styles.detailTitle}}>
            {asset.symbol}
          </Text>
          <Text style={{...Styles.detailText, ...Styles.detailSubtitle}}>
            {asset.name}
          </Text>
        </View>
      </View>
      <View style={Styles.detail}>
        <Text style={{...Styles.detailText, ...Styles.detailTitle}}>Chart</Text>
      </View>
    </>
  )
}

export const CryptoDetails: FunctionComponent = ({route}) => {
  const assetId = route.params.id
  const [asset, setAsset] = useState(null)

  useEffect(() => {
    new Assets().getProfile(assetId).then(jsonResponse => {
      setAsset(jsonResponse.data)
    })
  }, [assetId])

  return (
    <View style={Styles.container}>
      {asset && <CryptoDetailsHeader asset={asset} />}
      <Debug>
        <Text>Asset ID: {assetId}</Text>
      </Debug>
    </View>
  )
}

const Styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#666',
  },
  header: {
    color: 'white',
    height: 100,
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
