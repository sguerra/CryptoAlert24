import React from 'react'
import type {FunctionComponent} from 'react'
import {FlatList, StyleSheet} from 'react-native'
import type {CryptoAsset} from '../services/types'
import {CryptoListItem} from './CryptoListItem'

type CryptoListProps = {
  assets: CryptoAsset[]
  onItemPressed: (id: string) => void
  onEndReached: () => void
}

export const CryptoList: FunctionComponent<CryptoListProps> = ({
  assets,
  onItemPressed,
  onEndReached,
}) => {
  return (
    <FlatList
      onEndReached={onEndReached}
      style={styles.list}
      renderItem={({item}) => (
        <CryptoListItem
          asset={item as CryptoAsset}
          onItemPressed={onItemPressed}
        />
      )}
      data={assets}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    margin: 5,
  },
})
