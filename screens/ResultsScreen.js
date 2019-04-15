import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  TextInput
} from 'react-native';
import { WebBrowser } from 'expo';
import t from 'tcomb-form-native';

import { MonoText } from '../components/StyledText';


export default class ResultsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  renderRow(key) {
    return(
      <View key={key} style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <Text>Factor {key}</Text>
        </View>
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <Text>Row score option 1</Text>
        </View>
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <Text>Row score option 2</Text>
        </View>

      </View>
    );
  }

  render() {
    // set up navigator
    const {navigate} = this.props.navigation;
    const data = [1,2,3,4,5];

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>Results</Text>
          </View>

          <View style={styles.optionsForm}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              {
                data.map((datum, i) => {
                    return this.renderRow(i);
                })
              }
            </View>
          </View>

          <View style={styles.addFactorContainer}>
            <Button
              title="Back"
              onPress={() => navigate("OptionScoring")}
            />
            <Button
              title="Start Over"
              onPress={() => navigate('Home')}
            />
          </View>

        </ScrollView>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 25,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  addFactorContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  newFactorLink: {
    paddingVertical: 15,
    marginBottom: 15,
  },
  newFactorLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  optionsForm: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
  }
});
