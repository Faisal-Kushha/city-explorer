import React from "react";

class Render extends React.Component {
  render() {
    return (
      <>
        <h3>Welcome to {this.props.displayName} </h3>
        <p>
          {this.props.displayName} is located at {this.props.lat} by{" "}
          {this.props.lon}
        </p>
      </>
    );
  }
}
export default Render;
