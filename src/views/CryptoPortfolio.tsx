import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { FunctionComponent } from 'react';

import {
    View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity, Image,
} from 'react-native';
import Assets from '../services/assets';

import Config from 'react-native-config'

export const CryptoPortfolio: FunctionComponent = ()=>{

    const [jsonResponse, setJsonResponse] = useState(null)
    const [count, setCount] = useState(0)
    const [assets, setAssets] = useState([])

    const service = useMemo(()=>{
        return new Assets()
    },[])

    useMemo(()=>{
        if(!jsonResponse) {
            return
        }
        setAssets(jsonResponse)
    },[jsonResponse])
    

    useEffect(()=>{
        setCount(count+1)
        service.getAll().then((jsonResponse)=>{
            setJsonResponse(jsonResponse.data)
        })
    }, [service])

    const searchTextHandler = useCallback((searchText: string)=>{
        
        if(!jsonResponse){
            return
        }

        const normalizedSearchText = searchText.toUpperCase()
        
        setAssets(jsonResponse.filter((asset)=>{

            const normalizedAssetName = asset.name.toUpperCase()
            const normalizedAssetSymbol = asset.symbol.toUpperCase()
    

            return normalizedAssetName.indexOf(normalizedSearchText) >= 0 || normalizedAssetSymbol.indexOf(normalizedSearchText) >= 0
        }))
    }, [jsonResponse])

    const TempDebugSection = ()=>{
        return (
            <View style={{backgroundColor: 'white'}}> 
                <Text>App Mode: {Config.APP_MODE}</Text>
                <Text>API URI: {Config.API_BASE_URI}</Text>
                <Text>Render count: {count}</Text>
                <Text>List lenght: {assets.length}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.searchInput} 
                placeholder='Search...' 
                placeholderTextColor='white'
                onChangeText={searchTextHandler}></TextInput>
            <FlatList 
                style={styles.list}
                renderItem={({item})=>{

                    const imgSourceURI = `${Config.API_IMG_URI}/${item.id}/32.png?v=2`

                    const { market_data } = item.metrics

                    const price_usd = Math.trunc(market_data.price_usd*100)/100
                    const percent_change_usd_last_24_hours = Math.trunc(market_data.percent_change_usd_last_24_hours*100)/100

                    const deltaStyle = {
                        ...styles.itemDelta,
                        ...(percent_change_usd_last_24_hours >= 0 ? styles.itemDeltaInc: styles.itemDeltaDec)
                    }

                    return (
                        <TouchableOpacity style={styles.item}>
                            <Image source={{uri: imgSourceURI}} style={styles.itemImage}></Image>
                            <View style={styles.itemName}>
                                <Text style={styles.itemText}>{item.symbol}</Text>
                                <Text style={styles.itemSubtitle}>{item.name}</Text>
                            </View>
                            <Text style={{ ...styles.itemText, ...styles.itemPrice}}>{price_usd}</Text>
                            <View style={deltaStyle}>
                                <Text style={{ ...styles.itemText, ...styles.itemPercent}}>{percent_change_usd_last_24_hours} %</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
                data={assets}/>
            <TempDebugSection/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      display: 'flex',
      justifyContent: 'space-between',
      height: '100%',
      backgroundColor: '#4d4d4d'
    },
    searchInput: {
        height: 50,
        marginTop: 5,
        backgroundColor: '#666',
        color: 'white',
        fontSize: 18,
    },
    list: {
    },
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
        flexGrow: 1
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
    itemDeltaInc:{
        backgroundColor: '#36c252',
    },
    itemDeltaDec:{
        backgroundColor: '#e04638',
    },
    itemPercent: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        margin:5
    },
  });