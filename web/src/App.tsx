import * as React from 'react';
import Box from '@mui/material/Box';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import NotFound from './pages/NotFound';
import PreviewProjects from './pages/PreviewProjects';
import useToken from './hooks/useToken';
import CustomAppBar from './components/layouts/CustomAppBar';
import Footer from './components/layouts/Footer';

import { authenticateUser, getUserDetails } from './requests';

export default function App() {
  const { token, setToken } = useToken();
  const [stateToken, setStateToken] = React.useState('');
  const [user, setUser] = React.useState<any>();

  React.useEffect(() => {
    const authenticate = () => {
      if (token) {
        setStateToken(token);
        getUserDetails(token)
          .then((userData) => {
            setUser(userData);
          })
      } else {
        const code =
          window.location.href.match(/\?code=(.*)/) &&
          window?.location?.href?.match(/\?code=(.*)/)?.[1];
        if (code) {
          authenticateUser(code)
            .then((newToken) => {
              setToken(newToken);
              setStateToken(newToken);
              window.location.href = '/';
            });
        }
      }
    };
    authenticate();
  }, [token]);

  return (
    <Box sx={{width: '100%', bgcolor:'#8EC5FC', backgroundImage: 'linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)'}}>
      <CustomAppBar user={user}/>
      {stateToken?(<BrowserRouter>
        <Routes>
          <Route path="/" element={<PreviewProjects user={user} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>):(<Login />)}
      <Footer/>
    </Box>
  );
}
