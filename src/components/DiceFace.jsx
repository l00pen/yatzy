import React from 'react';
import { Box } from '@mui/material';

const dotStyle = {
  width: '100%',   
  height: '100%',
  borderRadius: '50%',
  
};

// Dots for each dice value (1-6) in a 3x3 grid
const dicePatterns = {
  1: [false, false, false, false, true, false, false, false, false],
  2: [true, false, false, false, false, false, false, false, true],
  3: [true, false, false, false, true, false, false, false, true],
  4: [true, false, true, false, false, false, true, false, true],
  5: [true, false, true, false, true, false, true, false, true],
  6: [true, false, true, true, false, true, true, false, true],
};
const DiceFace = ({ value, shouldReRoll, onClick }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)', // 3x3 grid for dice dots
        gap: '6%',
        width: '50px',
        height: '50px',
        backgroundColor: shouldReRoll ?  '#eee' : '#ccc' ,
        border: '2px solid ',
        borderColor: shouldReRoll ? '#430043' : 'papayawhip',
        borderRadius: '8px', // Rounded corners like a dice
        padding: '8px',
        margin: '2px',
      }}
      onClick={onClick}
    >
      {dicePatterns[value].map((dot, index) => { 
        return (
        <Box key={`${value}-${index}`} sx={dot ? dotStyle : {}} style={{ backgroundColor: dot ? shouldReRoll ? "#430043" : "papayawhip" : 'none'}}  />
      )})}
    </Box>
  );
};

export default DiceFace;