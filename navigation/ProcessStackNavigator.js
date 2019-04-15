import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import FactorsScreen from '../screens/FactorsScreen';
import FactorRankingScreen from '../screens/FactorRankingScreen';
import OptionScoringScreen from '../screens/OptionScoringScreen';
import ResultsScreen from '../screens/ResultsScreen';

export default ProcessStackNavigator = createStackNavigator({
  Home: HomeScreen,
  Factors: FactorsScreen,
  FactorRanking: FactorRankingScreen,
  OptionScoring: OptionScoringScreen,
  Results: ResultsScreen,
});
