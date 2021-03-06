import React from 'react';
import {Field, reduxForm} from "redux-form";
import Button from "@material-ui/core/Button";
import {Input} from "../Common/FormsControls/FormsControls";
import {required, maxLengthCreator} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import style from './Login.module.css';

const maxlength20 = maxLengthCreator(20)


const LoginForm = ({handleSubmit, error, captcha}) => {
    console.log(captcha)
    return (
        <form onSubmit={handleSubmit}>
            <div><Field validate={[required, maxlength20]} placeholder={"Email"} name={"email"} component={Input}/>
            </div>
            <div><Field validate={[required, maxlength20]} placeholder={"Password"} name={"password"} component={Input}
                        type={"password"}/></div>
            <div><Field component={Input} type={"checkbox"} name={"rememberMe"}/>Remember me</div>
            <div className={style.formSummaryError}>{error}</div>
            {captcha && <img src={captcha}/> }
            {captcha && <Field validate={[required]} placeholder={"Symbols from image"} component={Input} name={"captcha"} />}

            <div>
                <button>Login</button>
            </div>
            {/*<div><Button variant={'contained'} color={"primary"}>Log in</Button></div>*/}
        </form>
    )
};

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const Login = ({login, isAuth, captcha }) => {
    const onSubmit = formData => {
        login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    };
    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return (
        <div>
            <h1>LoginPage</h1>
            <LoginReduxForm onSubmit={onSubmit} captcha={captcha}/>
        </div>
    )
};
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captcha: state.auth.captcha
});

export default connect(mapStateToProps, {login})(Login);






