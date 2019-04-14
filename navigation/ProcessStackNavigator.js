import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import FactorsScreen from '../screens/FactorsScreen';

export default ProcessStackNavigator = createStackNavigator({ Home: HomeScreen, Factors: FactorsScreen });
