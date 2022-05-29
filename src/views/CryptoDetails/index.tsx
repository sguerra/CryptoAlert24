import React, {useCallback, useEffect, useMemo} from 'react'
import type {FunctionComponent} from 'react'
import {StyleSheet, Text, SafeAreaView, StatusBar} from 'react-native'

import {Debug} from '../Debug'
import {useDispatch, useSelector} from 'react-redux'
import {selectAsset, selectWatchingAssets} from '../../reducers/globalReducer'
import {
  addWatchingAssetAsync,
  getAssetDetailAsync,
  removeWatchingAssetAsync,
} from '../../actions'
import {AnyAction} from 'redux'
import {CryptoDetailsHeader} from './CryptoDetailsHeader'
import {CryptoDetailsChart} from './CryptoDetailsChart'
import {CryptoLoading} from '../../components/CryptoLoading'

export const CryptoDetails: FunctionComponent = ({route}) => {
  const assetId = route.params.id
  const asset = useSelector(selectAsset)
  const watchingAssets = useSelector(selectWatchingAssets)

  const globalDispatch = useDispatch()

  const isAssetSelected = useMemo(() => {
    return watchingAssets.has(assetId)
  }, [watchingAssets, assetId])

  const onActionPressedHandler = useCallback(
    (pressedAssetId: string) => {
      if (isAssetSelected) {
        globalDispatch(removeWatchingAssetAsync(pressedAssetId))
      } else {
        globalDispatch(addWatchingAssetAsync(pressedAssetId))
      }
    },
    [isAssetSelected, globalDispatch],
  )

  useEffect(() => {
    globalDispatch(getAssetDetailAsync(assetId) as unknown as AnyAction)
  }, [globalDispatch, assetId])

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
      <Debug>
        <Text>Asset ID: {assetId}</Text>
      </Debug>
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
