import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import Typography from '@mui/material/Typography';
import { ENDPOINTS } from '../config';

export default function Login() {
  return (
    <Box
        sx={{
          minWidth: '100%',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card sx={{ maxWidth: 345 }} elevation={6}>
          <CardHeader
            title="Authorization Required!"
            titleTypographyProps={{
              align: 'center',
              variant: 'h6',
            }}
          />
          <CardMedia
            sx={{ alignSelf: 'flex-end' }}
            component="img"
            height="225"
            src="https://static.vecteezy.com/system/resources/previews/005/005/840/non_2x/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg"
            alt="User Login"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              We need access to your github account for our service. Please
              click on the button below to connect your github account.
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
            <Button
              variant="contained"
              startIcon={<GitHubIcon />}
              color="secondary"
              onClick={()=>window.location.href = ENDPOINTS.GITHUB_REDIRECTION}
            >
              LOGIN WITH GITHUB
            </Button>
          </CardActions>
        </Card>
      </Box>
  );
}
