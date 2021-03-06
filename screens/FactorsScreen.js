/* eslint-disable global-require */
/* eslint-disable no-use-before-define */
/* eslint-disable react/no-unused-state */
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
// import { WebBrowser } from 'expo';
import t from 'tcomb-form-native';

// import { MonoText } from '../components/StyledText';

// init form
const { Form } = t.form; // const Form = t.form.Form

// define Factor object
let Factor = t.struct({
  factor_1: t.String
});

export default class FactorsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      value: {
        factor_1: ''
      }
    };
  }

  // update state on user input
  onChange = value => {
    this.setState({
      value
    });
  };

  handleAddFactorPress = () => {
    console.log('pressed new factor');

    // plus one to current values length
    const newFactorCount = Object.keys(this.state.value).length + 1;
    console.log(`new factor count is ${newFactorCount}`);
    const factorsObj = {};

    // reconstruct Factor form object to add one
    for (let i = 0; i < newFactorCount; i += 1) {
      const fId = `factor_${String(i + 1)}`;
      factorsObj[fId] = t.String;
    }

    // grab old values and reload component by updating state
    const oldFormValues = this.factor_form.getValue();
    this.setState({
      values: oldFormValues
    });

    Factor = t.struct(factorsObj);
  };

  render() {
    // set up navigator
    const { navigate } = this.props.navigation;
    const optionValues = this.props.navigation.getParam('optionValues', 'No option values');

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                // eslint-disable-next-line no-undef
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>What are your decision factors</Text>
            <Text>
              Received values:
              {JSON.stringify(optionValues)}
            </Text>
          </View>

          <View style={styles.optionsForm}>
            <Form
              type={Factor}
              ref={c => {
                this.factor_form = c;
              }}
              value={this.state.value}
              onChange={this.onChange}
            />
          </View>

          <View style={styles.addFactorContainer}>
            <TouchableOpacity onPress={this.handleAddFactorPress} style={styles.newFactorLink}>
              <Text style={styles.newFactorLinkText}>Add another factor</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.addFactorContainer}>
            <Button title="Back" onPress={() => navigate('Home')} />
            <Button
              title="Next"
              onPress={() => {
                const value = this.factor_form.getValue();
                console.log(this.factor_form.getValue());
                if (!value) {
                  return;
                }
                navigate('FactorRanking', {
                  optionValues,
                  factorValues: this.factor_form.getValue()
                });
              }}
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
    backgroundColor: '#fff'
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center'
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)'
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 25,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center'
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
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center'
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center'
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7'
  },
  addFactorContainer: {
    marginTop: 15,
    alignItems: 'center'
  },
  newFactorLink: {
    paddingVertical: 15,
    marginBottom: 15
  },
  newFactorLinkText: {
    fontSize: 14,
    color: '#2e78b7'
  },
  optionsForm: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20
  }
});
