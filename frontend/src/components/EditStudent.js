import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
    backgroundColor: '#007bff',
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

const EditStudent = () => {
  const { id } = useParams();  // Get the student ID from the URL
  const navigate = useNavigate();
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

  // Fetch student data on component mount
  useEffect(() => {
    console.log(`Fetching data for student with ID: ${id}`);  // Log the student ID
    fetch(`https://wt-assignment-2-gdbb.onrender.com/students/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch student data');
        }
        return res.json();
      })
      .then(data => {
        console.log('Student data fetched:', data);  // Log the fetched data
        setForm(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);  // Log error if fetch fails
        setError(error.message);  // Display error message
      });
  }, [id]);  // Trigger re-fetch when `id` changes

  // Handle form field changes
  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault();

    // Validation to ensure that required fields are filled
    if (!form.fname || !form.lname || !form.email || !form.dob) {
      setError('Please fill out all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Update the student data via PUT request
    try {
      await fetch(`https://wt-assignment-2-gdbb.onrender.com/students/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      setError(''); // Clear any errors on success
      navigate('/'); // Redirect to the homepage after successful update
    } catch (err) {
      setError('Failed to update student. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.formContainer}>
      <h2>Edit Student</h2>
      {error && <div style={styles.errorText}>{error}</div>} {/* Show error if any */}
      {Object.keys(form).map(key => (
        key !== 'isActive' ? (
          <div key={key} style={styles.inputGroup}>
            <label htmlFor={key} style={styles.label}>{key === 'email' ? 'Email' : key}:</label>
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
      <button type="submit" style={styles.button}>Update</button>
    </form>
  );
};

export default EditStudent;
