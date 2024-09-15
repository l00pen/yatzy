import React from "react";
import { connect } from "react-redux";
import { getTotal, getIsGameFinished } from "Reducers/yatzy/selectors";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

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
    <Box>
      <div>
        <div>{`Total: ${total}`}</div>
        <Button variant="outlined" onClick={newGameHandler}>
          {"New game"}
        </Button>
      </div>
      <div>
        {`Current High Score: `}
        {/* {highScore.length > 0
          ? highScore.map(({ score }) => (
              <div key={`${score}`}>{`${score}`}</div>
            ))
          : { highScore }} */}
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
