import React from "react";
import { connect } from "react-redux";

import Yatzy from "Components/Yatzy";

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

const App = ({ user }) => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Yatzy />
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
  };
};

export default connect(mapStateToProps)(App);
