import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Authentication = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        console.log('email :', email, password);
        setSubmitting(true);
    };

    useEffect(() => {
        if (!isSubmitting) {
            return;
        }
        console.log('useEffect :', useEffect);
        document.title = email;
        axios(
            'https://medium-clone1303-default-rtdb.firebaseio.com/AIzaSyD5j7uS_J2tOkfx1npgV4rkfGNSw2k71_8',
            {
                method: 'post',
                data: {
                    user: {
                        email: 'qwe@matchMedia.ru',
                        password: '123',
                    },
                },
            },
        )
            .then(res => {
                console.log('succes', res);
                setSubmitting(false);
            })
            .catch(err => {
                console.log('error', err);
                setSubmitting(false);
            });
    });

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
                                    disabled={isSubmitting}
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
