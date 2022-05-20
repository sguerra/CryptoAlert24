import React, {useEffect} from 'react'
import type {FunctionComponent} from 'react'
import {StyleSheet, Text, View} from 'react-native'

import {Debug} from '../Debug'
import {useDispatch, useSelector} from 'react-redux'
import {selectAsset} from '../../reducers/globalReducer'
import {getAssetDetailAsync} from '../../actions'
import {AnyAction} from 'redux'
import {CryptoDetailsHeader} from './CryptoDetailsHeader'
import {CryptoDetailsChart} from './CryptoDetailsChart'
import {CryptoLoading} from '../../components/CryptoLoading'

export const CryptoDetails: FunctionComponent = ({route}) => {
  const assetId = route.params.id
  const asset = useSelector(selectAsset)
  const globalDispatch = useDispatch()

  useEffect(() => {
    globalDispatch(getAssetDetailAsync(assetId) as unknown as AnyAction)
  }, [globalDispatch, assetId])

  return (
    <View style={styles.container}>
      {asset && asset?.id === assetId && (
        <>
          <CryptoDetailsHeader asset={asset} />
          <CryptoDetailsChart asset={asset} />
        </>
      )}
      {asset?.id !== assetId && <CryptoLoading />}
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
})
