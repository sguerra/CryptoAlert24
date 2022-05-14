import React from 'react'
import type {FunctionComponent} from 'react'
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Config from 'react-native-config'
import type {CryptoAsset} from '../services/types'

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
      renderItem={({item}) => {
        const imgSourceURI = `${Config.API_IMG_URI}/${item.id}/32.png?v=2`

        const {market_data} = item.metrics

        const price_usd = Math.trunc(market_data.price_usd * 100) / 100
        const percent_change_usd_last_24_hours =
          Math.trunc(market_data.percent_change_usd_last_24_hours * 100) / 100

        const deltaStyle = {
          ...styles.itemDelta,
          ...(percent_change_usd_last_24_hours >= 0
            ? styles.itemDeltaInc
            : styles.itemDeltaDec),
        }

        return (
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              onItemPressed(item.id)
            }}>
            <Image source={{uri: imgSourceURI}} style={styles.itemImage} />
            <View style={styles.itemName}>
              <Text style={styles.itemText}>{item.symbol}</Text>
              <Text style={styles.itemSubtitle}>{item.name}</Text>
            </View>
            <Text style={{...styles.itemText, ...styles.itemPrice}}>
              {price_usd}
            </Text>
            <View style={deltaStyle}>
              <Text style={{...styles.itemText, ...styles.itemPercent}}>
                {percent_change_usd_last_24_hours} %
              </Text>
            </View>
          </TouchableOpacity>
        )
      }}
      data={assets}
    />
  )
}

const styles = StyleSheet.create({
  list: {},
  item: {
    width: '100%',
    height: 50,
    color: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#333',
    marginTop: 5,
    borderRadius: 10,
  },
  itemName: {
    flexGrow: 1,
  },
  itemText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemSubtitle: {
    color: '#ddd',
    fontSize: 12,
  },
  itemPrice: {
    textAlign: 'right',
    fontSize: 18,
    fontWeight: 'bold',
    margin: 12,
  },
  itemImage: {
    height: 28,
    width: 28,
    margin: 7,
  },
  itemDelta: {
    borderRadius: 10,
    flexGrow: 0,
    minWidth: 80,
    margin: 8,
    textAlign: 'center',
  },
  itemDeltaInc: {
    backgroundColor: '#36c252',
  },
  itemDeltaDec: {
    backgroundColor: '#e04638',
  },
  itemPercent: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    margin: 5,
  },
})
