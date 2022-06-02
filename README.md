# CryptoAlert24

An app to keep track of changes in the price of your favourite crypto coins in the last 24hrs

<center>
    <img src="./media/logo.png" width="250"/>
</center>

## Features

- Search for crypto coin information from an extensive catalog available online
- Take a look of the profile information of all available coins
- Watch your favourite assets for keeping track of them easily
- Get alerts on changes of the price of your watched assets in the last 24hr (Custom percent threshold)

## Technologies

[![React Native](https://img.shields.io/badge/-react%20native-grey?style=for-the-badge&logo=react)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-white?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Redux](https://img.shields.io/badge/redux-764abc?style=for-the-badge&logo=redux)](https://es.redux.js.org/)
[![Messari's Crypto Data API](https://img.shields.io/badge/messari%20api-435a6f?style=for-the-badge&logo=api)](https://messari.io/api)

## Screenshots

### Search for assets

<center>
    <img src="./media/assets.gif"/>
</center>

### Check an asset details

<center>
    <img src="./media/detail.gif"/>
</center>

### Add asset to watchlist / Remove asset from watchlist

<center>
    <img src="./media/watchlist.gif"/>
</center>

### Get alerts on price percent variation

<center>
    <img src="./media/alerts.gif"/>
</center>

## Requirements

- [React Native (Development Setup - ios)](https://reactnative.dev/docs/environment-setup)

## Installation

```bash
git clone git@github.com:sguerra/CryptoAlert24.git
cd CryptoAlert24
npm install
```

### ios

```bash
    cd ios
    pod install
```

## How to run? (ios)

### Config

Rename `.env.sample` to `.env` and set the next values:

```
# APP_MODE: 'prod'|'dev' - Application Mode
APP_MODE='prod'
APP_PRICE_THRESHOLD=5
# API env vars
API_BASE_URI='https://data.messari.io/api'
API_IMG_URI='https://messari.io/asset-images'
API_KEY='f126939c-9ffd-4741-b6de-ca414f2e3b57'
# API refresh rate (in seconds)
API_REFRESH_RATE=30
```

### Run

```bash
npx react-native start
npx react-native run-ios
```

## Future work

- Testing
  - Unit tests
  - Beta testing with [TestFlight](https://developer.apple.com/testflight/)
- Improved Charts
- Get information from own server
  - Caching information
  - Websocket price refresh
- Native background actions
  - Background Fetch
  - Notifications when app is closed
- Publish on store
