import React from 'react';
import Game from 'Components/Yatzy';
import User from 'Components/User';
import { connect } from 'react-redux';
import { newUser } from '../../actions/userActions';

import './styles.css';

class Dashboard extends React.Component {
  constructor() {
    super();

    this.newUserHandler = this.newUserHandler.bind(this);
  }

  newUserHandler() {
    this.props.dispatch(newUser());
  }

  render() {
    const { user } = this.props; 
    return (
      <div className={'dashboard'}>
        <h1>{`Hi ${user.name}`}</h1>
        <div className={'dashboard__buttonGroup'}>
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