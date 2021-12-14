import React from "react";
import { ListGroup } from "react-bootstrap";
import "./hourly.style.css";
import { Card } from "react-bootstrap";

const hourly = (props) => {
    const hourly48 = props.hourly;
    console.log(hourly48)
    return (
        <div className="container">
            <h3>Hourly Forecast </h3>
         <div className="scroll">
             { hourly48.map((hr) => 
              <Card style={{ width: '14.2%', float : 'left' , height: '150px', background: "#DDA0DD"  }} >
                   <Card.Title style={{color:"black"}}>{calhrs(hr.dt)}</Card.Title>
                   <Card.Body style={{color:"black"}}>{temperature(hr.temp)}&deg;</Card.Body>
                   <Card.Text style={{color:"black"}}>{hr.weather[0].description}</Card.Text>
                </Card>)
             
            }
                 
         </div>
         </div>
    
    );

    function calhrs(dt){
        
       // console.log(dt);
        //let time = new Intl.DateTimeFormat('en-US', { hour: '2-digit'}).format(dt);
       var dateObj = new Date(dt * 1000);
        var hours = dateObj.getUTCHours();
        return hours;
      
    }

    function temperature(temp){
        var caltemp = props.calCelsius(temp);
      return caltemp;
    }
}
        

        


export default hourly;