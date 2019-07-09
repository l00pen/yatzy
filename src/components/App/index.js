import React, { useState } from 'react';
import BrickBraker from 'Components/BrickBraker';
import Dashboard from 'Components/Dashboard';
import { connect } from 'react-redux';
import { startGame, stopGame } from '../../actions/gameActions';
import Yatzy from 'Components/Yatzy';

import './styles.css';

function newGameInstance(id, user) {
  return new BrickBraker(id, user);
}

const App = ({ user }) => {
  return (
    <div className={'app'}>
      <Dashboard
        user={user}
      />
      <Yatzy />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
  };
};

export default connect(mapStateToProps)(App);