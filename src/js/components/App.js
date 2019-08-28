import React from 'react';
import AppRouter from './AppRouter'

const appStyles = {
    paddingTop: 65,
    paddingBottom: 40
};

const App = () => {

    return (
        <div className="App" style={appStyles}>
            <AppRouter />
        </div>
    );
};

export default App;
