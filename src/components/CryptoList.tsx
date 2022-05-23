import React from 'react'
import type {FunctionComponent} from 'react'
import {FlatList, StyleSheet} from 'react-native'
import type {CryptoAsset} from '../services/types'
import {CryptoListItem} from './CryptoListItem'

type CryptoListProps = {
  assets: CryptoAsset[]
  selectedAssets: Map<string, string>
  onItemPressed: (id: string) => void
  onAddActionPressed: (id: string) => void
  onRemoveActionPressed: (id: string) => void
  onEndReached: () => void
}

export const CryptoList: FunctionComponent<CryptoListProps> = ({
  assets,
  selectedAssets,
  onItemPressed,
  onAddActionPressed,
  onRemoveActionPressed,
  onEndReached,
}) => {
  return (
    <FlatList
      onEndReached={onEndReached}
      style={styles.list}
      renderItem={({item}) => {
        const isSelected = selectedAssets.has(item.id)
        const onItemActionPressed = isSelected
          ? onRemoveActionPressed
          : onAddActionPressed

        return (
          <CryptoListItem
            asset={item as CryptoAsset}
            onItemPressed={onItemPressed}
            onItemActionPressed={onItemActionPressed}
            isSelected={isSelected}
          />
        )
      }}
      data={assets}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    margin: 5,
  },
})
