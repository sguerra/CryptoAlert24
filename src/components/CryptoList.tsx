import React, {ReactElement} from 'react'
import type {FunctionComponent} from 'react'
import {FlatList, RefreshControl, StyleSheet} from 'react-native'
import type {CryptoAsset} from '../services/types'
import {CryptoListItem} from './CryptoListItem'

type CryptoListProps = {
  assets: CryptoAsset[]
  selectedAssets: Map<string, string>
  ListEmptyComponent?: ReactElement
  refreshing: boolean
  onItemPressed: (id: string) => void
  onAddActionPressed: (id: string) => void
  onRemoveActionPressed: (id: string) => void
  onEndReached: () => void
  onRefresh: () => void
}

export const CryptoList: FunctionComponent<CryptoListProps> = ({
  assets,
  selectedAssets,
  refreshing,
  ListEmptyComponent = null,
  onItemPressed,
  onAddActionPressed,
  onRemoveActionPressed,
  onEndReached,
  onRefresh,
}) => {
  return (
    <FlatList
      onEndReached={onEndReached}
      style={styles.list}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
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
      ListEmptyComponent={ListEmptyComponent}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    margin: 5,
  },
})
