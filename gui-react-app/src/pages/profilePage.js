import React, { useState, useEffect } from 'react';
import './profilePage.css';

const ProfilePage = () => {
    const [profileImage, setProfileImage] = useState(sessionStorage.getItem('profileImage') || '/image16.png'); 
    const [name, setName] = useState(sessionStorage.getItem('userName') || '');
const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    const handleSubmit = () => {
        sessionStorage.setItem('userName', name);
        sessionStorage.setItem('profileImage', profileImage);
        alert('Profile saved successfully!');
    };

    return (
        <div className="profile-page">
            <h1 className="profile-title">Profile</h1>
            
            <div className="profile-pic-container">
                <div 
                    className="profile-pic" 
                    style={{ backgroundImage: `url(${profileImage})` }}
                ></div>
                <label htmlFor="file-input" className="upload-btn">
                    <img src="/image18.png" alt="Upload Icon" className="upload-icon" />
                </label>
                <input 
                    type="file" 
                    id="file-input" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                />
            </div>

            <div className="input-group">
                <input
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Name"
                />
            </div>

            <button className="submit-btn" onClick={handleSubmit}>Save Profile</button>
        </div>
    );
};

export default ProfilePage;