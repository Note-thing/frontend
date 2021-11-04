import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import 'typeface-roboto';
import AppLayout from './layout/AppLayout';
import SignIn from './layout/login/SignIn';
import Signup from './layout/login/Signup';
import LostPassword from './layout/login/LostPassword';
import ChangePassword from './layout/login/ChangePassword';
import { MainProvider } from './context/MainContext';
import ProtectedRoute from './layout/ProtectedRoute';

function App() {
    return (
        <MainProvider>
            <BrowserRouter>
                <Switch>
                    <ProtectedRoute
                        exact
                        path="/"
                        component={AppLayout}
                    />
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
                </Switch>
            </BrowserRouter>
        </MainProvider>
    );
}

export default App;
