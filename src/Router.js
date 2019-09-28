import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch, Link, withRouter, Redirect } from "react-router-dom"
import Login from "./components/Login/Login"
import Signup from "./components/Signup/Signup"
import TodoList from "./components/TodoList"
class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <AuthButton />
                    <ul>
                        <li>
                            <Link to="/todolist">Todolist</Link>
                        </li>
                        <li>
                            <Link to="/"> Login</Link>
                        </li>
                    </ul>
                </div>

                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/signup" exact component={Signup} />
                    <PrivateRoute path="/todolist" component={TodoList} />
                    {/* <Route path="sign" */}
                </Switch>
            </BrowserRouter>
        )

    }
}

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb){
        this.isAuthenticated = true;
        setTimeout(cb, 100)
    },
    signout(cb){
        this.isAuthenticated = false;
        setTimeout(cb,100)
    }
}
const AuthButton = withRouter(({history}) => 
    fakeAuth.isAuthenticated ? (
        <p>
            Welcome!{" "}
            <button onClick={() =>{
                fakeAuth.signout(() => history.push("/"))}}>
                Sign out
            </button>
        </p>
    ): (
        <p>
            YOu are not logged in.
        </p>
    )
    
    )

function PrivateRoute({component: Component, ...rest }){
    console.log("this is private router");
    
    return (
        <Route 
        {...rest}
        render={props => fakeAuth.isAuthenticated ? (
            <Component {...props} />

        ): (
            <Redirect 
            to={{pathname: "/",
            state: {from: props.location}
            }}
            />
        )
        }
        />
    )
}


export default Router