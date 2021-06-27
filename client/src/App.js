import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CurrentUserProvider } from './contexts/currentUser';
import Routes from './routes/routes';
import TopBar from './components/TopBar';
import CurrentUserChecker from './components/currentUserChecker';

const App = () => {
    return (
        <CurrentUserProvider>
            <CurrentUserChecker>
                <Router>
                    <TopBar />
                    <Routes />
                </Router>
            </CurrentUserChecker>
        </CurrentUserProvider>
    );
};

export default App;
