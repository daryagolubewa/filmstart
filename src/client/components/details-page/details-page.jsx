import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import { selectSetWeather } from '../../redux/selectors/weather-selectors';
import { selectGetLocation } from '../../redux/selectors/location-selector';
import { setWeatherSuccessAC } from '../../redux/actions/weather-actions';
import { getLocationAC } from '../../redux/actions/location-action';

const mapStateToProps = state => ({
  setWeather: selectSetWeather(state),
  getLocation: selectGetLocation(state)
});

const mapDispatchToProps = dispatch => ({
  setWeatherSuccess: weatherData => dispatch(setWeatherSuccessAC(weatherData)),
  getCurrentLocation: location => dispatch(getLocationAC(location))
});

class DetailsPage extends Component {
  async componentDidMount() {
    const { setWeatherSuccess, getCurrentLocation } = this.props;
    const res = await fetch('https://ipapi.co/json/');
    const locationData = await res.json('');
    const locationName = await locationData.city;
    getCurrentLocation(locationName);

    const weatherData = await fetch('/api/details ', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cityName: locationName
      })
    });
    if (weatherData.status === 200) {
      const currentWeather = await weatherData.json();
      const weatherArr = currentWeather.consolidated_weather;
      const forecast = weatherArr.slice(0, 4);
      const detailedForecast = forecast.map(data => ({
        id: data.id,
        abbr: data.weather_state_abbr,
        name: data.weather_state_name,
        date: data.applicable_date,
        minTemp: data.min_temp,
        maxTemp: data.max_temp,
        windSpeed: data.wind_speed,
        humidity: data.humidity,
        visibility: data.visibility
      }));
      setWeatherSuccess(detailedForecast);
    }
  }
  render() {
    const weather = this.props.setWeather;
    const weatherId = this.props.match.params.id;
    const forecast = weather.filter(elem => elem.id === Number(weatherId));
    const currentForecast = forecast[0];

    if (weather.length === 0) {
      return <div className='col-md-5 col-md-offset-5 col-lg-3 col-md-3 col-sm-3 col-xs-6'>
        <img className='weather-spinner' src={'assets/public/images/spinner.svg'}/>
      </div>;
    }

    return (
      <div className='row'>
         <h4 className='weather-city-name'>{ this.props.getLocation }</h4>
         <div className='col-lg-3 col-md-3 col-sm-3 col-xs-6'>
           <h4> {currentForecast.date} </h4>
           <dl>
             <dt>WeatherName</dt>
             <dd> <div className='weather-image'>
               <img className='weather-pics' src={`assets/public/images/${currentForecast.abbr}.svg` } />
             </div>
               <span>{currentForecast.name}</span>
             </dd>
             <dt>Temperature</dt>
             <dd> Max: {Math.floor(currentForecast.maxTemp)}°C</dd>
             <dd> Min: {Math.floor(currentForecast.minTemp)}°C</dd>
             <dt>Wind</dt>
             <dd> Wind: {Math.floor(currentForecast.windSpeed)}mph</dd>
             <dt>Humidity</dt>
           <dd> Humidity: {currentForecast.humidity}%</dd>
           <dt>Visibility</dt>
           <dd> Visibility: {Math.floor(currentForecast.visibility)}</dd>
           </dl>
         </div>
      </div>
    );
  }
}

const DetailedForecastPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailsPage);
export default DetailedForecastPage;
