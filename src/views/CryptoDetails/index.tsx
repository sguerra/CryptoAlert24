import React from 'react'
import type {FunctionComponent} from 'react'
import {StyleSheet, SafeAreaView, StatusBar} from 'react-native'

import {CryptoDetailsHeader} from './CryptoDetailsHeader'
import {CryptoDetailsChart} from './CryptoDetailsChart'
import {CryptoLoading} from '../../components/CryptoLoading'
import {useAssetDetails} from '../hooks'

export const CryptoDetails: FunctionComponent = ({route}) => {
  const assetId = route.params.id

  const {asset, isAssetSelected, onActionPressedHandler} =
    useAssetDetails(assetId)

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      {asset && asset?.id === assetId && (
        <>
          <CryptoDetailsHeader
            asset={asset}
            isSelected={isAssetSelected}
            onActionPressed={onActionPressedHandler}
          />
          <CryptoDetailsChart asset={asset} />
        </>
      )}
      {asset?.id !== assetId && <CryptoLoading />}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#444',
  },
})
