import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import Box from "@mui/material/Box";
import YatzyDashboard from "Components/YatzyDashboard";
import Button from "@mui/material/Button";
import {
  getCurrentProtocol,
  getTotal,
  getIsGameFinished,
} from "Reducers/yatzy/selectors";

const DiceGroup = styled.div`
  display: flex;
  height: 5rem;
  padding-top: 18px;
  justify-content: space-between;
`;

const Dice = styled.div`
  font-size: 5rem;
  line-height: 0;
  cursor: pointer;
`;

const Wrapper = styled.div`
  flex: 2;
  margin-left: 1em;
`;

const Container = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  border: 1px solid #fff;
  padding: 1em;
`;

const Protocol = styled.div`
  display: grid;
  grid-template-columns: auto 50px;
  border: none;
  grid-gap: 5px;
`;

const ProtocolKey = styled.div`
  border: 1px solid aliceblue;
  border-radius: 5px;
  padding: 0.5em;
  grid-column-start: 1;
  align-self: center;
  text-transform: capitalize;
  text-decoration: ${(props) =>
    props.isBonusMissed ? "line-through" : "none"};
  background: ${(props) =>
    props.isUsed ? "rgba(255, 255, 255, 0.4)" : "aliceblue"};
  color: ${(props) => (props.isUsed ? "white" : "black")};
  text-wrap: nowrap;
`;

const ProtocolValue = styled.div`
  padding: 0.5em;
  border: 1px solid aliceblue;
  border-radius: 5px;
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

const Yatzy = ({
  total,
  dices,
  rollDices,
  availableRolls,
  toggleDice,
  setProtocolItemSum,
  protocol,
  gameFinished,
}) => {
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
              <React.Fragment key={obj.label}>
                <ProtocolKey
                  isBonusMissed={
                    (obj.label === "bonus" || obj.label === "yatzyBonus") &&
                    obj.isUsed &&
                    obj.total === 0
                  }
                  isUsed={obj.isUsed}
                >{`${obj.name}: `}</ProtocolKey>
                <ProtocolValue
                  onClick={
                    obj.disabled === true
                      ? null
                      : onProtocolValueClick.bind(this, obj)
                  }
                  isUsed={obj.isUsed}
                  isValid={obj.currentSum > 0}
                  disabled={obj.disabled}
                  isBonus={obj.label === "bonus" || obj.label === "yatzyBonus"}
                  isBonusMissed={
                    (obj.label === "bonus" || obj.label === "yatzyBonus") &&
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
              <Dice
                style={{ color: shouldReRoll ? "#430043" : "papayawhip" }}
                key={`dice-${id}`}
                onClick={diceClickHandler.bind(this, id)}
                dangerouslySetInnerHTML={{ __html: `&#x268${value}` }}
              />
            ))}
          </DiceGroup>
          <div
            style={{
              paddingTop: "20px",
            }}
          >
            <Button
              variant="contained"
              onClick={rollDices}
              disabled={availableRolls === 0 || gameFinished}
              fullWidth={true}
            >
              {`Roll dices (${availableRolls})`}
            </Button>
          </div>

          {gameFinished && (
            <div
              style={{ color: "white" }}
            >{`Game finished with a total of: ${total}`}</div>
          )}
        </Wrapper>
      </Container>
    </Box>
  );
};

const mapStateToProps = ({ yatzyReducer: state }) => {
  return {
    ...state,
    ...state.yatzy,
    ...state.highScore,
    protocol: getCurrentProtocol(state),
    total: getTotal(state),
    gameFinished: getIsGameFinished(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
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
