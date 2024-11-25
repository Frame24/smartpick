import React from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

const App = () => {
    return (
        <div id="app" className="min-h-screen flex flex-col">
            <Header />
            <main className="container mx-auto px-4 py-6 flex-1">
                <Dashboard />
            </main>
            <Footer />
        </div>
    );
};

export default App;
