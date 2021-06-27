import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CurrentUserProvider } from '../contexts/currentUser';
import Routes from '../routes/routes';
import TopBar from './TopBar';

const App = () => {
    return (
        <CurrentUserProvider>
            <Router>
                <TopBar />
                <Routes />
            </Router>
        </CurrentUserProvider>
    );
};

export default App;
