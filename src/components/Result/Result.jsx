import React, {useContext, useEffect, useState} from 'react';
import { styles } from './result.style';
import Context from '../../context';

const Result = ({history}) => {
    const { getResults } = useContext(Context);
    const [isNewRecord, setIsNewRecord] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [resultTable, setResultTable] = useState([]);
    const [result, setResult] = useState({name:'',time:'',result:''}); 

    useEffect(() => {
        const results = getResults();
        setResultTable(results.resultTable.sort((a, b) => b.result - a.result));
        setResult(results.result);
        setIsNewRecord(results.isNewRecord);
        setIsSuccess(results.isSuccess);
    }, [getResults])

    const playAgain = () => {
        history.push('/game');
    }

    return (
        <div style={styles.container}>
            <h2>Top results for {result.time} sec game</h2>
            <ol style={styles.list}>
                {resultTable.map(item => (
                    <li key={item.name+item.result}>{item.name} - {item.result}</li>
                ))}
            </ol>
            {isNewRecord && <div style={styles.record}>Congratulations {result.name}!!! You set new record for {result.time} sec game - {result.result} clicks</div>}
            {isSuccess && !isNewRecord && <div style={styles.success}>You entered to top results for {result.time} sec game with {result.result} clicks</div>}
            {!isSuccess && <div style={styles.warning}>{result.name}, your result is bad, you have to practice more</div>}
            <button style={styles.btn} onClick={playAgain}>Play again</button>
        </div>
    );
};

export default Result;
