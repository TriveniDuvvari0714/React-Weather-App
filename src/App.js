import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './app_component/weather.component';
import 'weather-icons/css/weather-icons.css';
import Form from './app_component/form.component';
import hourly from './app_component/hourly.component';

const API_key="38b4f96860730f0fd0fb1e7741ab7b5c";


class App extends React.Component{
  constructor(){
    super();
    this.state = {
      city:undefined,
      country:undefined,
      icon:undefined,
      main:undefined,
      celsius:undefined,
      temp_max:undefined,
      temp_min:undefined,
      description:"",
      error:false,
      week:undefined,
      hourly:undefined
    };
   

    this.weatherIcon={
      Thumderstorm:"wi-thunderstorm",
      Drizzle:"wi-sleet",
      Rain:"wi-strom-showers",
      Snow:"wi-snow",
      Atmosphere:"wi-fog",
      Clear:"wi-day-sunny",
      Clouds:"wi-day-fog"
    };
    
  }

calCelsius(temp){
  let cell = Math.floor(temp-273.15)
  return cell;
}

get_WeatherIcon(icons,rangeId){
  switch(true){
    case rangeId>=200 && rangeId<=232:
      this.setState({icon:this.weatherIcon.Thumderstorm})
      break;
    case rangeId>=300 && rangeId<=321:
      this.setState({icon:this.weatherIcon.Drizzle})
      break;  
    case rangeId>=500 && rangeId<=531:
      this.setState({icon:this.weatherIcon.Rain})
      break;
    case rangeId>=600 && rangeId<=622:
      this.setState({icon:this.weatherIcon.Snow})
      break;
    case rangeId>=700 && rangeId<=781:
       this.setState({icon:this.weatherIcon.Atmosphere})
       break;  
   case rangeId===800:
       this.setState({icon:this.weatherIcon.Clear})
       break;   
    case rangeId>=801 && rangeId<=804:
       this.setState({icon:this.weatherIcon.Clouds})
       break; 
    default:
      this.setState({icon:this.weatherIcon.Clouds})        
                  
        
  }
}

getWeather = async(e) => {
  e.preventDefault();
  const city = e.target.elements.city.value;
  const country = e.target.elements.country.value;
 
  if(city && country){
   const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);
   const response = await api_call.json();
   console.log(response);

   const lat = parseInt(response.coord.lat);
   console.log(lat);
   const lon = parseInt(response.coord.lon);
   console.log(lon);
   

   const api_call1 = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}.44&lon=${lon}.04&appid=${API_key}`);
   const response1 = await api_call1.json();
   console.log(response1);
    this.setState({
       city:`${response.name}, ${response.sys.country}`,
       
       celsuis:this.calCelsius(response.main.temp ),
       temp_max:this.calCelsius(response.main.temp_max),
       temp_min:this.calCelsius(response.main.temp_min),
       description:response.weather[0].description,
       error:false,
       week:response1.daily,
       hourly:response1.hourly
    });
    this.get_WeatherIcon(this.weatherIcon,response.weather[0].id);
  }
  else{
    this.setState({error:true});
  }

};

render(){
  return (
    <div className="App">
     <Form loadweather={this.getWeather} error={this.state.error}/>
     <Weather 
     city={this.state.city} 
     country={this.state.country} 
     temp_celsius={this.state.celsuis} 
     temp_max={this.state.temp_max} 
     temp_min={this.state.temp_min}
     description={this.state.description}
     weatherIcon={this.state.icon}
     week={this.state.week}
     calCelsius={this.calCelsius}
     hourly={this.state.hourly}
     />
     
     
    </div>
  );
}

}




export default App;
