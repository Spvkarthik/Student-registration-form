import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Student Management System</h1>
      <p style={styles.subtext}>Manage all student records efficiently</p>

      <div style={styles.buttonGroup}>
        <Link to="/add" style={styles.button}>Add Student</Link>
        <Link to="/list" style={styles.button}>View Students</Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '4rem',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh'
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    color: '#333'
  },
  subtext: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
    color: '#666'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem'
  },
  button: {
    padding: '1rem 2rem',
    fontSize: '1rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '8px',
    transition: '0.3s'
  }
};

export default Home;
