import React from "react";
import Header from "./components/Header";
import Form from "react-bootstrap/Form";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Error from "./components/Error";
import "./App.css";
import Weather from "./components/Weather";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: "",
      lon: "",
      name: "",
      mapFlag: false,
      displayError: false,
      day1: ["", ""],
      day2: ["", ""],
      day3: ["", ""],
    };
  }

  getLocationData = async (event) => {
    event.preventDefault();
    const cityName = event.target.name.value;
    // const myKey = "pk.5555b1da753853cd352a4bfe2f089b71";
    const URL = `https://city-explorer-api-week2.herokuapp.com/weather?name=${cityName}`;
    try {
      let newLocation = await axios.get(URL);
      this.setState({
        lat: newLocation.data[0].lat,
        lon: newLocation.data[0].lon,
        name: newLocation.data[0].city,
        day1: [newLocation.data[0].day1.time, newLocation.data[0].day1.weather],
        day2: [newLocation.data[0].day2.time, newLocation.data[0].day2.weather],
        day3: [newLocation.data[0].day3.time, newLocation.data[0].day3.weather],

        mapFlag: true,
      });
    } catch {
      this.setState({
        displayError: true,
      });
    }
  };

  render() {
    return (
      <>
        <body>
          <Header />
          <h4>Where would you like to explor? </h4>
          <Form onSubmit={this.getLocationData}>
            <input type="text" name="name" placeholder="Enter city name" />
            <br />
            <Button variant="primary" type="submit">
              Explore!
            </Button>
          </Form>
          {this.state.mapFlag && (
            <div id="one">
              <h3>Welcome to {this.state.name} </h3>
              {this.state.name} is located at {this.state.lat} by{" "}
              {this.state.lon}
            </div>
          )}
          <div id="two">
            {this.state.mapFlag && (
              <img
                src={`https://maps.locationiq.com/v3/staticmap?key=pk.0e5854cc8c7816bc3a730130562eb3a1&center=${this.state.lat},${this.state.lon}&zoom=1-18&format=png`}
                alt="map"
              />
            )}
          </div>
          {this.state.mapFlag && (
            <Weather
              day1={this.state.day1}
              day2={this.state.day2}
              day3={this.state.day3}
            />
          )}
          <Error err={this.state.displayError} />

          <Footer />
        </body>
      </>
    );
  }
}

export default App;
