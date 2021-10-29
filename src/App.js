import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import LoginLayout from "./layout/LoginLayout";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={AppLayout}></Route>
                <Route exact path="/" component={LoginLayout}></Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
