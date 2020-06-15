import React from 'react';
import { View, Text } from 'react-native';
import Routes from './src/routes';
import { StatusBar } from 'react-native';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-mode" backgroundColor="transparent" translucent/> 
      <Routes />
    </>
  )
}

export default App;