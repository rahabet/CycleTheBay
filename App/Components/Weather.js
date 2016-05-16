var React = require('react-native');

var {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  navigator,
  Icon,
  ListView,
  Image,
  StyleSheet
} = React;


import currentWeather from "../Api/weatherapi"
import forecast from "../Api/weatherapi"
import weatherIcon from "../Utils/icons"
import Trail from './Trail'
import TrailList from './TrailList'
import Local from './Local'
import Main from './Main'

var mockedCurrent = {
  city: 'San Francisco',
  temperature: '70˚F',
  temp_min: '70˚F',
  temp_max: '70˚F',
  description: 'Sun with light overcast',
  humidity: '40%',
  icon: weatherIcon('01d'),
  rain: '0%',
  wind: '10mph'
};

var mockedForecast = [{
  city: 'Oakland',
  temperature: '70˚F',
  description: 'Sun with light overcast',
  icon: weatherIcon('01d'),
  wind_speed: '10mph',
  wind_direction: 'NW',
  rain: '0%'
  },
  {
    city: 'Oakland',
    temperature: '70˚F',
    description: 'Sun with light overcast',
    icon: weatherIcon('01d'),
    wind_speed: '10mph',
    wind_direction: 'NW',
    rain: '0%'
  }
];

var Weather = React.createClass ({
   getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(mockedForecast)
    };
  },

  componentDidMount: function(){
    this.getWeather();
    this.getForecast();
  },

  componentWillUnmount: function(){

  },

  getWeather() {
    currentWeather(this.state.latitude, this.state.longitude).then((currentdata) => {
      debugger;
      console.log('currentdata: ' + currentdata)
      this.setState(currentdata);
    });
  },

  getForecast() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(mockedForecast)
    });
    // forecast(37, -122).then((data) => {
    //   console.log(data);
    //   this.setState({
    //     dataSource: this.state.dataSource.cloneWithRows(data.list)
    //   })
    // })
  },

renderRow(weather) {
    return (
      <WeatherCell weather={weather}/>
  );
},
  render() {
    return (
    <View style={[styles.container, {backgroundColor: this.state.backgroundColor}]}>
      <View style={styles.currentWrapper}>
        <Text>Current Weather</Text>
        <Text>
          // {this.state.city}
          {mockedCurrent.city}
        </Text>
        <View style={styles.horContainer1}>
          <Text style={styles.icon}>
            {mockedCurrent.icon}
          </Text>
          <View style={styles.vertContainer}>
            <View style={styles.horContainer2}>
              <Text>
                Max:
                // {this.state.temp_max}
                {mockedCurrent.temp_max}
              </Text>
            </View>
            <View style={styles.horContainer2}>
              <Text>
                Min:
                // {this.state.temp_min}
                {mockedCurrent.temp_min}
              </Text>
            </View>
            <Text>Humidity:
            // {this.state.humidity}
            {mockedCurrent.humidity}
            </Text>
            <Text>Rain:
            // {this.state.rain}
            {mockedCurrent.rain}
            </Text>
            <Text>Wind:
            // {this.state.wind}
            {mockedCurrent.wind}
            </Text>
          </View>
      </View>
        <View style={styles.horContainer2}>
          <Text>
          // {this.state.temperature}
          {mockedCurrent.temperature}
          </Text>
          <Text>
          // {this.state.description}
          {mockedCurrent.description}
          </Text>
        </View>
      </View>
      <View style={styles.forecastWrapper}>
        <Text> Hourly Forecast </Text>
        <ListView
          style={styles.listContainer}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}/>
      </View>
      <View style={styles.footerNav}>
        <TouchableHighlight
          onPress={this._onHomeButton}
          style={styles.button}
          underlayColor="gray">
            <Text style={styles.buttonText}>Home</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={this._onMapsButton}
          style={styles.button}
          underlayColor="gray">
            <Text style={styles.buttonText}>Maps</Text>
        </TouchableHighlight>
        <TouchableHighlight
        onPress={this._onTrailsButton}
        style={styles.button}
        underlayColor="gray">
          <Text style={styles.buttonText}>Trails</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={this._onWeatherButton}
          style={styles.button}
          underlayColor="gray">
            <Text style={styles.buttonText}>Weather</Text>
        </TouchableHighlight>
        <TouchableHighlight
        onPress={this._onLocalButton}
        style={styles.button}
        underlayColor="gray">
          <Text style={styles.buttonText}>Local</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
},

  _onHomeButton(){
    this.props.navigator.push({
      component: Main,
      name: "Main"
    })
  },


 _onTrailsButton(){
   this.props.navigator.push({
     component: TrailList,
     name: "Trails",
   });
 },

 _onMapsButton(){
   this.props.navigator.push({
     component: Maps,
     name: "Map"
   })
 },

 _onWeatherButton() {
   this.props.navigator.push({
     component: 'Weather',
     name: "Weather"
   })
 },

 _onLocalButton(){
   this.props.navigator.push({
     component: 'Local',
     name: "Local"
   })
 }

});

var WeatherCell = React.createClass({
  render() {
    return (
      <View>
          <View style={styles.WeatherCell}>

            <Text style={styles.icon}>
              {this.props.weather.icon}
            </Text>
            <View style={styles.tempContainer}>
              <Text style={styles.darkText}>
              {this.props.weather.temperature}
              </Text>
            </View>
            <Text style={styles.lightText}>
            Forecast:
              {this.props.weather.description}
            </Text>
            <Text style={styles.lightText}>
            Rain:
              {this.props.weather.rain}
            </Text>
            <Text style={styles.lightText}>
            Wind Speed:
            {this.props.weather.wind_speed}
            </Text>
            <Text style={styles.lightText}>
            Wind Direction:
            {this.props.weather.wind_direction}
            </Text>
        </View>
        <View style={styles.separator}/>
      </View>
    );
  }
});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch'
  },
  listContainer: {
    backgroundColor: '#F2F2F2'
  },
  timeContainer: {
    alignItems: 'center',
    marginRight: 20
  },
  seperator: {
    height: 1,
    backgroundColor: '#DDDDDD'
  },
  tempContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  darkText: {
    fontSize: 18
  },
  lightText: {
    color: '#9A9A9A'
  },
  horContainer1: {
    flexDirection: 'row',
    marginBottom: 20
  },
  horContainer2: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  vertContainer: {
    flex: 1,
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: '#CCCCCC',
    padding: 15
  },
  currentWrapper: {
    flex: 3,
    padding: 20,
    marginTop: 65,
    backgroundColor: '#F2F2F2'
  },
  forecastWrapper: {
    flex: 5
  },
  icon: {
    // fontFamily: 'WeatherIcons-Regular',
    padding: 0,
    width: 75,
    height: 75,
    marginRight: 20
  },
  WeatherCell: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 4,
    marginRight: 4,
    padding: 4,
    borderBottomWidth: .5,
    borderColor: 'lightgray'
  },
  button: {
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText:{
    color: '#658D9F',
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerNav: {
    flex: 0,
    flexDirection: 'row',
    borderTopWidth: 1,
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    paddingTop: 10
  }
});

module.exports = Weather;
