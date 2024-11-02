// static/js/asursoft/App.js
import React from 'react';
import AppLayout from './components/AppLayout';
import Home from './components/Home';

function App() {
    return (
        <div>
            <AppLayout>
                <Home />
            </AppLayout>
        </div>
    );
}

export default App;
