import React, {useMemo} from 'react'
import type {FunctionComponent} from 'react'
import {ScrollView, StyleSheet, Text, View} from 'react-native'

import {AreaChart, Grid} from 'react-native-svg-charts'
import RenderHtml from 'react-native-render-html'

import type {CryptoAsset} from '../../services/types'
import utils from '../../components/utils'
import {useAssetChartDetails} from '../hooks'

type CryptoDetailsChartProps = {
  asset: CryptoAsset
}

export const CryptoDetailsChart: FunctionComponent<CryptoDetailsChartProps> = ({
  asset,
}) => {
  const {
    chartValues,
    open,
    high,
    low,
    close,
    volume,
    current_marketcap_usd,
    chartSvg,
    gridSvg,
  } = useAssetChartDetails(asset)

  const MemoizedRenderHTML = useMemo(() => {
    return (
      <RenderHtml
        contentWidth={0}
        baseStyle={chartDetailsTextStyle}
        source={{html: asset.profile.general.overview.project_details}}
      />
    )
  }, [asset])

  return (
    <ScrollView style={styles.chart}>
      <View style={styles.chartInterval}>
        <Text style={{...styles.chartText, ...styles.chartValue}}>
          Last 24 hrs
        </Text>
      </View>
      <AreaChart
        style={styles.chartAreaChart}
        data={chartValues}
        start={0}
        svg={chartSvg}
        numberOfTicks={5}>
        <Grid svg={gridSvg} />
      </AreaChart>
      <View style={styles.chartOHLV}>
        <Text style={chartDetailsTextStyle}>
          Open:{' '}
          <Text style={chartDetailsValueStyle}>{utils.formatPrice(open)}</Text>
        </Text>
        <Text style={chartDetailsTextStyle}>
          Close:{' '}
          <Text style={chartDetailsValueStyle}>{utils.formatPrice(close)}</Text>
        </Text>
        <Text style={chartDetailsTextStyle}>
          High:{' '}
          <Text style={chartDetailsValueStyle}>{utils.formatPrice(high)}</Text>
        </Text>
        <Text style={chartDetailsTextStyle}>
          Low:{' '}
          <Text style={chartDetailsValueStyle}>{utils.formatPrice(low)}</Text>
        </Text>
        <Text style={chartDetailsTextStyle}>
          Volume:{' '}
          <Text style={chartDetailsValueStyle}>
            {utils.formatPrice(volume)}
          </Text>
        </Text>
        <Text style={chartDetailsTextStyle}>
          Mkt Cap:{' '}
          <Text style={chartDetailsValueStyle}>
            {utils.formatLargePrice(current_marketcap_usd)}
          </Text>
        </Text>
      </View>
      <View style={styles.chartProfile}>
        <Text style={chartDetailsValueStyle}>
          {asset.profile.general.overview.tagline}
        </Text>
        {MemoizedRenderHTML}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  chart: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    flexGrow: 1,
  },
  chartAreaChart: {
    width: '101%',
    minHeight: 200,
    flexGrow: 1,
    margin: -1,
  },
  chartInterval: {
    margin: 5,
    backgroundColor: '#333',
    maxWidth: 100,
    borderRadius: 5,
    alignItems: 'center',
  },
  chartText: {
    margin: 5,
    color: '#AAA',
    fontSize: 13,
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
  chartProfile: {
    backgroundColor: '#333',
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
})

const chartDetailsTextStyle = {...styles.chartText, ...styles.chartOHLVText}
const chartDetailsValueStyle = {
  ...styles.chartText,
  ...styles.chartValue,
  ...styles.chartOHLVText,
}
