import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Box
      style={{
        minWidth: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card sx={{ maxWidth: 345 }} elevation={3}>
        <CardHeader
          title="Page Not Found!"
          titleTypographyProps={{
            align: 'center',
            variant: 'h6',
          }}
        />
        <CardMedia
          sx={{ alignSelf: 'flex-end' }}
          component="img"
          height="225"
          src="https://stories.freepiklabs.com/storage/23103/404-error-rafiki-2773.png"
          alt="Page Not Found"
        />
        <CardContent>
          <Typography variant="body1" color="text.primary">
            The page you requested does not exist.
          </Typography>
        </CardContent>
        <CardActions
          disableSpacing
          style={{
            justifyContent: 'center',
            height: '60px',
            paddingTop: '0px',
          }}
        >
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button variant="text" color="primary">
              GO BACK HOME
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Box>
  );
}
