import React from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux';

import {
  getTotal,
  getIsGameFinished,
} from 'Reducers/yatzy/selectors';

const Dashboard = styled.div`
  background: gold;
  padding: 1em;
  margin-bottom: 1em;

  display: flex;
  justify-content: space-between;
`;

const YatzyDashboard = ({
  total,
  onNewGameClick,
  highScore,
  gameFinished,
  gameFinishedHandler,
  userName,
}) => {
  const newGameHandler = () => {
    onNewGameClick();
  }

  React.useEffect(() => {
    if (gameFinished) {
      gameFinishedHandler(total, userName);
    }
  }, [gameFinished]);

  return (
    <Dashboard>
      <div>
        <div>{`Total: ${total}`}</div>
        <button onClick={newGameHandler}>New game</button>
      </div>
      <div>
        {`Current highScore: `}
        {highScore.map(({score, userName}) => (
          <div key={`${userName}: ${score}`}>{`${userName}: ${score}`}</div>
        ))}
      </div>
    </Dashboard>
  );
}

const mapStateToProps = ({ yatzyReducer: yatzyState, userReducer: userState }) => {
  return {
    ...yatzyState,
    ...yatzyState.yatzy,
    highScore: yatzyState.highScore,
    total: getTotal(yatzyState),
    gameFinished: getIsGameFinished(yatzyState),
    userName: userState.name,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onNewGameClick: () => {
      dispatch({
        type: 'YATZY_NEW_GAME',
      })
    },
    gameFinishedHandler: (total, userName) => {
      dispatch({
        type: 'YATZY_GAME_FINISHED',
        data: {
          total,
          userName,
        }
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(YatzyDashboard);