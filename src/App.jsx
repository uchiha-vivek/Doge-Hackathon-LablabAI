import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
 
import FormPage from './Page/FormPage';
import CitizenFeedback from './Page/FeedbackPage';
import LoginPage from './Page/LoginPage';
import PrivateRoute from './components/privateRoute-component'; // Import PrivateRoute
import LandingPage from './Page/LandingPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        {/* Protect these routes */}
        <Route path="/form" element={<PrivateRoute element={<FormPage />} />} />
        <Route path="/feedback" element={<PrivateRoute element={<CitizenFeedback />} />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
