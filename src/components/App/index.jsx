
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from "react";
import { connect } from "react-redux";
import Yatzy from "Components/Yatzy";
import CssBaseline from '@mui/material/CssBaseline';
import { Container, useMediaQuery, useTheme } from '@mui/material';
import { css, keyframes } from "@emotion/react";


const gradientBackgroundEffect = keyframes`
   0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
`;

const App = ({ }) => {
  const animatedBackground = css`
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 600% 600%;
    animation: ${gradientBackgroundEffect} 10s ease infinite;
    height: 100%;
    overflow: auto;
    padding-bottom: 50px;
  `;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <CssBaseline />
      <div css={animatedBackground} >
        <Container maxWidth={isMobile ? 'lg'  : 'sm'} >
          <Yatzy />
        </Container>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {

  return {

  };
};

export default connect(mapStateToProps)(App);
