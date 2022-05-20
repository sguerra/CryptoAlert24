import Config from 'react-native-config'

const priceFormatter = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const percentFormatter = Intl.NumberFormat('es-US', {
  style: 'percent',
  minimumFractionDigits: 1,
})

const MILLION = 1000000
const BILLION = MILLION * 1000
const TRILLION = BILLION * 1000

const formatPriceDef = (price: number) => {
  const formattedPrice = priceFormatter.format(price)
  return formattedPrice
}

export default {
  getImageSourceURI: (assetId: string, imageSize: string) => {
    const imgSourceURI = `${Config.API_IMG_URI}/${assetId}/${imageSize}.png?v=2`
    return imgSourceURI
  },
  formatPrice: formatPriceDef,
  formatLargePrice: (price: number) => {
    if (price > TRILLION) {
      return `${formatPriceDef(price / TRILLION)}T`
    } else if (price > BILLION) {
      return `${formatPriceDef(price / BILLION)}B`
    } else if (price > MILLION) {
      return `${formatPriceDef(price / MILLION)}M`
    } else {
      return formatPriceDef(price)
    }
  },
  formatPercent: (percent: number) => {
    let formattedPercent = percent >= 0 ? '+' : ''
    formattedPercent += percentFormatter.format(percent / 100)

    return formattedPercent
  },
  getLast24HrsDate: () => {
    var currentDate = new Date()
    var millisecsDate = Number(currentDate)
    millisecsDate -= 1000 * 60 * 60 * 24 // Substract last 24hrs

    return new Date(millisecsDate)
  },
}
