/* eslint-disable global-require */
/* eslint-disable no-use-before-define */
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
// const Form = t.form.Form;
const { Form } = t.form;

// define Option object
let Option = t.struct({
  option_1: t.String,
  option_2: t.String
});

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      value: {
        option_1: '',
        option_2: ''
      }
    };
  }

  handleAddOptionPress = () => {
    // plus one to current values length
    const newOptionCount = Object.keys(this.state.value).length + 1;
    const optionsObj = {};
    let oId;

    // reconstruct Option form object to add one
    for (let i = 0; i < newOptionCount; i++) {
      oId = `option_${String(i + 1)}`;
      optionsObj[oId] = t.String;
    }

    // grab old values and reload component by updating state
    const oldFormValues = this.option_form.getValue();
    this.setState({ value: oldFormValues });

    Option = t.struct(optionsObj);
  };

  // update state on user input
  onChange = value => {
    this.setState({
      value
    });
  };

  render() {
    // set up navigator
    const { navigate } = this.props.navigation;

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
            <Text style={styles.getStartedText}>What are your options</Text>
          </View>

          <View style={styles.optionsForm}>
            <Form
              type={Option}
              ref={c => {
                this.option_form = c;
              }}
              value={this.state.value}
              onChange={this.onChange}
            />
          </View>

          <View style={styles.addOptionContainer}>
            <TouchableOpacity onPress={this.handleAddOptionPress} style={styles.newOptionLink}>
              <Text style={styles.newOptionLinkText}>Add another option</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.addOptionContainer}>
            <Button
              title="Next"
              onPress={() => {
                const value = this.option_form.getValue();
                console.log(this.option_form.getValue());
                if (!value) {
                  return;
                }
                navigate('Factors', {
                  optionValues: this.option_form.getValue()
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
  addOptionContainer: {
    marginTop: 15,
    alignItems: 'center'
  },
  newOptionLink: {
    paddingVertical: 15,
    marginBottom: 15
  },
  newOptionLinkText: {
    fontSize: 14,
    color: '#2e78b7'
  },
  optionsForm: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20
  }
});
