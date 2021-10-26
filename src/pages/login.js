import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import STORAGEKEY from '../config/APP/app.config';
import { ApiPost } from '../helper/API/ApiData';
import AuthStorage from '../helper/AuthStorage';
import { changeLoginState } from '../redux/actions/loginAction';

const login = () => {
    const router = useRouter()
    const dispatch = useDispatch();
    const { is_loggedin } = useSelector((state) => state.login);
    const loginFormState = {
        email: "",
        password: "",
    };

    const login_Err = {
        emailError: "",
        emailFormatErr: "",
        passError: "",
    };

    const [statelogin, setStatelogin] = useState(loginFormState);
    const [loginErrors, setLoginErrors] = useState(login_Err);
    const [stayLogedIn, setStayLogedIn] = useState(false);
    const [incorrectPass, setIncorrectPass] = useState("");
    const [invalidEmail, setInvalidEmail] = useState("");
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [saveEmail, setSaveEmail] = useState(false);
    const [isTypePassword, setIsTypePassword] = useState(true);

    const loginValidation = () => {
        let flag = false
        let login_Err = {
            emailError: "",
            emailFormatErr: "",
            passError: "",
        };

        const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (statelogin.email && !validEmail.test(statelogin.email)) {
            login_Err.emailFormatErr = "잘못된 이메일."
            flag = true
        }

        if (!statelogin.email) {
            login_Err.emailError = "필수 정보입니다.";
            flag = true
        }

        if (statelogin.password === "") {
            login_Err.passError = "비밀번호를 한번 더 확인해주세요.";
            flag = true
        }

        setLoginErrors(login_Err);
        setIncorrectPass("");

        return flag;
    };

    const setLocalEmail = () => {
        const email = AuthStorage.getStorageData(STORAGEKEY.email);
        if (email) {
            setStatelogin({
                ...statelogin,
                email: email
            })
        }
    }

    const Login = (loginWith) => {
        if (loginValidation()) {
            setBtnDisabled(true);
            return;
        }

        ApiPost("admin/auth/login", {
            email: statelogin.email,
            password: statelogin.password,
        })
            .then((res) => {

                setStatelogin(loginFormState);
                dispatch(changeLoginState(true))
                debugger
                if (saveEmail) {
                    AuthStorage.setStorageData(STORAGEKEY.email, statelogin.email, true);
                } else {
                    AuthStorage.deleteKey(STORAGEKEY.email)
                }

                AuthStorage.setStorageData(
                    STORAGEKEY.token,
                    res.data.token,
                    stayLogedIn
                );
                delete res.data.token;
                AuthStorage.setStorageJsonData(
                    STORAGEKEY.userData,
                    res.data,
                    stayLogedIn
                );
                router.push("/user/list");
            })
            .catch((error) => {
                if (error === "Wrong Email") {
                    setIncorrectPass("");
                    setInvalidEmail("필수 정보입니다.");
                }
                if (error === "Wrong Password") {
                    setInvalidEmail("");
                    setIncorrectPass("비밀번호를 한번 더 확인해주세요.");
                }
            });
    };

    const validityChack = () => {
        if (statelogin.email !== "" && statelogin.password !== "") {
            setBtnDisabled(false);
        } else {
            setBtnDisabled(true);
        }
    };

    const togglrPass = () => {
        setIsTypePassword(!isTypePassword)
    }

    useEffect(() => {
        validityChack();
    }, [statelogin]);

    useEffect(() => {
        setLocalEmail()
    }, []);

    return (
        <div data-layout="centered" className="w-full h-screen flex items-center justify-center bg-gray-50">
            <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:w-1/4">
                <h1 className="w-full text-2xl text-purple-600 pb-28 text-center font-bold">관리자 로그인</h1>
                <div className="w-full mb-4">
                    <div className={`form-element`}>
                        <div className="form-label">이메일</div>
                        <input
                            name="email"
                            type="text"
                            className="form-input"
                            placeholder="이메일 주소"
                            value={statelogin.email}
                            onChange={(e) => setStatelogin({ ...statelogin, email: e.target.value })}
                        />
                        {loginErrors.emailError && (
                            <p className="form-error">
                                {loginErrors.emailError}
                            </p>
                        )}
                        {loginErrors.emailFormatErr && (
                            <p className="form-error">
                                {loginErrors.emailFormatErr}
                            </p>
                        )}
                        {!loginErrors.emailError &&
                            !loginErrors.emailFormatErr &&
                            invalidEmail && (
                                <p className="form-error">{invalidEmail}</p>
                            )}
                    </div>
                </div>
                <div className="w-full mb-4 relative">
                    <div className={`form-element`}>
                        <div className="form-label">비밀번호</div>
                        <input
                            name="password"
                            type={isTypePassword ? "password" : "text"}
                            className="form-input"
                            placeholder="비밀번호"
                            value={statelogin.password}
                            onChange={(e) => setStatelogin({ ...statelogin, password: e.target.value })}
                        />

                        <img className="absolute right-2.5 top-9" src="./images/view-eye.png" onClick={togglrPass} />

                        {loginErrors.passError && (
                            <p className="form-error">
                                {loginErrors.passError}
                            </p>
                        )}
                        {!loginErrors.passError && incorrectPass && (
                            <p className="form-error">{incorrectPass}</p>
                        )}
                    </div>
                </div>
                <div className="w-full mb-4">
                    <div className={`form-element form-element-inline`}>
                        <div className="flex items-center justify-start space-x-2">
                            <div className="inline-flex items-center space-x-2 pb-12">
                                <input
                                    type="checkbox"
                                    value="0"
                                    name="saveEmail"
                                    className="form-checkbox text-blue-500 h-4 w-4"
                                    onChange={(e) => setSaveEmail(e.target.checked)}
                                />
                                <span>이메일 저장</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full mb-4">
                    <button
                        type="button"
                        className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded w-full pt-5 pb-4 text-xl font-bold"
                        onClick={Login}
                        disabled={btnDisabled}
                    >로그인
                    </button>
                </div>
            </div>
        </div>
    )
}

export default login
