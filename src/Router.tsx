import React from 'react';

import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { Layout } from 'antd';
// import { authenticate } from './actions/user';
import Login from './pages/Login/Login';
import Signup from './components/Signup/Signup';
import TodoList from './components/TodoList/TodoList';

import './Router.css';
import moment from 'moment';
// const mapDispatchToProps = (dispatch) =>{
//     return {
//         a
//     }
// }
const { Header, Footer, Content } = Layout;

// const mapStateToProps = (state: any) => ({
//   user_id: state.user._id
// });

// const mapDispatchToProps = (dispatch: any) => ({
//   authenticate: (cookie: any) => dispatch(authenticate(cookie))
// });

// interface RouterProps {
//   authenticate: any;
//   user_id: string;
//   location?: any;
// }

const Router = () => {
  // componentDidMount() {
  //   console.log(window.location.origin);

  //   const cookies = new Cookies();
  //   const cookie = cookies.get('user');
  //   if (cookie !== undefined && cookie !== 'undefined') {
  //     this.props.authenticate(cookie);
  //   }
  // }

  return (
    <BrowserRouter>
      <Layout>
        <Header>
          {/* <div class="header-block"> */}

          {/* <AuthButton /> */}

          {/* {this.props.user_id != undefined ? (
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
          )} */}

          {/* </div> */}
        </Header>
        <Content
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* <Route path="/todolist" element={<TodoList />} /> */}
            {/* <Route path="sign" */}
          </Routes>
        </Content>
        <Footer style={{ display: 'flex', justifyContent: 'center' }}>
          <p>{moment().format('YYYY')}</p>
        </Footer>
      </Layout>
    </BrowserRouter >
  );
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
// const MyRouter = withRouter(ConnectedRouter)
// const Router = connect(mapStateToProps, mapDispatchToProps)(ConnectedRouter);
// const Router = withRouter(MyRouter)
export default Router;
