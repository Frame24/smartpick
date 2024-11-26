import React from 'react';

const MaintenanceMode = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Ведутся технические работы</h1>
                <p className="text-lg">Пожалуйста, зайдите позже.</p>
            </div>
        </div>
    );
};

export default MaintenanceMode;
