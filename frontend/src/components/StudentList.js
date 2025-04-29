import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const styles = {
  container: {
    maxWidth: '95%',
    margin: '40px auto',
    fontFamily: 'Arial, sans-serif'
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  addButton: {
    display: 'inline-block',
    marginBottom: '15px',
    padding: '10px 15px',
    backgroundColor: '#28a745',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '4px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  th: {
    backgroundColor: '#f4f4f4',
    padding: '10px',
    textAlign: 'left',
    borderBottom: '2px solid #ddd'
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #ddd'
  },
  actionLink: {
    marginRight: '10px',
    color: '#007bff',
    textDecoration: 'none'
  },
  deleteButton: {
    padding: '6px 10px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer'
  }
};

const StudentList = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const res = await fetch('https://wt-assignment-2-gdbb.onrender.com/students');
    const data = await res.json();
    setStudents(data);
  };

  const deleteStudent = async (id) => {
    await fetch(`https://wt-assignment-2-gdbb.onrender.com/students/${id}`, { method: 'DELETE' });
    fetchStudents();
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Student List</h2>
      <Link to="/add" style={styles.addButton}>+ Add Student</Link>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Student ID</th>
            <th style={styles.th}>First Name</th>
            <th style={styles.th}>Last Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>DOB</th>
            <th style={styles.th}>Department</th>
            <th style={styles.th}>Enrolment Year</th>
            <th style={styles.th}>Active</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              <td style={styles.td}>{student.studentId}</td>
              <td style={styles.td}>{student.fname}</td>
              <td style={styles.td}>{student.lname}</td>
              <td style={styles.td}>{student.email}</td>
              <td style={styles.td}>{new Date(student.dob).toLocaleDateString()}</td>
              <td style={styles.td}>{student.department}</td>
              <td style={styles.td}>{student.enrolmentYear}</td>
              <td style={styles.td}>{student.isActive ? 'Yes' : 'No'}</td>
              <td style={styles.td}>
                <Link to={`/edit/${student._id}`} style={styles.actionLink}>Edit</Link>
                <button onClick={() => deleteStudent(student._id)} style={styles.deleteButton}>Delete</button>
              </td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr>
              <td colSpan="9" style={{ textAlign: 'center', padding: '20px' }}>No students found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
  
};

export default StudentList;
