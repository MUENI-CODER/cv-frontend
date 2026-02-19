import React, { useState } from 'react';
import './Profile.css';

function Profile() {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    title: 'Full Stack Developer',
    location: 'New York',
    bio: 'Passionate developer with 5 years of experience...'
  });

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setProfile(formData);
    setEditing(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1>Profile</h1>
        
        {!editing ? (
          <>
            <div className="profile-info">
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Title:</strong> {profile.title}</p>
              <p><strong>Location:</strong> {profile.location}</p>
              <p><strong>Bio:</strong> {profile.bio}</p>
            </div>
            <button className="edit-btn" onClick={handleEdit}>Edit Profile</button>
          </>
        ) : (
          <>
            <div className="profile-form">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Professional Title"
              />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
              />
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Bio"
                rows="4"
              />
            </div>
            <div className="profile-buttons">
              <button className="save-btn" onClick={handleSave}>Save</button>
              <button className="cancel-btn" onClick={() => setEditing(false)}>Cancel</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
