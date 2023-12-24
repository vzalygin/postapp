import React from 'react';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
    const { login } = useParams();
    
    return (
        <div className="card w-50 post-card">
        <div className="card-body">
            <div className="hor">
                <h5 className="card-title"></h5>
            </div>
        </div>
    </div>
    );
}

export default UserProfile;