import React from "react";
import Header from "./components/Header";
import Form from "react-bootstrap/Form";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Render from "./components/Render";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: "",
      lon: "",
      displayName: "",
      mapFlag: false,
    };
  }

  getLocationData = async (event) => {
    event.preventDefault();
    const cityName = event.target.cityName.value;
    const myKey = "pk.5555b1da753853cd352a4bfe2f089b71";
    const URL = `https://eu1.locationiq.com/v1/search.php?key=${myKey}&q=${cityName}&format=json`;
    let newLocation = await axios.get(URL);
    this.setState({
      lat: newLocation.data[0].lat,
      lon: newLocation.data[0].lon,
      displayName: newLocation.data[0].display_name,
    });
  };

  render() {
    return (
      <>
        <Header />
        <h4>Where would you like to explor? </h4>
        <Form onSubmit={this.getLocationData}>
          <input type="text" name="cityName" placeholder="Enter city name" />
          <br />
          <Button variant="primary" type="submit">
            Explore!
          </Button>
        </Form>
        <Render
          displayName={this.state.displayName}
          lat={this.state.lat}
          lon={this.state.lon}
        />
        <Footer />
      </>
    );
  }
}

export default App;
