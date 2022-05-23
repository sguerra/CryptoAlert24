import React from 'react'
import type {FunctionComponent} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'

export enum CryptoFilterEnum {
  All,
  Watching,
}

type CryptoFilterProps = {
  selectedFilter: CryptoFilterEnum
  onSelectionChange: (selectedFilter: CryptoFilterEnum) => void
}

export const CryptoFilter: FunctionComponent<CryptoFilterProps> = ({
  selectedFilter,
  onSelectionChange,
}) => {
  const unselectedStyle = styles.filterButton
  const selectedStyle = {...unselectedStyle, ...styles.filterButtonSelected}

  const allButtonStyle =
    selectedFilter === CryptoFilterEnum.All ? selectedStyle : unselectedStyle
  const watchingButtonStyle =
    selectedFilter === CryptoFilterEnum.Watching
      ? selectedStyle
      : unselectedStyle

  return (
    <View style={styles.filter}>
      <TouchableOpacity
        style={allButtonStyle}
        onPress={() => onSelectionChange(CryptoFilterEnum.All)}>
        <Text style={styles.filterText}>All</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={watchingButtonStyle}
        onPress={() => onSelectionChange(CryptoFilterEnum.Watching)}>
        <Text style={styles.filterText}>Watching</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  filter: {
    display: 'flex',
    backgroundColor: '#333',
    flexDirection: 'row',
    borderRadius: 10,
    margin: 5,
    height: 30,
  },
  filterButton: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'space-around',
    borderRadius: 10,
  },
  filterButtonSelected: {
    backgroundColor: '#666',
  },
  filterText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
})
