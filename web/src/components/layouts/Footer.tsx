import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <footer>
      <Box
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 5, sm: 10 }}
        bgcolor="#6573c3"
        color="white"
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
          </Grid>
          <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
            
            <Box>
                <Typography variant="subtitle2">
                    Created by: <Link color="inherit" href="https://github.com/FirozShams">
                    Firoz Shams 
                    </Link>
                </Typography>
            </Box>
            <Box>
                <Typography variant="subtitle2">
                    Source code: <Link color="inherit" href="https://github.com/FirozShams/project-previewer">
                    https://github.com/FirozShams/project-previewer
                    </Link>
                </Typography>
            </Box>

          </Box>
        </Container>
      </Box>
    </footer>
  );
}
