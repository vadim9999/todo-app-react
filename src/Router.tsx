import React, { useEffect } from 'react';

import { Route, Routes, Navigate } from 'react-router-dom';
import { Layout, Spin } from 'antd';
// import { authenticate } from './actions/user';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import TodoList from './pages/TodoList/TodoList';

import './Router.css';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from './redux/hooks/hooks';
import PublicRoute from './components/PublicRoute/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
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
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.main.userInfo);
  // const { isLoading, userInfo } = useAuth();
  // componentDidMount() {
  //   console.log(window.location.origin);

  //   const cookies = new Cookies();
  //   const cookie = cookies.get('user');
  //   if (cookie !== undefined && cookie !== 'undefined') {
  //     this.props.authenticate(cookie);
  //   }
  // }

  useEffect(() => {
    dispatch({ type: "INIT" })
  }, []);

  if (isLoading) {
    return <Spin fullscreen />
  }

  return (
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
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
          <Route path="/todolist" element={<ProtectedRoute>
            <TodoList />
          </ProtectedRoute>} />
          <Route path='*' element={<div>Not found</div>} />
        </Routes>

      </Content>
      <Footer style={{ display: 'flex', justifyContent: 'center' }}>
        <p>{moment().format('YYYY')}</p>
      </Footer>
    </Layout>
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
