import React, { useState, useContext } from 'react';
import Context from '../../context';
import { styles } from './login.styles';

const Login = ({history}) => {
    const [name, setName] = useState('Player');
    const { setPlayerName } = useContext(Context)
    const changeHandler = (event) => {
        setName(event.target.value)
    }

    const submitHandler = (event) => {
        event.preventDefault();
        setPlayerName(name);
        history.push('/game');
    }

    return (
        <div style={styles.container}>
            <form style={styles.loginForm} onSubmit={(event)=>submitHandler(event)}>
                <label htmlFor="name">Enter your name</label>
                <input name="name" type="text" value={name} onChange={event=>changeHandler(event)}/>
                <button style={styles.btn} type="submit">
                    Enter game
                </button>
            </form>
        </div>
    );
};

export default Login;
