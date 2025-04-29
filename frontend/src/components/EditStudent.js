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
  }
};

const EditStudent = () => {
  const { id } = useParams();
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
  

  useEffect(() => {
    fetch(`https://wt-assignment-2-gdbb.onrender.com/students/${id}`)
      .then(res => res.json())
      .then(data => setForm(data));
  }, [id]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch(`https://wt-assignment-2-gdbb.onrender.com/students/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} style={styles.formContainer}>
      <h2>Edit Student</h2>
      {Object.keys(form).map(key => (
        key !== 'isActive' ? (
          <div key={key} style={styles.inputGroup}>
            <label htmlFor={key} style={styles.label}>{key}:</label>
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
}  

export default EditStudent;
