import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
    <div>
      <h2>Student List</h2>
      <Link to="/add">Add Student</Link>
      <table border="1" cellPadding="8" style={{ marginTop: '20px', width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Department</th>
            <th>Enrolment Year</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              <td>{student.studentId}</td>
              <td>{student.fname}</td>
              <td>{student.lname}</td>
              <td>{student.email}</td>
              <td>{new Date(student.dob).toLocaleDateString()}</td>
              <td>{student.department}</td>
              <td>{student.enrolmentYear}</td>
              <td>{student.isActive ? 'Yes' : 'No'}</td>
              <td>
                <Link to={`/edit/${student._id}`} style={{ marginRight: '10px' }}>Edit</Link>
                <button onClick={() => deleteStudent(student._id)}>Delete</button>
              </td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr>
              <td colSpan="9" align="center">No students found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
