import React from "react";
import { connect } from "react-redux";
import { newUser } from "../../actions/userActions";

import Box from "@mui/material/Box";

class Dashboard extends React.Component {
  constructor() {
    super();

    this.newUserHandler = this.newUserHandler.bind(this);
  }

  newUserHandler() {
    this.props.dispatch(newUser());
  }

  render() {
    return <Box></Box>;
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(Dashboard);
