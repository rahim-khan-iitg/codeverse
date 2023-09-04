import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Profile = () => {

    
  // user data from mysql table, edit it with connection
  const user = {
    username: 'YourUsername',
    fullName: 'Your Full Name',
    avatarUrl: '/logo.jpg',
    githubProfile: 'https://github.com/your-github-username',
    twitterProfile: 'https://twitter.com/your-twitter-username',
    // Add more profile information as needed
  };



  return (
    <div className="profile-container">
      <div className="profile-header">
        <Image
          src={user.avatarUrl}
          alt={user.username}
          width={150}
          height={150}
          className="profile-picture"
        />
        <h1>{user.fullName}</h1>
        <p>{user.bio}</p>
        <div className="social-links">
          <a href={user.githubProfile} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={user.twitterProfile} target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
          {/* Add more social links as needed */}
        </div>
      </div>

      <div className="profile-content">
        {/* Add sections for user information like projects, skills, articles, etc. */}
        {/* Example section for user projects */}
        <section className="profile-projects">
          <h2>My Projects</h2>
          {/* Add your projects here */}
        </section>

        {/* Example section for user articles */}
        <section className="profile-articles">
          <h2>My Articles</h2>
          {/* Add your articles here */}
        </section>
      </div>
    </div>
  );
};

export default Profile;
