import { useEffect, useState } from 'react'
import React from 'react'

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstPoint: -1,
      secondPoint: -1
    };
  }

  render() {
    const grid = [
      [0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 1, 1, 1, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0],
    ];

    let key = 0
    return (
      <div className="fullGrid">
        {
          grid.map(row => {
            return (
              <div className="container">
                {
                  row.map(square => {
                    key++;
                    if (square === 1) {
                      return (
                        <div key={key} className="filledBox gridComponent">

                        </div>
                      )
                    } else {
                      return (
                        <div key={key} className="emptyBox gridComponent">

                        </div>
                      )
                    }
                  })
                }
              </div>
            )
          })
        }
      </div>
    )
  }
}
