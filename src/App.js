import logo from "./logo.svg";
import "./App.css";
import 'typeface-roboto'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Login from "./layout/login/Login";
import Signup from "./layout/login/Signup";
import LostPassword from "./layout/login/LostPassword";
import ChangePassword from "./layout/login/ChangePassword";
import { MainProvider } from './context/MainContext'
import ProtectedRoute from './layout/ProtectedRoute'

function App() {
    return (
        <MainProvider>
            <BrowserRouter>
                <Switch>
                    <ProtectedRoute exact path="/" component={AppLayout}></ProtectedRoute>
                    <Route exact path="/login" component={Login}></Route>
                    <Route exact path="/signup" component={Signup}></Route>
                    <Route exact path="/lost_password" component={LostPassword}></Route>
                    <Route path="/change_password" component={ChangePassword}></Route>
                </Switch>
            </BrowserRouter>
        </MainProvider>
    );
}

export default App;
