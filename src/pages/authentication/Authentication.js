import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

const Authentication = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [isSubmitting, setSubmitting] = useState(false);

    const [{ isLoading, error, response }, doFetch] = useFetch('/users/auth/login')
    console.log('useFetch', isLoading, error, response)

    const handleSubmit = e => {
        e.preventDefault();
        console.log('email :', email, password);
        // setSubmitting(true);
        doFetch({
            method: 'post',
            data: {
                user: {
                    email: 'qq@qq.com',
                    password: '123'
                }
            }
        })
        console.log('values', email, password)
    };


    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Login</h1>
                        <p className="text-xs-center">
                            <Link to="register" className="">
                                Need an account
                            </Link>
                        </p>
                        <form onSubmit={handleSubmit}>
                            <fieldset>
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
                                    // disabled={isSubmitting}
                                    disabled={isLoading}
                                >
                                    Sign in
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
