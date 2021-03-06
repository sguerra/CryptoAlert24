import React, {useMemo} from 'react'
import type {FunctionComponent} from 'react'
import {View, StyleSheet} from 'react-native'
import HTML from 'react-native-render-html'

export const CryptoFooter: FunctionComponent = () => {
  const htmlAPILink =
    '<a href="https://messari.io/" rel="nofollow">messari.io</a>'
  const htmlGithubLink =
    '<a href="https://github.com/sguerra" rel="nofollow">sguerra</a>'

  const htmlFooter = `Created by ${htmlGithubLink} using ${htmlAPILink} API`

  const MemoizedHTML = useMemo(() => {
    return (
      <HTML
        source={{html: htmlFooter}}
        baseStyle={styles.footerHTML}
        tagsStyles={{
          a: styles.footerLink,
        }}
        contentWidth={0}
      />
    )
  }, [htmlFooter])

  return <View style={styles.footer}>{MemoizedHTML}</View>
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#222',
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  footerHTML: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  footerLink: {
    color: '#e3b828',
    textDecorationLine: 'none',
  },
})
