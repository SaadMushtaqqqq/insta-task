import React from 'react';
import LeftHeroSection from './components/LeftHeroSection/LeftHeroSection';
import LoginForm from './components/LoginForm/LoginForm';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <div className="appContainer">
      <div className="mainSection">
        <LeftHeroSection />
        <LoginForm />
      </div>
      <Footer />
    </div>
  );
}

export default App;