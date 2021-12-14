import React from "react";
import Week from './week.component'
import { Card } from "react-bootstrap";
import Hourly from './hourly.component'

const Weather = (props) => {
    
    return(
        <div className='container text-light'>
            <div className="cards pt-4">
             <h1>{props.city}</h1>
             <h5 className="py-4">
                 <i className={`wi ${props.weatherIcon} display-1`}></i>
             </h5>  
            {props.temp_celsius ?(<h1 className="py-2">{props.temp_celsius}&deg;</h1>):null}
            
             {minmaxTemp(props.temp_min,props.temp_max)}
             <h4>{props.description}</h4>
            </div>
           
           
              {props.week ? ( <h3>Week Forecaste</h3> ):null}
              {props.week ? ( <Week week={props.week} calCelsius={props.calCelsius}/>):null}
              {props.hourly ? ( <Hourly hourly={props.hourly} calCelsius={props.calCelsius}/>):null}
        
        </div>
        
    );
};


function minmaxTemp(min,max){
    if(min && max){
        return(
            <h3>
                <span className="px-4">
                    {min}&deg;
                </span>
                <span className="px-4">
                    {max}&deg;
                </span>
            </h3>
        )
    }
}

export default Weather;