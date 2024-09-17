import React from "react";
import { connect } from "react-redux";
import { getTotal, getIsGameFinished } from "Reducers/yatzy/selectors";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const Container = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  margin-top: 8px;
  margin-bottom: 8px;
  margin-left: 8px;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  border: 1px solid #fff;
  padding: 0.7em;
`;

const YatzyDashboard = ({
  total,
  onNewGameClick,
  highScore,
  gameFinished,
  gameFinishedHandler,
}) => {
  const newGameHandler = () => {
    onNewGameClick();
  };

  React.useEffect(() => {
    if (gameFinished) {
      gameFinishedHandler(total);
    }
  }, [gameFinished]);

  return (
    <Box style={{ marginTop: "20px" }}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="outlined" onClick={newGameHandler}>
          {"New game"}
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{ fontSize: "3rem", color: "papayawhip", fontWeight: "bold" }}
        >
          Yatzy
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Container>{`Score: ${total}`}</Container>
          <Container>{`Best: ${highScore}`}</Container>
        </div>
      </div>
    </Box>
  );
};

const mapStateToProps = (state) => {
  const { yatzyReducer: yatzyState } = state;
  return {
    ...yatzyState,
    ...yatzyState.yatzy,
    highScore: yatzyState.highScore,
    total: getTotal(yatzyState),
    gameFinished: getIsGameFinished(yatzyState),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onNewGameClick: () => {
      dispatch({
        type: "YATZY_NEW_GAME",
      });
    },
    gameFinishedHandler: (total) => {
      dispatch({
        type: "YATZY_GAME_FINISHED",
        data: {
          total,
        },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(YatzyDashboard);
