import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';
import StudentList from './components/StudentList';

const App = () => (
  <Router>
    <h1>Student Management System</h1>
    <Routes>
      <Route path="/" element={<StudentList />} />
      <Route path="/add" element={<AddStudent />} />
      <Route path="/edit/:id" element={<EditStudent />} />
    </Routes>
  </Router>
);

export default App;
