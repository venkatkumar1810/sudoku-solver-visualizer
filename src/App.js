import logo from './logo.svg';
import Tile from './components/Tile';
import './App.css';
import React, { Component, useState, useEffect } from 'react'
import randomSudoku from './helpers/Sudoku';
import SudokuSolver from './algorithms/SudokuSolver'

// Icons
import Play from '@material-ui/icons/PlayCircleOutlineRounded';
import Forward from '@material-ui/icons/SkipNextRounded';
import Backward from '@material-ui/icons/SkipPreviousRounded';
import RotateLeft from '@material-ui/icons/RotateLeft';


class App extends Component {

  state = {
    array: [],
    arraySteps: [],
    colorKey: [],
    colorSteps: [],
    currentStep: 0,
    count: 9,
    delay: 500,
    algorithm: 'Sudoku Solver',
    timeouts: [],
  };

  ALGORITHMS = {
    'Sudoku Solver': SudokuSolver,
  };

  componentDidMount() {
    this.generateRandomGrid();
  }

  generateSteps = async () => {
    let array = this.state.array.slice();
    let steps = this.state.arraySteps.slice();
    let colorSteps = this.state.colorSteps.slice();


    await this.ALGORITHMS[this.state.algorithm](array, steps, colorSteps);
    console.log(steps.length);
    await this.setState({
      arraySteps: steps,
      colorSteps: colorSteps,
    });
    console.log(this.state.arraySteps.length);
  };


  clearTimeouts = () => {
    this.state.timeouts.forEach((timeout) => clearTimeout(timeout));
    this.setState({
      timeouts: [],
    });
  };

  clearColorKey = () => {
    const count = this.state.count;
    const temp = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    // for (let j = 0; j < count; j++) {
    //   var tempArr = []
    //   for (let i = 0; i < count; i++) {
    //     tempArr.push(0);
    //   }
    //   temp.push(tempArr);
    // }

    this.setState({
      colorKey: temp,
      colorSteps: [temp],
    });
  };


  generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  generateRandomGrid = () => {
    this.clearTimeouts();
    this.clearColorKey();
    const count = this.state.count;
    const temp = randomSudoku(this.generateRandomNumber(0, 7));
    // const temp = [
    //   [5, 3, 0, 0, 7, 0, 0, 0, 0],
    //   [6, 0, 0, 1, 9, 5, 0, 0, 0],
    //   [0, 9, 8, 0, 0, 0, 0, 6, 0],
    //   [8, 0, 0, 0, 6, 0, 0, 0, 3],
    //   [4, 0, 0, 8, 0, 3, 0, 0, 1],
    //   [7, 0, 0, 0, 2, 0, 0, 0, 6],
    //   [0, 6, 0, 0, 0, 0, 2, 8, 0],
    //   [0, 0, 0, 4, 1, 9, 0, 0, 5],
    //   [0, 0, 0, 0, 8, 0, 0, 7, 9]
    // ];
    console.log("generatedRandomGrid: ", temp);

    this.setState(
      {
        array: temp,
        arraySteps: [temp],
        currentStep: 0,
      }

    );
  };

  changeGrid = (row, col, value) => {
    let arr = this.state.array;
    arr[row][col] = value;
    this.setState({
      array: arr,
      arraySteps: [arr],
      currentStep: 0,
    }
      // ,
      // () => {
      //   this.generateSteps();
      // }
    );
  }


  previousStep = () => {
    let currentStep = this.state.currentStep;
    if (currentStep === 0) return;
    currentStep -= 1;
    this.setState({
      currentStep: currentStep,
      array: this.state.arraySteps[currentStep],
      colorKey: this.state.colorSteps[currentStep],
    });
  };

  nextStep = () => {
    let currentStep = this.state.currentStep;
    if (currentStep >= this.state.arraySteps.length - 1) return;
    currentStep += 1;
    this.setState({
      currentStep: currentStep,
      array: this.state.arraySteps[currentStep],
      colorKey: this.state.colorSteps[currentStep],
    });
  };

  start = async () => {
    await this.generateSteps();
    let steps = this.state.arraySteps.slice();
    let colorSteps = this.state.colorSteps.slice();
    this.clearTimeouts();

    let timeouts = [];
    let i = 0;
    console.log(steps.length);
    // console.log(steps[0])
    // console.log(steps[1])
    // console.log(steps[2])
    // console.log(steps[3])
    while (i < steps.length - this.state.currentStep) {
      let timeout = setTimeout(async () => {
        let currentStep = await this.state.currentStep;
        console.log(i, await this.state.currentStep);

        await this.setState({
          array: steps[currentStep],
          colorKey: colorSteps[currentStep],
          currentStep: currentStep + 1,
        });
        timeouts.push(timeout);
      }, this.state.delay * i);
      i++;
    }

    this.setState({
      timeouts: timeouts,
    });
  };


  render() {


    let playButton;

    // if (this.state.arraySteps.length === this.state.currentStep) {
    //   console.log(this.state.arraySteps.length, " ", this.state.currentStep, this.state.arraySteps)
    //   playButton = (
    //     <button className='controller' onClick={this.generateRandomGrid}>
    //       <RotateLeft />
    //     </button>
    //   );
    // } else {
    playButton = (
      <button className='controller' onClick={this.start}>
        <Play />
      </button>
    );
    // }


    return (
      <div className='border'>
        <div className='grid'>
          {this.state.array.map((row, rowId) => {
            return (
              <>
                <div key={rowId} className='rowStyle'>
                  {row.map((tile, tileId) => {
                    return (
                      <>
                        <Tile
                          indexRow={rowId}
                          indexColumn={tileId}
                          tileValue={tile}
                          // color={this.state.colorKey[rowId][tileId]}
                          changeGrid={this.changeGrid}
                        />
                        {(tileId === 2 || tileId === 5) ? <div className='sep' /> : null}
                      </>
                    );
                  })
                  }
                </div>
                {(rowId === 2 || rowId === 5) ? <div className='seperator' /> : null}
              </>
            )
          })
          }
        </div>
        <div className='control-pannel'>
          <div className='control-buttons'>
            <button className='controller' onClick={this.previousStep}>
              <Backward />
            </button>
            {playButton}
            <button className='controller' onClick={this.nextStep}>
              <Forward />
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default App;