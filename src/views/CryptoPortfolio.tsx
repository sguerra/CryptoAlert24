import React, {useCallback, useEffect, useMemo, useState} from 'react'
import type {FunctionComponent} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import type {AnyAction} from 'redux'

import {CryptoList} from '../components/CryptoList'
import type {CryptoAsset} from '../services/types'
import {Debug} from './Debug'
import {CryptoSearchInput} from '../components/CryptoSearchInput'
import {useDispatch, useSelector} from 'react-redux'
import {selectAllAssets, selectPage} from '../reducers/globalReducer'
import {getAllAssetsAsync} from '../actions'

function filterAssets(assetList: CryptoAsset[], assetFilter: string = '') {
  if (assetFilter === '') {
    return assetList
  }

  const normalizedSearchText = assetFilter.toUpperCase()

  return assetList.filter(asset => {
    const normalizedAssetName = asset.name.toUpperCase()
    const normalizedAssetSymbol = asset.symbol.toUpperCase()

    return (
      normalizedAssetName.indexOf(normalizedSearchText) >= 0 ||
      normalizedAssetSymbol.indexOf(normalizedSearchText) >= 0
    )
  })
}

export const CryptoPortfolio: FunctionComponent = ({navigation}) => {
  const [count, setCount] = useState(0)
  const [assetFilter, setAssetFilter] = useState('')

  const globalDispatch = useDispatch()
  const assets = useSelector(selectAllAssets)
  const page = useSelector(selectPage)

  const filteredAssets = useMemo(() => {
    return filterAssets(assets, assetFilter)
  }, [assets, assetFilter])

  const searchTextHandler = useCallback(
    (searchText: string) => {
      setAssetFilter(searchText)
    },
    [setAssetFilter],
  )

  const endOfListReachedHandler = useCallback(() => {
    globalDispatch(getAllAssetsAsync(page + 1) as unknown as AnyAction)
  }, [globalDispatch, page])

  const itemOnPressHandler = useCallback(
    (itemId: string) => {
      navigation.navigate('Details', {id: itemId})
    },
    [navigation],
  )

  useEffect(() => {
    setCount(count + 1)
    globalDispatch(getAllAssetsAsync() as unknown as AnyAction)
  }, [globalDispatch])

  return (
    <View style={styles.container}>
      <CryptoSearchInput onChangeText={searchTextHandler} />
      <CryptoList
        onEndReached={endOfListReachedHandler}
        onItemPressed={itemOnPressHandler}
        assets={filteredAssets}
      />
      <Debug>
        <Text>Render count: {count}</Text>
        <Text>List lenght: {assets.length}</Text>
        <Text>List page: {page}</Text>
      </Debug>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'space-between',
    height: '100%',
    backgroundColor: '#4d4d4d',
  },
  searchInput: {
    height: 50,
    marginTop: 5,
    backgroundColor: '#666',
    color: 'white',
    fontSize: 18,
  },
})
