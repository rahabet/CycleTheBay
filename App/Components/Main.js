var React = require('react-native');

var {
  View,
  Text,
  TouchableHighlight,
  Navigator,
  StyleSheet
} = React;

import Weather from "./Weather"
import Trail from './Trail'
import TrailList from './TrailList'


class Main extends React.Component{

  render() {
    return(
      <View style ={styles.mainContainer}>
        <Text style={styles.title}>Cycle the Bay</Text>
        <TouchableHighlight
          onPress={this._onCycleButton.bind(this)}
          style={styles.button}
          underlayColor="gray">
            <Text style={styles.buttonText}>Trails</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={this._onWeatherButton.bind(this)}
          style={styles.button}
          underlayColor="gray">
            <Text style={styles.buttonText}>Weather</Text>
        </TouchableHighlight>
        <TouchableHighlight
        onPress={this._onLocalButton.bind(this)}
        style={styles.button}
        underlayColor="gray">
          <Text style={styles.buttonText}>Local</Text>
        </TouchableHighlight>
      </View>
    )
  }
  _onCycleButton(){
    this.props.navigator.push({
      component: TrailList,
      name: "Trails",
    });
  }

  _onWeatherButton() {
    this.props.navigator.push({
      component: Weather,
      title: "Weather"
    })
  }

  _onLocalButton(){
    this.props.navigator.push({
      component: Local,
      title: "Local Attractions"
    })
  }
};

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#658D9F'
  },
  title: {
    marginBottom: 10,
    fontSize: 25,
    textAlign: 'center',
    color: 'white'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText:{
    color: '#658D9F',
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

module.exports = Main;
