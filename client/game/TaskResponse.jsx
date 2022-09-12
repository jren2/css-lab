import React from "react";
import Slider from "meteor/empirica:slider";
import Grid from './Grid'
import Canvas from './Canvas'

export default class TaskResponse extends React.Component {
  handleChange = num => {
    const { player } = this.props;
    const value = Math.round(num * 100) / 100;
    player.round.set("value", value);
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.player.stage.submit();
  };

  renderSubmitted() {
    return (
      <div className="task-response">
        <div className="response-submitted">
          <h5>Waiting on other players...</h5>
          Please wait until all players are ready
        </div>
      </div>
    );
  }

  renderSlider() {
    const { player } = this.props;
    const value = player.round.get("value");
    return (
      <>
        <Canvas
          l={0}
          circleFound={0}
          circlePoints={
            [
              [135, 130], [135, 220], [135, 310],
              [225, 130], [225, 220], [225, 310],
              [315, 130], [315, 220], [315, 310]
            ]
          }
          {...this.props}
        />
      </>
    );
  }

  render() {
    const { player } = this.props;

    // If the player already submitted, don't show the slider or submit button
    if (player.stage.submitted) {
      return this.renderSubmitted();
    }

    return (
      <div className="task-response">
        <form onSubmit={this.handleSubmit}>
          {this.renderSlider()}

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
