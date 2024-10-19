import React from 'react';
import Registration from './componenets/registration';
import Login from './componenets/login';
import Main from './componenets/Main';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
    <Router>      
<Routes>
  <Route path="/" element={<Registration />} />
  <Route path="/login" element={<Login />} />
  <Route path="/p" element={<Main />} />
</Routes>
</Router>
    </>
  );
}

export default App;
