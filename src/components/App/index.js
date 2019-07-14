import React from 'react';
import Dashboard from 'Components/Dashboard';
import { connect } from 'react-redux';

import Yatzy from 'Components/Yatzy';

import './styles.css';

const App = ({ user }) => {
  return (
    <div className={'app'}>
      <Dashboard
        user={user}
      />
      <Yatzy />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
  };
};

export default connect(mapStateToProps)(App);
