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
      weatherArr: [],
    };
  }

  getLocationData = async (event) => {
    event.preventDefault();
    const cityName = event.target.name.value;
    const myKey = "pk.792bc93caec04cfa793de96fee0f7828";
    const URL1 = `https://city-explorer-api-week2.herokuapp.com/weather?name=${cityName}`;
    const URL2 = `https://eu1.locationiq.com/v1/search.php?key=${myKey}&q=${cityName}&format=json`;
    try {
      let newLocation1 = await axios.get(URL1);
      let newLocation2 = await axios.get(URL2);
      this.setState({
        lat: newLocation2.data[0].lat,
        lon: newLocation2.data[0].lon,
        name: cityName,
        weatherArr: newLocation1.data,

        mapFlag: true,
      });

      console.log(newLocation2.data);
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
                src={`https://maps.locationiq.com/v3/staticmap?key=pk.792bc93caec04cfa793de96fee0f7828&center=${this.state.lat},${this.state.lon}&zoom=1-18&format=png`}
                alt="map"
              />
            )}
          </div>
          {this.state.mapFlag && (
            <Weather
              weather={this.state.weatherArr.map((item) => {
                return (
                  <>
                    <p>Date: {item.date}</p>
                    <p>Description: {item.desc}</p>
                  </>
                );
              })}
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
