import React from 'react'
import type {FunctionComponent} from 'react'
import {StyleSheet, TextInput} from 'react-native'

type CryptoSearchInputProps = {
  onChangeText: (searchText: string) => void
}

export const CryptoSearchInput: FunctionComponent<CryptoSearchInputProps> = ({
  onChangeText,
}) => {
  return (
    <TextInput
      style={styles.searchInput}
      placeholder="Search..."
      placeholderTextColor="white"
      onChangeText={onChangeText}
    />
  )
}

const styles = StyleSheet.create({
  searchInput: {
    height: 50,
    marginTop: 5,
    backgroundColor: '#666',
    color: 'white',
    fontSize: 18,
  },
})
