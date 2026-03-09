import React from 'react';
import WhatsAppLogo from '../assets/Whatsapp.webp';

const Whatsapp = () => {
  return (
    <div style={styles.container}>
      <a
        href="https://wa.me/59178365424"
        target="_blank"
        rel="noopener noreferrer"
        style={styles.link}
      >
        <img 
          src={WhatsAppLogo} 
          alt="WhatsApp" 
          style={styles.logo}
        />
      </a>
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    bottom: '70px',
    right: '20px',
    zIndex: 1000,
  },
  link: {
    display: 'block',
    transition: 'transform 0.3s ease',
  },
  logo: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  }
};

export default Whatsapp;
