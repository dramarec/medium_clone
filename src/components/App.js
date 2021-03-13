import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../routes/routes';
import TopBar from './TopBar';

const App = () => {
    return (
        <div>
            <Router>
                <TopBar />
                <Routes />
            </Router>
        </div>
    );
};

export default App;
