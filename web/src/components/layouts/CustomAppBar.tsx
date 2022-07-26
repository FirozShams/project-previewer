import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Avatar, Stack } from '@mui/material';
import GitHub from '@mui/icons-material/GitHub';

export default function CustomAppBar(props: any) {
  return (
    <AppBar position="static">
        <Toolbar>
          <GitHub fontSize='large'/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, paddingLeft: 1, paddingTop: 0.5}} >
            Project Previewer
          </Typography>
          {props.user? 
            (<div>
                <Stack direction="row" spacing={1} sx={{alignItems:'center'}}>

                    <Typography variant="subtitle2" >
                        {props.user.login}
                    </Typography>
                    <Avatar alt="Username" src={props.user && props.user.avatar_url}/>
                </Stack>
                
            </div>):(<div><AccountCircle /></div>)}
        </Toolbar>
    </AppBar>
  );
}
