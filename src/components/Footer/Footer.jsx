import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  const links = [
    "Meta", "About", "Blog", "Jobs", "Help", "API", "Privacy", 
    "Terms", "Locations", "Popular", "Instagram Lite", "Meta AI", 
    "Threads", "Contact Uploading & Non-Users", "Meta Verified"
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.linksContainer}>
        {links.map((link, index) => (
          <a key={index} href="#" className={styles.link}>
            {link}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;