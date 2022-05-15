import Config from 'react-native-config'

const priceFormatter = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const percentFormatter = Intl.NumberFormat('es-US', {
  style: 'percent',
  minimumFractionDigits: 1,
})

export default {
  getImageSourceURI: (assetId: string, imageSize: string) => {
    const imgSourceURI = `${Config.API_IMG_URI}/${assetId}/${imageSize}.png?v=2`
    return imgSourceURI
  },
  formatPrice: (price: number) => {
    const formattedPrice = priceFormatter.format(price)
    return formattedPrice
  },
  formatPercent: (percent: number) => {
    let formattedPercent = percent >= 0 ? '+' : ''
    formattedPercent += percentFormatter.format(percent / 100)

    return formattedPercent
  },
}
