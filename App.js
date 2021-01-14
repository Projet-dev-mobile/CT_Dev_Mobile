import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation/Navigation';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Button } from '@ui-kitten/components';
import { default as theme } from './theme.json';
import { default as mapping } from './mapping.json';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (

    <ApplicationProvider 
    {...eva} 
    theme={{ ...eva.light, ...theme }}
    customMapping={mapping}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </ApplicationProvider>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
