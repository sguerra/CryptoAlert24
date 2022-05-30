import React from 'react'
import type {FunctionComponent} from 'react'
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native'

type CryptoSubscribeButtonProps = {
  onPress: () => void
  isSelected: boolean
}

export const CryptoSubscribeButton: FunctionComponent<
  CryptoSubscribeButtonProps
> = ({onPress, isSelected}) => {
  const buttonTitle = isSelected ? '-' : '+'
  const buttonStyle = isSelected ? styles.selected : styles.unselected

  return (
    <View style={{...styles.container, ...buttonStyle}}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.buttonText}>{buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    width: 30,
    height: 30,
    borderRadius: 5,
    flexGrow: 0,
  },
  selected: {
    backgroundColor: '#DA2',
  },
  unselected: {
    backgroundColor: '#666',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },
})
