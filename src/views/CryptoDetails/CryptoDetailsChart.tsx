import React, {useMemo} from 'react'
import type {FunctionComponent} from 'react'
import {ScrollView, StyleSheet, Text, View} from 'react-native'

import {LineChart} from 'react-native-svg-charts'

import type {CryptoAsset} from '../../services/types'
import {PriceDeltaColors} from '../../constants'
import utils from '../../components/utils'

type CryptoDetailsChartProps = {
  asset: CryptoAsset
}

export const CryptoDetailsChart: FunctionComponent<CryptoDetailsChartProps> = ({
  asset,
}) => {
  const {prices, metrics} = asset

  if (!prices) {
    return null
  }

  const {values} = prices
  const {market_data} = metrics

  const chartValues = values.map(value => value[1])
  const chartDates = values.map(value => value[0])

  const strokeColor =
    market_data.percent_change_usd_last_24_hours >= 0
      ? PriceDeltaColors.INC
      : PriceDeltaColors.DEC

  const {ohlcv_last_24_hour} = market_data
  const {open, high, low, close, volume} = ohlcv_last_24_hour

  const chartSvg = useMemo(() => {
    return {
      stroke: strokeColor,
      strokeWidth: 2,
    }
  }, [strokeColor])

  const chartOHLVTextStyle = {...styles.chartText, ...styles.chartOHLVText}
  const chartOHLVValueStyle = {
    ...styles.chartText,
    ...styles.chartValue,
    ...styles.chartOHLVText,
  }

  return (
    <ScrollView style={styles.chart}>
      <View style={styles.chartInterval}>
        <Text style={{...styles.chartText, ...styles.chartValue}}>1hr</Text>
      </View>
      <LineChart
        style={styles.chartLineChart}
        data={chartValues}
        keys={chartDates}
        svg={chartSvg}
        contentInset={{top: 20, bottom: 20}}
      />
      <View style={styles.chartOHLV}>
        <Text style={chartOHLVTextStyle}>
          Open:{' '}
          <Text style={chartOHLVValueStyle}>{utils.formatPrice(open)}</Text>
        </Text>
        <Text style={chartOHLVTextStyle}>
          Close:{' '}
          <Text style={chartOHLVValueStyle}>{utils.formatPrice(close)}</Text>
        </Text>
        <Text style={chartOHLVTextStyle}>
          High:{' '}
          <Text style={chartOHLVValueStyle}>{utils.formatPrice(high)}</Text>
        </Text>
        <Text style={chartOHLVTextStyle}>
          Low: <Text style={chartOHLVValueStyle}>{utils.formatPrice(low)}</Text>
        </Text>
        <Text style={chartOHLVTextStyle}>
          Volume:{' '}
          <Text style={chartOHLVValueStyle}>{utils.formatPrice(volume)}</Text>
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  chart: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    flexGrow: 1,
  },
  chartLineChart: {
    width: '100%',
    minHeight: 200,
    flexGrow: 1,
  },
  chartInterval: {
    margin: 5,
    backgroundColor: '#333',
    maxWidth: 50,
    borderRadius: 5,
    alignItems: 'center',
  },
  chartText: {
    margin: 5,
    color: '#AAA',
    fontSize: 14,
    fontWeight: 'bold',
  },
  chartValue: {
    color: 'white',
  },
  chartOHLV: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: '#333',
    borderRadius: 10,
    margin: 10,
    padding: 10,
    alignSelf: 'flex-end',
    flexShrink: 1,
  },
  chartOHLVText: {
    flexWrap: 'wrap',
    flexGrow: 6,
  },
})
