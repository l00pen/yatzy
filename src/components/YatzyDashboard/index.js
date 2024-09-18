import React from "react";
import { connect } from "react-redux";
import { getTotal, getIsGameFinished } from "Reducers/yatzy/selectors";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const Container = styled.div`
  // background-color: rgba(255, 255, 255, 0.5);
  margin-top: 8px;
  margin-bottom: 8px;
  margin-left: 8px;
  display: flex;
  justify-content: space-between;
  // border-radius: 10px;
  // border: 1px solid #fff;
  padding: 0.4em;
  color: white;
`;

const YatzyDashboard = ({
  total,
  onNewGameClick,
  highScore,
  gameFinished,
  gameFinishedHandler,
  isMaxiYatzy,
  onMaxiYatzyClick,
}) => {
  const newGameHandler = () => {
    onNewGameClick(isMaxiYatzy);
  };

  React.useEffect(() => {
    if (gameFinished) {
      gameFinishedHandler(total, isMaxiYatzy);
    }
  }, [gameFinished]);

  const onMaxiYatzyClickHandler = () => {
    onMaxiYatzyClick(isMaxiYatzy);
  };

  return (
    <Box style={{}}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{ fontSize: "3rem", color: "papayawhip", fontWeight: "bold" }}
        >
          Yatzy
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Container>{`Score: ${total}`}</Container>
          <Container>{`Best: ${highScore}`}</Container>
          <Button
            onClick={newGameHandler}
            sx={{
              padding: "0.5em 1.5em",
              background: "transparent",
              color: "purple",
              border: "1px solid purple ",
              marginLeft: "8px",
              "&:hover": {
                border: "1px solid papayaWhip",
                color: "papayaWhip",
              },
            }}
          >
            {"New game"}
          </Button>
          <Button
            onClick={onMaxiYatzyClickHandler}
            sx={{
              padding: "0.5em 1.5em",
              background: "transparent",
              color: isMaxiYatzy ? "purple" : "papayawhip",
              border: isMaxiYatzy
                ? "1px solid purple "
                : "1px solid papayawhip",
              marginLeft: "8px",
              "&:hover": {
                border: "1px solid papayaWhip",
                color: "papayaWhip",
              },
            }}
          >
            {"MAXI YATZY"}
          </Button>
        </div>
      </div>
    </Box>
  );
};

const mapStateToProps = (state) => {
  const { yatzyReducer: yatzyState, isMaxiYatzy } = state;
  return {
    ...yatzyState,
    total: getTotal(yatzyState),
    gameFinished: getIsGameFinished(yatzyState),
    isMaxiYatzy,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onNewGameClick: (isMaxiYatzy) => {
      isMaxiYatzy
        ? dispatch({ type: "MAXI_YATZY_NEW_GAME" })
        : dispatch({
            type: "YATZY_NEW_GAME",
          });
    },
    gameFinishedHandler: (total, isMaxiYatzy) => {
      dispatch({
        type: "YATZY_GAME_FINISHED",
        data: {
          total,
          isMaxiYatzy,
        },
      });
    },
    onMaxiYatzyClick: (isMaxiYatzy) => {
      const newIsMaxiYatzy = !isMaxiYatzy;
      dispatch({
        type: "YATZY_TOGGLE_MAXI_YATZY",
        data: {
          isMaxiYatzy: newIsMaxiYatzy,
        },
      });

      if (newIsMaxiYatzy) {
        dispatch({ type: "MAXI_YATZY_NEW_GAME" });
      } else {
        dispatch({ type: "YATZY_NEW_GAME" });
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(YatzyDashboard);
