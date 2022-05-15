import React, {useCallback, useEffect, useMemo, useState} from 'react'
import type {FunctionComponent} from 'react'

import {View, Text, StyleSheet} from 'react-native'
import Assets from '../services/assets'

import {CryptoList} from '../components/CryptoList'
import type {CryptoAsset} from '../services/types'
import {Debug} from './Debug'
import {CryptoSearchInput} from '../components/CryptoSearchInput'

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
  const [page, setPage] = useState(1)
  const [assets, setAssets] = useState<CryptoAsset[]>([])
  const [assetFilter, setAssetFilter] = useState('')

  const service = useMemo(() => {
    return new Assets()
  }, [])

  const getAllAssets = useCallback(
    async (nextPage: number = 1) => {
      try {
        const {data} = await service.getAll(nextPage)

        if (nextPage === 1) {
          setAssets(data)
        } else {
          setAssets(assets.concat(data))
        }

        setPage(nextPage)
      } catch (err) {
        return null
      }
    },
    [assets, service],
  )

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
    getAllAssets(page + 1)
  }, [getAllAssets, page])

  const itemOnPressHandler = useCallback(
    (itemId: string) => {
      navigation.navigate('Details', {id: itemId})
    },
    [navigation],
  )

  useEffect(() => {
    setCount(count + 1)

    setAssets([])
    getAllAssets()
  }, [])

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
