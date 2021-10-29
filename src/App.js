import logo from "./logo.svg";
import "./App.css";
import 'typeface-roboto'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import LoginLayout from "./layout/LoginLayout";
import { MainProvider } from './context/MainContext'
import ProtectedRoute from './layout/ProtectedRoute'

function App() {
    return (
        <MainProvider>
            <BrowserRouter>
                <Switch>
                    <ProtectedRoute exact path="/" component={AppLayout}></ProtectedRoute>
                    <Route exact path="/login" component={LoginLayout}></Route>
                </Switch>
            </BrowserRouter>
        </MainProvider>
    );
}

export default App;
