import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserProfile from '../components/UserProfile';
import UserActivity from '../components/UserActivity';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        try {
            const userResponse = await axios.get('/api/profile/');
            setUser(userResponse.data);

            const activitiesResponse = await axios.get('/api/activities/');
            setActivities(activitiesResponse.data);
        } catch (error) {
            console.error('Ошибка загрузки профиля:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Загрузка профиля...</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Профиль пользователя</h1>
            <UserProfile user={user} />
            <UserActivity activities={activities} />
        </div>
    );
};

export default Profile;
