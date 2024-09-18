import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import Box from "@mui/material/Box";
import YatzyDashboard from "Components/YatzyDashboard";
import DiceFace from "Components/DiceFace.jsx";
import Button from "@mui/material/Button";
import {
  getCurrentProtocol,
  getTotal,
  getIsGameFinished,
} from "Reducers/yatzy/selectors";

const DiceGroup = styled.div`
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
`;

const Wrapper = styled.div`
  flex: 1;
  margin-left: 1em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Container = styled.div`
  // background-color: rgba(255, 255, 255, 0.5);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  // border-radius: 10px;
  // border: 1px solid #fff;
  // padding: 1em;
`;

const Protocol = styled.div`
  display: grid;
  grid-template-columns: auto 2.5rem;
  border: none;
  // grid-gap: 5px;
  border-radius: 5px;
`;

const ProtocolKey = styled.div`
  border: 1px solid aliceblue;
  // border-radius: 5px;
  padding: 0.3em;
  grid-column-start: 1;
  align-self: center;
  text-transform: capitalize;
  text-decoration: ${(props) =>
    props.isBonusMissed ? "line-through" : "none"};
  background: ${(props) =>
    props.isUsed
      ? "rgba(255, 255, 255, 0.4)"
      : props.isValid
      ? "papayawhip"
      : "aliceblue"};
  color: ${(props) => (props.isUsed ? "white" : "black")};
  text-wrap: nowrap;
  cursor: ${(props) => (props.isUsed || props.isBonus ? "auto" : "pointer")};
`;

const ProtocolValue = styled.div`
  padding: 0.3em;
  border: 1px solid aliceblue;
  // border-radius: 5px;
  grid-column-start: 2;
  text-align: end;
  align-self: center;
  cursor: ${(props) => (props.isUsed || props.isBonus ? "auto" : "pointer")};
  background: ${(props) =>
    props.isUsed
      ? "rgba(255, 255, 255, 0.4)"
      : props.isValid
      ? "papayawhip"
      : "aliceblue"};
  text-decoration: ${(props) =>
    props.isBonusMissed ? "line-through" : "none"};
  color: ${(props) =>
    props.isUsed ? "white" : props.isValid ? "purple" : "black"};
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.5em;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
  pointer-events: ${(props) => (props.isVisible ? "auto" : "none")};
`;

const Yatzy = ({
  total,
  dices,
  rollDices,
  availableRolls,
  toggleDice,
  setProtocolItemSum,
  protocol,
  gameFinished,
  onNewGameClick,
}) => {
  const newGameHandler = () => {
    onNewGameClick();
  };
  const diceClickHandler = (id) => toggleDice(id);
  const onProtocolValueClick = (obj) => {
    setProtocolItemSum(obj);
  };

  return (
    <Box>
      <YatzyDashboard />
      <Container>
        <Protocol>
          {protocol.map((obj) => {
            return (
              <React.Fragment key={obj.id}>
                <ProtocolKey
                  isBonusMissed={
                    (obj.id === "bonus" || obj.id === "yatzyBonus") &&
                    obj.isUsed &&
                    obj.total === 0
                  }
                  isValid={obj.currentSum > 0}
                  isUsed={obj.isUsed}
                  onClick={
                    obj.disabled === true || obj.isUsed
                      ? null
                      : onProtocolValueClick.bind(this, obj)
                  }
                >{`${obj.name}: `}</ProtocolKey>
                <ProtocolValue
                  onClick={
                    obj.disabled === true || obj.isUsed
                      ? null
                      : onProtocolValueClick.bind(this, obj)
                  }
                  isUsed={obj.isUsed}
                  isValid={obj.currentSum > 0}
                  disabled={obj.disabled}
                  isBonus={obj.id === "bonus" || obj.id === "yatzyBonus"}
                  isBonusMissed={
                    (obj.id === "bonus" || obj.id === "yatzyBonus") &&
                    obj.isUsed &&
                    obj.total === 0
                  }
                >
                  {obj.isUsed ? `${obj.total}` : `${obj.currentSum}`}
                </ProtocolValue>
              </React.Fragment>
            );
          })}
        </Protocol>
        <Wrapper>
          <DiceGroup>
            {dices.map(({ id, value, shouldReRoll }, i) => (
              <DiceFace
                key={`dice-${id}`}
                value={value + 1}
                onClick={diceClickHandler.bind(this, id)}
                size="100px"
                shouldReRoll={shouldReRoll}
              />
            ))}
          </DiceGroup>
          <div
            style={{
              paddingTop: "20px",
            }}
          >
            <Button
              onClick={rollDices}
              disabled={availableRolls === 0 || gameFinished}
              fullWidth={true}
              sx={{
                padding: "0.5em 1.5em",
                background: "purple",
                color: "#c0c0c0",
                "&.Mui-disabled": {
                  background: "#eaeaea",
                  color: "#c0c0c0",
                },
                "&:hover": {
                  background: "papayawhip",
                },
              }}
            >
              {`Rolls (${availableRolls})`}
            </Button>
          </div>
        </Wrapper>

        <Overlay isVisible={gameFinished}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{ marginBottom: "20px" }}
            >{`🏆 Well played! You scored: ${total} 🎯`}</div>
            <Button
              sx={{
                padding: "0.5em 1.5em",
                background: "transparent",
                color: "purple",
                border: "1px solid purple ",
                "&:hover": {
                  border: "1px solid papayaWhip",
                  color: "papayaWhip",
                },
              }}
              onClick={newGameHandler}
            >
              {"New game"}
            </Button>
          </div>
        </Overlay>
      </Container>
    </Box>
  );
};

const mapStateToProps = ({ yatzyReducer: state }) => {
  console.log(state);
  return {
    ...state,
    protocol: getCurrentProtocol(state),
    total: getTotal(state),
    gameFinished: getIsGameFinished(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onNewGameClick: () => {
      dispatch({
        type: "YATZY_NEW_GAME",
      });
    },
    rollDices: () => {
      dispatch({
        type: "YATZY_ROLL_DICES",
      });
    },
    toggleDice: (id) => {
      dispatch({
        type: "YATZY_TOGGLE_DICE",
        data: {
          id,
        },
      });
    },
    setProtocolItemSum: (protocolItem) => {
      dispatch({
        type: "YATZY_SET_PROTOCOL_ITEM_SUM",
        data: { ...protocolItem },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Yatzy);
