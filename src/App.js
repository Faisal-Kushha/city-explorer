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
import Movies from "./components/Movie";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

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
      movieArr: [],
    };
  }

  getLocationData = async (event) => {
    event.preventDefault();
    const cityName = event.target.name.value;
    const myKey = "pk.43fed3791d35ddb76aa14f749c6d3080";
    const URL1 = `https://city-explorer-api-week2.herokuapp.com/weather?name=${cityName}`;
    const URL2 = `https://eu1.locationiq.com/v1/search.php?key=${myKey}&q=${cityName}&format=json`;
    const URL3 = `https://city-explorer-api-week2.herokuapp.com/movies?name=${cityName}`;
    try {
      let newLocation1 = await axios.get(URL1);
      let newLocation2 = await axios.get(URL2);
      let newMovie = await axios.get(URL3);
      this.setState({
        lat: newLocation2.data[0].lat,
        lon: newLocation2.data[0].lon,
        name: cityName,
        weatherArr: newLocation1.data,
        movieArr: newMovie.data,
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
                src={`https://maps.locationiq.com/v3/staticmap?key=pk.43fed3791d35ddb76aa14f749c6d3080&center=${this.state.lat},${this.state.lon}&zoom=1-18&format=png`}
                alt="map"
              />
            )}
          </div>

          {this.state.mapFlag && (
            <Row xs={1} md={3} className="g-4">
              <Weather
                weather={this.state.weatherArr.map((item) => {
                  return (
                    <>
                      <Col>
                        <Card style={{ width: "18rem" }}>
                          <ListGroup variant="flush">
                            <ListGroup.Item>Date: {item.date}</ListGroup.Item>
                            <ListGroup.Item>
                              Description: {item.desc}
                            </ListGroup.Item>
                          </ListGroup>
                        </Card>
                      </Col>
                    </>
                  );
                })}
              />
            </Row>
          )}
          {this.state.mapFlag && (
            <Row xs={1} md={3} className="g-4">
              <Movies
                movie={this.state.movieArr.map((item) => {
                  return (
                    <>
                      <Col>
                        <Card>
                          <Card.Img variant="top" src={item.image_url} />
                          <Card.Body>
                            <Card.Title>Title: {item.title}</Card.Title>
                            <Card.Text>
                              Overview: {item.overview}
                              <br />
                              <br />
                              Average_votes: {item.average_votes}
                              <br />
                              Total_votes: {item.total_votes}
                              <br />
                              Popularity: {item.popularity}
                              <br />
                              Released_on: {item.released_on}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    </>
                  );
                })}
              />
            </Row>
          )}
          <Error err={this.state.displayError} />

          <Footer />
        </body>
      </>
    );
  }
}

export default App;
