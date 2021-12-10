import React, { useState, useEffect } from 'react';
import './Tile.css';

export default function Tile({ indexRow, indexColumn, tileValue, color, changeGrid }) {

    const colors = [
        ['rgba(61, 90, 241, 0.5', 'rgba(61, 90, 241, 0.2)'],
        ['rgba(255, 48, 79, 1', 'rgba(g1, 90, 241, 0.5)'],
        ['rgba(131, 232, 90, 0.5', 'rgba(131, 232, 90, 0.2)']
    ];

    const [inputValue, setinputValue] = useState(tileValue ? tileValue : null);

    useEffect(() => {
        setinputValue(tileValue ? tileValue : null);
    }, [tileValue])

    const handleChange = (e) => {
        console.log(e);
        let val = e.target.value;
        if (val === '') {
            setinputValue(null);
            changeGrid(indexRow, indexColumn, 0)
        } else {
            val = parseInt(val)
            if (val > 9 || val < 1) {
                setinputValue(null);
                changeGrid(indexRow, indexColumn, 0)
            } else {
                setinputValue(val);
                changeGrid(indexRow, indexColumn, 0)
            }
        }
        // setlen(parseInt(e.target.value))
    }
    const front_back_right_left = {
        // height: `${length}px`,
        // transform: `translateY(${200 - length}px)`,
        // backgroundColor: `${colors[color][0]}`,
        // boxShadow: `5px 5px 50px 5px ${colors[color][1]}`,
        // trasistion: '0.3s',
    };


    return (
        <div>
            <div className='color-bar front-color-bar' style={front_back_right_left}>
                <div className='tileContainer'>
                    <input className='tileBorder' type="number" min="1" max="9" value={inputValue} onChange={handleChange} />
                </div>
            </div>
        </div>
    )
}
