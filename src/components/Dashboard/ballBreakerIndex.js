import React from 'react';
import Game from 'Components/Yatzy';
import User from 'Components/User';
import { connect } from 'react-redux';
import { startGame, stopGame, newGame } from '../../actions/gameActions';
import { newUser } from '../../actions/userActions';

import './styles.css';

class Dashboard extends React.Component {
  constructor() {
    super();

    this.startGameHandler = this.startGameHandler.bind(this);
    this.stopGameHandler = this.stopGameHandler.bind(this);
    this.newUserHandler = this.newUserHandler.bind(this);
    this.newGameHandler = this.newGameHandler.bind(this);
  }

  startGameHandler() {
    if (!this.props.game.start) {
      this.props.dispatch(startGame());
    }
  }

  stopGameHandler() {
    if (this.props.game.start) {
      this.props.dispatch(stopGame());
    }
  }

  newUserHandler() {
    this.props.dispatch(newUser());
  }
  
  newGameHandler() {
    this.props.dispatch(newGame());
  }

  render() {
    const { user } = this.props; 
    return (
      <div className={'dashboard'}>
        <h1>{`Hi ${user.name}`}</h1>
        <div className={'dashboard__buttonGroup'}>
          <button
            className={'dashboard__button'}
            onClick={this.startGameHandler}>
              start
          </button>
          <button
            className={'dashboard__button'}
            onClick={this.stopGameHandler}
          >
            stop
          </button>
          <button
            className={'dashboard__button'}
            onClick={this.newGameHandler}
          >
            New game
          </button>
          <button
            className={'dashboard__button'}
            onClick={this.newUserHandler}
          >
            New User
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.gameReducer,
    user: state.userReducer,
  };
};

export default connect(mapStateToProps)(Dashboard);