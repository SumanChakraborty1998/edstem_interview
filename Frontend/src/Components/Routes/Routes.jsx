import React from "react";
import { Switch, Route } from "react-router-dom";
import { NavBar } from "./../NavBar/NavBar";
import { Home } from "./../Home/Home";
import { Signup } from "./../Signup/Signup";
import { Login } from "../Login/Login";

export const Routes = () => {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/login" exact>
                    <Login />
                </Route>
                <Route path="/signup" exact>
                    <Signup />
                </Route>
            </Switch>
        </div>
    );
};
