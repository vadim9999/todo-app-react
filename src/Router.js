import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch, Link, withRouter, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import { authenticate } from "./actions/user"
import Login from "./components/Login/Login"
import Signup from "./components/Signup/Signup"
import TodoList from "./components/TodoList/TodoList"
import Cookies from 'universal-cookie'

import "./Router.css"
// const mapDispatchToProps = (dispatch) =>{
//     return {
//         a
//     }
// }
const mapStateToProps = (state) => {
    return {
        user_id: state.user._id
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: (cookie) => dispatch(authenticate(cookie))
    }
}
class ConnectedRouter extends React.Component {

    componentDidMount() {
        const cookies = new Cookies();
        const cookie = cookies.get("user")
        console.log(cookies.get("user"));
        if (cookie != undefined && cookie != "undefined") {
            this.props.authenticate(cookie)
        }


    }
    render() {
        return (
            <BrowserRouter>
                <div class="header-block">
                    {/* <AuthButton /> */}

                    {
                        this.props.user_id != undefined ? (
                                    <div className="header-block-btns">
                                    <Link to="/todolist"><button>Todolist</button></Link>
                                    <Link to="/signout"><button>SignOut</button></Link>
                                    </div>
                        ) : (
                               <div>

                               
                                        <Link to="/"><button>Login</button></Link>
                                        <a> or</a>
                                        <Link to="/signup" ><button>Signup</button></Link>
                                        </div>
                            )


                    }

                </div>

                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/signup" exact component={Signup} />

                    <Route path="/todolist" component={TodoList} />
                    {/* <Route path="sign" */}
                </Switch>
            </BrowserRouter>
        )

    }
}

// const fakeAuth = {
//     isAuthenticated: false,
//     authenticate(cb){
//         this.isAuthenticated = true;
//         setTimeout(cb, 100)
//     },
//     signout(cb){
//         this.isAuthenticated = false;
//         setTimeout(cb,100)
//     }
// }
// const AuthButton = withRouter(({history}) => {
//     console.log("this is auth button");
//     console.log(history);

//     return fakeAuth.isAuthenticated ? (
//         <p>
//             Welcome!{" "}
//             <button onClick={() =>{
//                 fakeAuth.signout(() => history.push("/"))}}>
//                 Sign out
//             </button>
//         </p>
//     ): (
//         <p>
//             YOu are not logged in.
//         </p>
//     )
// }


//     )

// function PrivateRoute({component: Component, ...rest }){
//     console.log("this is private router");

//     return (
//         <Route 
//         {...rest}
//         render={props => fakeAuth.isAuthenticated ? (
//             <Component {...props} />

//         ): (
//             <Redirect 
//             to={{pathname: "/",
//             state: {from: props.location}
//             }}
//             />
//         )
//         }
//         />
//     )
// }

const Router = connect(mapStateToProps, mapDispatchToProps)(ConnectedRouter)
export default Router