import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import { Link } from 'react-router-dom';
import { selectSetWeather } from '../../redux/selectors/weather-selectors';
import { selectGetLocation } from '../../redux/selectors/location-selector';
import { setWeatherSuccessAC } from '../../redux/actions/weather-actions';
import { getLocationAC } from '../../redux/actions/location-action';
import { PAGES } from '../../routes/pages';
import './home-page.css';

const mapStateToProps = state => ({
  setWeather: selectSetWeather(state),
  getLocation: selectGetLocation(state)
});

const mapDispatchToProps = dispatch => ({
  setWeatherSuccess: weatherData => dispatch(setWeatherSuccessAC(weatherData)),
  getCurrentLocation: location => dispatch(getLocationAC(location))
});

class HomePage extends Component {

  async componentDidMount() {
    const { setWeatherSuccess, getCurrentLocation } = this.props;
    const res = await fetch('https://ipapi.co/json/');
    const locationData = await res.json('');
    const locationName = await locationData.city;
    getCurrentLocation(locationName);

    const weatherData = await fetch('/api/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cityName: locationName
      })
    });
    if (weatherData.status === 200) {
      const currentWeather = await weatherData.json();
      console.log(currentWeather);
      const weatherArr = currentWeather.consolidated_weather;
      const forecast = weatherArr.slice(0, 4);
      const detailedForecast = forecast.map((data, index) => {
        let weatherDate = data.applicable_date;
        if (index === 0) {
          weatherDate = 'Today';
        }
        if (index === 1) {
          weatherDate = 'Tomorrow';
        }
        return {
          id: data.id,
          abbr: data.weather_state_abbr,
          name: data.weather_state_name,
          date: weatherDate,
          minTemp: data.min_temp,
          maxTemp: data.max_temp,
          windSpeed: data.wind_speed,
          humidity: data.humidity,
          visibility: data.visibility
        };
      });
      setWeatherSuccess(detailedForecast);
    }
  }

  render() {
    const todaysWeather = this.props.setWeather;
    if (todaysWeather.length === 0) {
      return <div className='col-md-5 col-md-offset-5 col-lg-3 col-md-3 col-sm-3 col-xs-6'>
      <img className='weather-spinner' src={'assets/public/images/spinner.svg'}/>
    </div>;
    }
    return (
      <div className="row">
        <h4 className="weather-city-name">{ this.props.getLocation }</h4>
        {this.props.setWeather.map(weather => (
          <Link
            key={weather.id}
            className='weather-link'
            to={ PAGES.details.call(weather.id) }
          >
          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
            <h4> {weather.date} </h4>
            <dl>
              <dt>WeatherName</dt>
              <dd> <div className="weather-image">
                <img className='weather-pics' src={`assets/public/images/${weather.abbr}.svg` } />
              </div>
                <span>{weather.name}</span>
              </dd>
              <dt>Temperature</dt>
              <dd> Max: {Math.floor(weather.maxTemp)}°C</dd>
              <dd> Min: {Math.floor(weather.minTemp)}°C</dd>
              <dt>Wind</dt>
              <dd> Wind: {Math.floor(weather.windSpeed)}mph</dd>
            </dl>
          </div>
          </Link>
        ))}
      </div>
    );
  }
}

const MainPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
export default MainPage;
