import React from 'react';

const UserProfile = ({ user }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Информация</h2>
            <p>
                <strong>Имя:</strong> {user.name}
            </p>
            <p>
                <strong>Email:</strong> {user.email}
            </p>
        </div>
    );
};

export default UserProfile;
