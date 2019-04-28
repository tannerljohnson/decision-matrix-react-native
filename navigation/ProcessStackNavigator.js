// import React from 'react';
// import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import FactorsScreen from '../screens/FactorsScreen';
import FactorRankingScreen from '../screens/FactorRankingScreen';
import OptionScoringScreen from '../screens/OptionScoringScreen';
import ResultsScreen from '../screens/ResultsScreen';

// eslint-disable-next-line no-undef
export default (ProcessStackNavigator = createStackNavigator({
  Home: HomeScreen,
  Factors: FactorsScreen,
  FactorRanking: FactorRankingScreen,
  OptionScoring: OptionScoringScreen,
  Results: ResultsScreen
}));
