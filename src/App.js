import React, {Component, Suspense} from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, HashRouter, Route, withRouter} from "react-router-dom";

import UsersContainer from "./components/Users/UsersContainer";

import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import {compose} from "redux";
import {connect, Provider} from "react-redux";
import {initializeApp} from './redux/app-reducer'
import PreLoader from "./components/Common/Preloader/PreLoader";
import store from "./redux/redux-store";
import {withSuspense} from "./hoc/withSuspense";


// import DialogsContainer from "./components/Dialogs/DialogsContainer";
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
// import ProfileContainer from "./components/Profile/ProfileContainer";
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));


class App extends Component {

    componentDidMount() {
        this.props.initializeApp();
    };

    render() {
        if (!this.props.initialized) {
            return <PreLoader/>
        }
        return (
            <BrowserRouter>
                <div className='app-wrapper'>
                    <HeaderContainer/>
                    <Navbar/>
                    <div className="app-wrapper-content">
                        <Route path='/profile/:userId?'
                               render={withSuspense(ProfileContainer)}
                        />
                        <Route path='/dialogs'
                               render={withSuspense(DialogsContainer)}
                        />
                        <Route path='/users'
                               render={() => <UsersContainer/>}
                        />
                        <Route path='/login'
                               render={() => <LoginPage/>}
                        />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}


const mapStateToProps = state => ({
    initialized: state.app.initialized,
});

const AppContainer = compose(withRouter, connect(mapStateToProps, {initializeApp}))(App);

const SocialApp = props => {
    return <BrowserRouter >
        {/*<BrowserRouter basename={process.env.PUBLIC_URL}>*/}
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
};

export default SocialApp;
