import { useState } from 'react';
import './App.css';
import type { GameScore, Page, TotalScore } from './utils/types';

function App() {
  const [page, setPage] = useState<Page>('start');
  const [name, setName] = useState<string>('Player 1');
  const [gameScore, setGameScore] = useState<GameScore>([0, 0, '']);
  const [totalScore, setTotalScore] = useState<TotalScore>([0, 0]);

  const changeResult = (result: TotalScore) => {
    let res = 'DRAW';
    if (result[0] > result[1]) {
      res = 'LOSE';
      setTotalScore([totalScore[0] + 1, totalScore[1]]);
    }
    if (result[0] < result[1]) {
      res = 'WIN';
      setTotalScore([totalScore[0], totalScore[1] + 1]);
    }
    setGameScore([result[0], result[1], res]);
  };

  switch (page) {
    case 'start':
      //return <Start />;
    case 'game':
      //return <Game />;
    case 'end':
      //return <End />;
  }
}

export default App;
