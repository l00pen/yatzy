import React, { useState } from 'react';
import BrickBraker from 'Components/BrickBraker';
import Dashboard from 'Components/Dashboard';
import { connect } from 'react-redux';
import { startGame, stopGame } from '../../actions/gameActions';

import './styles.css';

function newGameInstance(id, user) {
  return new BrickBraker(id, user);
}

const App = ({ game, user }) => {
  const CANVAS_WIDTH = 680;
  const CANVAS_HEIGHT = 520;

  const [currentGameId, setCurrentGameId] = useState(game.id);
  const [gameInstance, setGameInstance] = useState(null);
  const canvasRef = React.useRef(null)

  React.useEffect(() => {
    if (gameInstance) {
      if (game.start) {
        gameInstance.start();
      } else {
        gameInstance.stop();
      }
    }
  }, [game]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!gameInstance) {
      setGameInstance(new BrickBraker(canvas, game.start))
    }
  }, [gameInstance]);

  React.useEffect(() => {
    if ((game.id !== currentGameId)) {
      gameInstance.reStart();
      setCurrentGameId(game.id);
    }
  }, [game]);

  return (
    <div className={'app'}>
      <Dashboard
        user={user}
      />
      <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    game: state.gameReducer,
    user: state.userReducer,
  };
};

export default connect(mapStateToProps)(App);