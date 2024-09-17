import React from "react";
import { connect } from "react-redux";

import Yatzy from "Components/Yatzy";

import CssBaseline from '@mui/material/CssBaseline';
import { Container, useMediaQuery, useTheme } from '@mui/material';


const App = ({ }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <CssBaseline />
        <div style={{
          backgroundColor: 'black',
          position: 'relative',
          height: '100vh',
          overflow: 'hidden',
        }}>
      <div style={{
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        filter: 'blur(25px)',
        position: 'absolute',
        bottom: '-70%',  
        background: 'radial-gradient(circle, #1e237f, transparent)',
        zIndex: 0,
      }}/>
      <div style={{
        width: '100%',
        height: '50%',
        borderRadius: '50%',
        filter: 'blur(25px)',
        position: 'absolute',
        left: '-40%',  
        background: 'radial-gradient(circle at center, blue, transparent 40%)',
        zIndex: 0,
      }}/>
      <div style={{
        position: 'relative',  
        zIndex: 1,
        overflow: 'auto', 
        height: '100vh',
        paddingBottom: '100px',   
      }}>
      <Container maxWidth={isMobile ? 'lg'  : 'sm'} >
        <Yatzy />
      </Container>
        </div>
        </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {

  };
};

export default connect(mapStateToProps)(App);
