import React from 'react';

const UserActivity = ({ activities }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow mt-4">
            <h2 className="text-lg font-semibold">Последние действия</h2>
            <ul className="list-disc ml-6">
                {activities.map((activity, index) => (
                    <li key={index}>
                        {new Date(activity.timestamp).toLocaleString('ru-RU')} - {activity.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserActivity;
