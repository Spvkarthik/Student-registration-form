import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch('https://wt-assignment-2-gdbb.onrender.com/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Student</h2>
      {Object.keys(form).map(key => (
        key !== 'isActive' ? (
          <div key={key}>
            <label>{key}:</label>
            <input type={key === 'dob' ? 'date' : 'text'} name={key} value={form[key]} onChange={handleChange} />
          </div>
        ) : (
          <div key={key}>
            <label>Active:</label>
            <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} />
          </div>
        )
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddStudent;
