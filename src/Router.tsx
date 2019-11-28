import React from 'react';

import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { Layout, Button } from 'antd';
import { authenticate } from './actions/user';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import TodoList from './components/TodoList/TodoList';

import './Router.css';
// const mapDispatchToProps = (dispatch) =>{
//     return {
//         a
//     }
// }
const { Header, Footer, Content } = Layout;

const mapStateToProps = (state: any) => ({
  user_id: state.user._id
});

const mapDispatchToProps = (dispatch: any) => ({
  authenticate: (cookie:any) => dispatch(authenticate(cookie))
});

interface RouterProps {
  authenticate: any;
  user_id: string;
}

class ConnectedRouter extends React.Component<RouterProps, {}> {
  componentDidMount() {
    const cookies = new Cookies();
    const cookie = cookies.get('user');
    console.log(cookies.get('user'));
    if (cookie !== undefined && cookie !== 'undefined') {
      this.props.authenticate(cookie);
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Header>
            {/* <div class="header-block"> */}

            {/* <AuthButton /> */}

            {this.props.user_id != undefined ? (
              <div className="header-block-btns">
                <Link to="/todolist">
                  <Button type="primary">Todolist</Button>
                </Link>
                <Link to="/signout">
                  <Button type="primary">SignOut</Button>
                </Link>
              </div>
            ) : (
              <div>
                <Link to="/">
                  <Button type="primary">Login</Button>
                </Link>
                <a> or</a>
                <Link to="/signup">
                  <Button type="primary">Signup</Button>
                </Link>
              </div>
            )}

            {/* </div> */}
          </Header>
          <Content
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/signup" exact component={Signup} />

              <Route path="/todolist" component={TodoList} />
              {/* <Route path="sign" */}
            </Switch>
          </Content>
          <Footer style={{ display: 'flex', justifyContent: 'center' }}>
            <p>2019</p>
          </Footer>
        </Layout>
      </BrowserRouter>
    );
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

const Router = connect(mapStateToProps, mapDispatchToProps)(ConnectedRouter);
export default Router;
