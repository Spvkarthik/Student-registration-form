import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  formContainer: {
    maxWidth: '500px',
    margin: '40px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    fontFamily: 'Arial, sans-serif'
  },
  inputGroup: {
    marginBottom: '15px',
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold'
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px'
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '15px'
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  errorText: {
    color: 'red',
    marginBottom: '10px'
  }
};

const AddStudent = () => {
  const [form, setForm] = useState({
    studentId: '',
    fname: '',
    lname: '',
    email: '',
    dob: '',
    department: '',
    enrolmentYear: '',
    isActive: true
  });
  
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Basic form validation
    if (!form.fname || !form.lname || !form.email || !form.dob) {
      setError('Please fill out all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      await fetch('https://wt-assignment-2-gdbb.onrender.com/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      setError(''); // Clear error on success
      navigate('/');
    } catch (err) {
      setError('Failed to add student. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.formContainer}>
      <h2>Add Student</h2>
      {error && <div style={styles.errorText}>{error}</div>}
      {Object.keys(form).map(key => (
        key !== 'isActive' ? (
          <div key={key} style={styles.inputGroup}>
            <label htmlFor={key} style={styles.label}>
              {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}: {/* This converts the key to a human-readable label */}
            </label>
            <input
              id={key}
              type={key === 'dob' ? 'date' : 'text'}
              name={key}
              value={form[key]}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
        ) : (
          <div key={key} style={styles.checkboxContainer}>
            <label htmlFor="isActive" style={styles.label}>Active:</label>
            <input
              id="isActive"
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
            />
          </div>
        )
      ))}
      <button type="submit" style={styles.button}>Submit</button>
    </form>
  );
};

export default AddStudent;
