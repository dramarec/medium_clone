import React, { useState, useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/currentUser';
import useFetch from '../../hooks/useFetch';
import useLocalStorage from '../../hooks/useLocalStorage';
import BackendErrorMessages from './components/backendErrorMessages';

const Authentication = props => {
    const isLogin = props.match.path === '/login/'
    const pageTitle = isLogin ? 'Sign In' : 'Sign Up'
    const descriptionLink = isLogin ? '/register' : '/login'
    const descriptionText = isLogin ? 'Need an account?' : 'Have an account?'
    const apiUrl = isLogin ? '/users/auth/login' : '/users/auth/register'

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false)

    // custom hooks
    const [{ isLoading, error, response }, doFetch] = useFetch(apiUrl)
    const [, setToken] = useLocalStorage('token')
    const [, setCurrentUserState] = useContext(CurrentUserContext)

    const handleSubmit = e => {
        e.preventDefault()
        const user = isLogin ? { email, password } : { username, email, password }
        // console.log("🔥🚀 ===> user", user);
        doFetch({
            method: 'post',
            data: user
        })
    };

    useEffect(() => {
        if (!response) {
            return
        }
        // console.log("🔥🚀 ===> useEffect ===> response", response);
        setToken(response.data.token)
        setIsSuccessfullSubmit(true)
        setCurrentUserState(state => ({
            ...state,
            isLoggedIn: true,
            isLoading: false,
            currentUser: response.data.user
        }))
    }, [response, setToken, setCurrentUserState])

    if (isSuccessfullSubmit) {
        return <Redirect to="/" />
    }

    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">{pageTitle}</h1>
                        <p className="text-xs-center">
                            <Link to={descriptionLink} className="">
                                {descriptionText}
                            </Link>
                        </p>
                        {error && <BackendErrorMessages backendErrors={error} />}

                        <form onSubmit={handleSubmit}>
                            <fieldset>
                                {!isLogin && (
                                    <fieldset className="form-group">
                                        <input
                                            type="username"
                                            className="form-control form-control-lg"
                                            placeholder="Name"
                                            value={username}
                                            onChange={e => setUsername(e.target.value)}
                                        />
                                    </fieldset>
                                )}
                                <fieldset className="form-group">
                                    <input
                                        type="email"
                                        className="form-control form-control-lg"
                                        placeholder="Email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type="password"
                                        autoComplete="on"
                                        className="form-control form-control-lg"
                                        placeholder="Password"
                                        value={password}
                                        onChange={e =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </fieldset>
                                <button
                                    className="btn btn-lg btn-primary pull-xs-right"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {pageTitle}
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Authentication;
