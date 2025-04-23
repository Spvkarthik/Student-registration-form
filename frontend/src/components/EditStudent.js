import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
    fetch(`http://localhost:5000/students/${id}`)
      .then(res => res.json())
      .then(data => setForm(data));
  }, [id]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch(`http://localhost:5000/students/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Student</h2>
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
      <button type="submit">Update</button>
    </form>
  );
};

export default EditStudent;
