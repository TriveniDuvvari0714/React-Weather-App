import React from "react";
import { Card } from "react-bootstrap";

const week = (props) => {
   // var week7 = this.props.week;
   var week7 = [];
   week7  = props.week;
   console.log(week7);
    console.log(props.week);
    return week7.map((x,index) => (
        <div className="container">
            
         {index > 0 ? 
           (<Card style={{ width: '14.2%', float : 'left' , height: '150px', background: "#DDA0DD", marginBottom: "20px", marginTop: "15px"  }} >
               <Card.Title style={{color:"black"}}>{title(x)}</Card.Title>
               <Card.Body style={{color:"black"}}>{temperature(x.temp.day)}&deg;</Card.Body>
               <Card.Text style={{color:"black"}}>{x.weather[0].description}</Card.Text>
          </Card>):null}
            
            
        </div>
    ));


    function title(value){
        var dayname = new Date(value.dt * 1000).toLocaleDateString("en", {
            weekday: "long",
        });
        return dayname;
    };

    function temperature(temp){
          var caltemp = props.calCelsius(temp);
          return caltemp;
    }
}


   
export default week;            