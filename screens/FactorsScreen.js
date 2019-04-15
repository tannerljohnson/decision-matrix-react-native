import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';
import { WebBrowser } from 'expo';
import t from 'tcomb-form-native';

import { MonoText } from '../components/StyledText';

// init form
const Form = t.form.Form;

// define Factor object
let Factor = t.struct({
  factor_1: t.String,
});

export default class FactorsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    factors: 1,
  }

  render() {
    // set up navigator
    const {navigate} = this.props.navigation;

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
            <Text style={styles.getStartedText}>What are your decision factors</Text>
          </View>

          <View style={styles.optionsForm}>
            <Form
              type={Factor}
              ref={c => this._form = c}
            />
          </View>

          <View style={styles.addFactorContainer}>
            <TouchableOpacity onPress={this._handleAddFactorPress} style={styles.newFactorLink}>
              <Text style={styles.newFactorLinkText}>Add another factor</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.addFactorContainer}>
            <Button
              title="Back"
              onPress={() => navigate("Home")}
            />
            <Button
              title="Next"
              onPress={() => navigate("FactorRanking")}
            />
          </View>

        </ScrollView>

      </View>
    );
  }

  _handleAddFactorPress = () => {
    console.log("pressed new factor");
    // TODO: don't use state for this
    let newFactorCount = this.state.factors + 1;
    this.setState({
      factors: newFactorCount,
    });
    const factorsObj = {};
    for (let i = 0; i < newFactorCount; i++) {
      var fId = "factor_" + String(i + 1);
      factorsObj[fId] = t.String;
    }
    console.log(factorsObj);
    Factor = t.struct(factorsObj);
  };
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
