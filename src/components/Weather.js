import React from "react";

class Weather extends React.Component {
  render() {
    return (
      <>
        Day: {this.props.day1[0]}
        <br />
        Description: {this.props.day1[1]}
        <br />
        Day: {this.props.day2[0]}
        <br />
        Description: {this.props.day2[1]}
        <br />
        Day: {this.props.day3[0]}
        <br />
        Description: {this.props.day3[1]}
      </>
    );
  }
}
export default Weather;
