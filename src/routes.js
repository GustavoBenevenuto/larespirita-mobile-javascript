import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import House from './pages/House';
import Detail from './pages/Detail';

const App = createStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <App.Navigator headerMode="none">
                <App.Screen name="Home" component={Home} />
                <App.Screen name="House" component={House} />
                <App.Screen name="Detail" component={Detail} />
            </App.Navigator>
        </NavigationContainer>
    );
}

export default Routes;