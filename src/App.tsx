import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import HowItWorks from './components/HowItWorks';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import ServiceSelectionModal from './components/ServiceSelectionModal';
import DriverSignupForm from './components/DriverSignupForm';
import DeliverySignupForm from './components/DeliverySignupForm';
import EntrepreneurSignupForm from './components/EntrepreneurSignupForm';

function App() {
  const [isServiceSelectionOpen, setIsServiceSelectionOpen] = useState(false);
  const [isSignupFormOpen, setIsSignupFormOpen] = useState(false);
  const [isDeliveryFormOpen, setIsDeliveryFormOpen] = useState(false);
  const [isEntrepreneurFormOpen, setIsEntrepreneurFormOpen] = useState(false);

  const handleGetStartedClick = () => {
    setIsServiceSelectionOpen(true);
  };

  const handleCloseServiceSelection = () => {
    setIsServiceSelectionOpen(false);
  };

  const handleSignUpClick = () => {
    setIsSignupFormOpen(true);
  };

  const handleCloseSignupForm = () => {
    setIsSignupFormOpen(false);
  };

  const handleDeliveryClick = () => {
    setIsDeliveryFormOpen(true);
  };

  const handleCloseDeliveryForm = () => {
    setIsDeliveryFormOpen(false);
  };

  const handleEntrepreneurClick = () => {
    setIsEntrepreneurFormOpen(true);
  };

  const handleCloseEntrepreneurForm = () => {
    setIsEntrepreneurFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        onSignUpClick={handleSignUpClick}
        onDeliveryClick={handleDeliveryClick}
        onEntrepreneurClick={handleEntrepreneurClick}
      />
      <Hero onGetStartedClick={handleGetStartedClick} />
      <Benefits />
      <HowItWorks />
      <FAQ />
      <CTA onSignUpClick={handleSignUpClick} />
      <Footer />
      <ServiceSelectionModal
        isOpen={isServiceSelectionOpen}
        onClose={handleCloseServiceSelection}
        onDriverClick={handleSignUpClick}
        onDeliveryClick={handleDeliveryClick}
        onEntrepreneurClick={handleEntrepreneurClick}
      />
      <DriverSignupForm isOpen={isSignupFormOpen} onClose={handleCloseSignupForm} />
      <DeliverySignupForm isOpen={isDeliveryFormOpen} onClose={handleCloseDeliveryForm} />
      <EntrepreneurSignupForm isOpen={isEntrepreneurFormOpen} onClose={handleCloseEntrepreneurForm} />
    </div>
  );
}

export default App;