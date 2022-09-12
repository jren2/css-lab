import React, { Component, useEffect, useState } from 'react';
import Grid from './Grid'

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      l: this.props.l,
      circleFound: this.props.circleFound,
      circlePoints: this.props.circlePoints,
    }
  }

  componentDidMount() {
    let canvas = document.getElementById("canvas")
    let ctx = canvas.getContext("2d")
    let drawCanvas = document.getElementById("drawCanvas")
    let drawCtx = drawCanvas.getContext("2d")
    let painting = false
    let lastX = 0
    let lastY = 0
    let startX = 0
    let startY = 0
    let linesCount = 0
    let lines = []
    let circleFound = 0
    const circlePoints =
      [
        [135, 130], [135, 220], [135, 310],
        [225, 130], [225, 220], [225, 310],
        [315, 130], [315, 220], [315, 310]
      ]

    ctx.fillStyle = "blue";

    canvas.width = canvas.height = 450;
    drawCanvas.width = drawCanvas.height = 450;

    const calculateCircle = (sx, sy, ex, ey, cx, cy, r) => {
      let rsx = sx
      let rex = ex
      let rsy = sy
      let rey = ey
      let circlesFound = 0

      let leftBoundary = cx - r
      let rightBoundary = cx + r
      let topBoundary = cy - r
      let bottomBoundary = cy + r

      if ((rsx > leftBoundary && rsx < rightBoundary) && (rsy > topBoundary && rsy < bottomBoundary)) {
        return true
      }

      if ((rsx > leftBoundary && rex < rightBoundary && rey > topBoundary && rsy < bottomBoundary)) {
        return true
      }

      for (let i = rsx; i <= rex; i++) {
        const lineY = ((rey - rsy) / (rex - rsx)) * (i - rex) + rey
        if (lineY >= topBoundary && lineY <= bottomBoundary && i > leftBoundary && i < rightBoundary) {
          return true
        }
      }
      return false
    }

    drawCanvas.onmouseup = function (e) {
      if (linesCount < 5) {
        painting = false;

        ctx.strokeStyle = "#000";
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(lastX, lastY);
        ctx.stroke();
        lines.push([startX, startY, lastX, lastY])

        drawCtx.clearRect(0, 0, 600, 600);

        startX = e.pageX - this.offsetLeft - 2;
        startY = e.pageY - this.offsetTop - 52;
        painting = true;
        linesCount++
      }

      if (linesCount === 5) {
        let circleCount = 0
        let circles = []
        for (let i = 0; i < lines.length; i++) {
          let found = []
          for (let j = 0; j < circlePoints.length; j++) {
            if (calculateCircle(lines[i][0], lines[i][1], lines[i][2], lines[i][3], circlePoints[j][0], circlePoints[j][1], 15)) {
              let linesPoints = lines[i]
              let cp = circlePoints[j]
              circles.push({ linesPoints, cp })
              found.push(j)
              circleCount++
            }
          }
          for (let l = 0; l < found.length; l++) {
            circlePoints[found[l]] = [0, 0]
          }
        }
        circleFound = circleCount
      }
    }

    drawCanvas.onmousemove = function (e) {
      if (painting && linesCount < 5) {
        lastX = e.pageX - this.offsetLeft - 2;
        lastY = e.pageY - this.offsetTop - 52;
        drawCtx.clearRect(0, 0, 600, 600);
        drawCtx.beginPath();
        drawCtx.moveTo(startX, startY);
        drawCtx.lineTo(lastX, lastY);
        drawCtx.stroke();
      }
    }
  }

  render() {
    return (
      <>
        <div className="floater">
          <canvas id="canvas" className="canvasPosition"></canvas>
          <canvas id="drawCanvas" className="canvasPosition"></canvas>
          <Grid></Grid>
        </div>
      </>
    )
  }
}
