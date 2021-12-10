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
        delay: 1000,
        algorithm: 'Sudoku Solver',
        timeouts: [],
    };

    ALGORITHMS = {
        'Sudoku Solver': SudokuSolver,
    };

    componentDidMount() {
        this.generateRandomGrid();
    }

    generateRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    };

    generateRandomGrid = () => {
        this.clearTimeouts();
        this.clearColorKey();
        const count = this.state.count;
        const temp = randomSudoku(this.generateRandomNumber(0, 7));
        console.log(temp);

        this.setState(
            {
                array: temp,
                arraySteps: [temp],
                currentStep: 0,
            }
            ,
            () => {
                this.generateSteps();
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
        },
            () => {
                this.generateSteps();
            }
        );
    }


    generateSteps = () => {
        let array = this.state.array.slice();
        // console.log("this state array : ", this.state.array, "inside function: ", array);
        let steps = this.state.arraySteps.slice();
        let colorSteps = this.state.colorSteps.slice();


        this.ALGORITHMS[this.state.algorithm](array, steps, colorSteps);

        // console.log("array : ", array);
        // console.log("steps : ", steps);

        this.setState({
            arraySteps: steps,
            colorSteps: colorSteps,
        });
    };

    clearTimeouts = () => {
        this.state.timeouts.forEach((timeout) => clearTimeout(timeout));
        this.setState({
            timeouts: [],
        });
    };

    clearColorKey = () => {
        // let blankKey = new Array(this.state.count).fill(0);
        const count = this.state.count;
        const temp = [];
        for (let j = 0; j < count; j++) {
            var tempArr = []
            for (let i = 0; i < count; i++) {
                tempArr.push(0);
            }
            temp.push(tempArr);
        }

        this.setState({
            colorKey: temp,
            colorSteps: [temp],
        });
    };

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

    start = () => {
        let steps = this.state.arraySteps;
        let colorSteps = this.state.colorSteps;
        // this.generateSteps();
        this.clearTimeouts();

        let timeouts = [];
        let i = 0;

        console.log("steps: ", steps);
        while (i < steps.length - this.state.currentStep) {
            // console.log(steps.length, this.state.currentStep);
            let timeout = setTimeout(() => {
                let currentStep = this.state.currentStep;
                // console.log(steps[currentStep]);

                this.setState({
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