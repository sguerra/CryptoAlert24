/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { CryptoPortfolio } from './src/views/CryptoPortfolio';
import { CryptoDetails } from './src/views/CrytpoDetails';

const Stack = createNativeStackNavigator()

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen name="Portfolio" component={CryptoPortfolio}/>
              <Stack.Screen name="Details" component={CryptoDetails}/>
          </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};


export default App;
