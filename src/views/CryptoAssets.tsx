import React, {useCallback} from 'react'
import type {FunctionComponent} from 'react'
import {StyleSheet, SafeAreaView, StatusBar} from 'react-native'

import {CryptoList} from '../components/CryptoList'
import {CryptoSearchInput} from '../components/CryptoSearchInput'
import {CryptoLoading} from '../components/CryptoLoading'
import {CryptoFilter} from '../components/CryptoFilter'
import {CryptoWatchlistEmpty} from '../components/CryptoWatchlistEmpty'
import {CryptoFooter} from '../components/CryptoFooter'
import {useAssets} from './hooks'

export const CryptoAssets: FunctionComponent = ({navigation}) => {
  const {
    selectedFilter,
    filteredAssets,
    refreshingList,
    areAllAssetsLoaded,
    watchingAssets,
    searchTextHandler,
    endOfListReachedHandler,
    onFilterSelectionChangeHandler,
    itemActionOnAddHandler,
    itemActionOnRemoveHandler,
    onRefreshHandler,
  } = useAssets()

  const itemOnPressHandler = useCallback(
    (itemId: string) => {
      navigation.navigate('Details', {id: itemId})
    },
    [navigation],
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <CryptoSearchInput onChangeText={searchTextHandler} />

      {!areAllAssetsLoaded && <CryptoLoading />}
      {areAllAssetsLoaded && (
        <>
          <CryptoFilter
            selectedFilter={selectedFilter}
            onSelectionChange={onFilterSelectionChangeHandler}
          />
          <CryptoList
            refreshing={refreshingList}
            onRefresh={onRefreshHandler}
            onEndReached={endOfListReachedHandler}
            onItemPressed={itemOnPressHandler}
            onAddActionPressed={itemActionOnAddHandler}
            onRemoveActionPressed={itemActionOnRemoveHandler}
            assets={filteredAssets}
            selectedAssets={watchingAssets}
            ListEmptyComponent={<CryptoWatchlistEmpty />}
          />
        </>
      )}
      <CryptoFooter />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'space-between',
    height: '100%',
    backgroundColor: '#444',
  },
  searchInput: {
    height: 50,
    marginTop: 5,
    backgroundColor: '#666',
    color: 'white',
    fontSize: 18,
  },
})
