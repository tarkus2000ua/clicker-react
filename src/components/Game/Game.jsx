import React, { useState, useContext, useEffect, useRef } from 'react';
import Context from '../../context';
import { styles } from './game.style';

const time = [
    {
        name: '5 sec',
        value: 5
    },
    {
        name: '10 sec',
        value: 10
    },
    {
        name: '15 sec',
        value: 15
    }
];

const Game = ({ history }) => {
    const { playerName, updateResultTable } = useContext(Context);
    const [gameTime, setGameTime] = useState(5);
    const [clickCounter, setClickCounter] = useState(0);
    const [timeLeft, setTimeLeft] = useState(5);
    const [gameStarted,setGameStarted] = useState(false);
    const result = useRef(null);
    const timer = useRef(null);

    useEffect(() => {
        if (timeLeft === 0) {
            clearInterval(timer.current);
            setGameStarted(false)
            result.current = {
                name: playerName,
                result: clickCounter,
                time: gameTime
            };
            updateResultTable(result.current).then(() => history.push('/result'));
        }
        return () => {};
    }, [timeLeft, clickCounter, history, playerName, gameTime, updateResultTable]);

    const startGame = () => {
        if (!gameStarted) {
            setClickCounter(0);
            setGameStarted(true);
            timer.current = setInterval(() => {
                setTimeLeft((prevCount) => prevCount - 1);
            }, 1000);
        } else {
            setClickCounter((prevCounter) => prevCounter + 1);
        }
    };

    const handleChange = (e) => {
        setGameTime(parseInt(e.target.value));
        setTimeLeft(parseInt(e.target.value));
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Hello, {playerName}!</h2>
            <div style={styles.field}>
                <div style={styles.btnGroup}>
                    <button style={gameStarted ? styles.btnPressed : styles.btn} onClick={startGame}>
                        Click me!
                    </button>
                    <div>Time: {timeLeft} sec left</div>
                </div>
                <div style={styles.duration}>
                    <h3 style={styles.duration_header}>Choose game duration:</h3>
                    <ul>
                        {time.map((item) => (
                            <li key={item.name} style={styles.duration_item}>
                                <input
                                    type="radio"
                                    name="list_name"
                                    value={item.value}
                                    checked={item.value === gameTime}
                                    onChange={(e) => handleChange(e)}
                                />
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div style={styles.stats}>You have made {clickCounter} clicks</div>
        </div>
    );
};

export default Game;
