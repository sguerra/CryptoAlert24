import React, { useEffect, useMemo, useState } from 'react';
import type { FunctionComponent } from 'react';

import {
    View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import Assets from './services/assets';

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
            <TextInput style={styles.searchInput} placeholder='Search...'></TextInput>
            <FlatList 
                style={styles.list}
                renderItem={({item})=>{
                    return (
                        <TouchableOpacity style={styles.item}>
                            <Text style={styles.itemText}>{item.name}</Text>
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
        height: '8%',
        marginBottom: '2%',
        backgroundColor: 'white'
    },
    list: {
    },
    item: {
        width: '100%',
        height: 40,
        color: 'white'
    },
    itemText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
  });