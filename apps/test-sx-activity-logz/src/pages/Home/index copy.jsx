import React, { useState } from 'react';
import Shell from '@steelxorg/shell';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Calculator } from '@steelxorg/sx-activity-logz';
import { addLeadingZeros } from '@steelxorg/sx-activity-logz';

function Home() {
  const [zero, setZero] = useState(0);
  return (
    <Shell>
      <Box p={2}>
        <Typography>
          This is the MyOrg Test-Sx-Activity-Logz Homepage from{' '}
          <code>@steelxorg/test-sx-activity-logz</code>.
        </Typography>
        <Link to="/">Click to go back home.</Link>
        <Calculator />
        {zero}
        <Button
          onClick={() => {
            const res = addLeadingZeros(1, 10);
            setZero(res);
          }}
        >
          add
        </Button>
      </Box>
    </Shell>
  );
}

export default Home;
