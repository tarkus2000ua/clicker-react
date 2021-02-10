import React, { useState, useCallback, useRef } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Game from './components/Game/Game';
import Result from './components/Result/Result';
import Context from './context';

export const App = () => {
    const [playerName, setPlayerName] = useState('');
    const resultTable5 = useRef([]);
    const resultTable10 = useRef([]);
    const resultTable15 = useRef([]);
    const currentResultTable = useRef([]);
    let maxResultCount = 5;
    const [isSuccess, setIsSuccess] = useState(false);
    const [isNewRecord, setIsNewRecord] = useState(false);
    const [lastResult, setLastResult] = useState(null);

    const checkResult = useCallback((resultTable, gameResult) => {
      if (resultTable.current.length >= maxResultCount) {
          checkNewRecord(gameResult, resultTable.current);
          insertToTable(gameResult, resultTable.current);
      } else {
          if (resultTable.current.length === 0) {
              setIsNewRecord(true);
          } else {
              checkNewRecord(gameResult, resultTable.current);
          }
          const newTable = [...resultTable.current];
          resultTable.current.length = 0;
          resultTable.current.push(...newTable, { ...gameResult });
          setIsSuccess(true);
      }
      currentResultTable.current.length = 0;
      currentResultTable.current.push(...resultTable.current);
      setLastResult({ ...gameResult });
  },[maxResultCount]);

    const updateResultTable = useCallback(async (gameResult) => {
        switch (gameResult.time) {
            case 5:
                checkResult(resultTable5, gameResult);
                break;

            case 10:
                checkResult(resultTable10, gameResult);
                break;

            case 15:
                checkResult(resultTable15, gameResult);
                break;

            default:
                break;
        }
    },[checkResult, resultTable10, resultTable15, resultTable5]);

    const insertToTable = (result, table) => {
        const minIndex = table.reduce((res, item, index, arr) => {
            if (item.result < arr[res].result) {
                return index;
            } else return res;
        }, 0);

        if (result.result > table[minIndex].result) {
            const newTable = [...table];
            newTable.splice(minIndex, 1, { ...result });
            table.length = 0;
            table.push(...newTable);
            setIsSuccess(true);
        } else {
            setIsSuccess(false);
        }
    };

    const checkNewRecord = (result, table) => {
        const maxIndex = table.reduce((res, item, index, arr) => {
            if (item.result > arr[res].result) {
                return index;
            } else return res;
        }, 0);

        if (result.result > table[maxIndex].result) {
            setIsNewRecord(true);
        } else {
            setIsNewRecord(false);
        }
    };

    const getResults = useCallback(() => {
        return {
            resultTable: currentResultTable.current,
            result: lastResult,
            isSuccess: isSuccess,
            isNewRecord: isNewRecord
        };
    },[currentResultTable, isNewRecord, isSuccess, lastResult]);

    return (
        <Context.Provider value={{ playerName, setPlayerName, updateResultTable, getResults }}>
            <Router>
                <Route exact path="/" component={Login} />
                <Route path="/login" component={Login} />
                <Route path="/game" component={Game} />
                <Route path="/result" component={Result} />
            </Router>
        </Context.Provider>
    );
};

export default App;
