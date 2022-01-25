import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import 'typeface-roboto';
import AppLayout from './layout/AppLayout';
import SignIn from './layout/login/SignIn';
import Signup from './layout/login/Signup';
import LostPassword from './layout/login/LostPassword';
import ChangePassword from './layout/login/ChangePassword';
import ValidateAccount from './layout/login/ValidateAccount';
import { MainProvider } from './context/MainContext';
import ProtectedRoute from './layout/ProtectedRoute';
import Dialog from './layout/Dialog';

const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#1185AF'
        },
        secondary: {
            main: '#9f33d0'
        },
        background: {
            default: '#E8E8E8'
        },
        divider: 'rgba(4,178,241,0.12)'
    },
    typography: {
        fontSize: 13,
        fontWeightLight: 400,
        fontWeightRegular: 400,
        h1: {
            fontSize: '4rem'
        }
    }
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <MainProvider>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/signin" component={SignIn} />
                        <Route exact path="/signup" component={Signup} />
                        <Route
                            exact
                            path="/lost_password"
                            component={LostPassword}
                        />
                        <Route
                            path="/change_password"
                            component={ChangePassword}
                        />
                        <Route
                            path="/validate_account"
                            component={ValidateAccount}
                        />
                        <ProtectedRoute
                            exact
                            path="/*"
                            component={AppLayout}
                        />
                    </Switch>
                </BrowserRouter>
                <Dialog />
            </MainProvider>
        </ThemeProvider>
    );
}
export default App;
