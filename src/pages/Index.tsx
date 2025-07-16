import { useState, useEffect } from 'react';
import SplashScreen from '../components/SplashScreen';
import PinLogin from '../components/PinLogin';
import SecurityBlockModal from '../components/SecurityBlockModal';
import Dashboard from '../components/Dashboard';
import TransferForm from '../components/TransferForm';
import ConfirmationModal from '../components/ConfirmationModal';
import LoadingModal from '../components/LoadingModal';
import SuccessModal from '../components/SuccessModal';
import RejectionModal from '../components/RejectionModal';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [showSecurityBlock, setShowSecurityBlock] = useState(false);
  const [showTransferForm, setShowTransferForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showRejection, setShowRejection] = useState(false);
  const [transferData, setTransferData] = useState(null);

  // Initialize localStorage with default values
  useEffect(() => {
    if (!localStorage.getItem('saldoDeposito')) {
      localStorage.setItem('saldoDeposito', '200350000');
    }
    if (!localStorage.getItem('saldoTabungan')) {
      localStorage.setItem('saldoTabungan', '0');
    }
  }, []);

  const handleSplashComplete = () => {
    console.log('Splash completed, moving to PIN screen');
    setCurrentScreen('pin');
  };

  const handlePinSuccess = () => {
    console.log('PIN success, moving to dashboard');
    setCurrentScreen('dashboard');
  };

  const handleTransferClick = () => {
    setShowTransferForm(true);
  };

  const handleTransferSubmit = (data) => {
    setTransferData(data);
    setShowTransferForm(false);
    setShowConfirmation(true);
  };

  const handleConfirmationSuccess = () => {
    setShowConfirmation(false);
    setShowLoading(true);
    
    // Loading for 1 minute (60 seconds)
    setTimeout(() => {
      setShowLoading(false);
      
      // Check if tabungan balance is sufficient (1.5% of deposito)
      const saldoDeposito = parseInt(localStorage.getItem('saldoDeposito') || '0');
      const saldoTabungan = parseInt(localStorage.getItem('saldoTabungan') || '0');
      const minimalSaldo = Math.floor(saldoDeposito * 0.015);
      
      if (saldoTabungan >= minimalSaldo) {
        // Process transfer
        const newSaldoDeposito = saldoDeposito - parseInt(transferData.nominal.replace(/\D/g, ''));
        localStorage.setItem('saldoDeposito', newSaldoDeposito.toString());
        
        // Save transfer history
        const history = JSON.parse(localStorage.getItem('transferHistory') || '[]');
        history.push({
          ...transferData,
          timestamp: new Date().toISOString(),
          status: 'success'
        });
        localStorage.setItem('transferHistory', JSON.stringify(history));
        
        setShowSuccess(true);
      } else {
        setShowRejection(true);
      }
    }, 60000); // 1 minute
  };

  const handleModalClose = () => {
    setShowTransferForm(false);
    setShowConfirmation(false);
    setShowLoading(false);
    setShowSuccess(false);
    setShowRejection(false);
    setTransferData(null);
  };

  console.log('Current screen:', currentScreen, 'Show security block:', showSecurityBlock);

  if (currentScreen === 'splash') {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (currentScreen === 'pin') {
    return <PinLogin onSuccess={handlePinSuccess} />;
  }

  if (currentScreen === 'blocked' || showSecurityBlock) {
    return <SecurityBlockModal />;
  }

  return (
    <>
      <Dashboard onTransferClick={handleTransferClick} />
      
      {showTransferForm && (
        <TransferForm
          onSubmit={handleTransferSubmit}
          onClose={handleModalClose}
        />
      )}
      
      {showConfirmation && transferData && (
        <ConfirmationModal
          transferData={transferData}
          onSuccess={handleConfirmationSuccess}
          onClose={handleModalClose}
        />
      )}
      
      {showLoading && <LoadingModal />}
      
      {showSuccess && transferData && (
        <SuccessModal
          transferData={transferData}
          onClose={handleModalClose}
        />
      )}
      
      {showRejection && (
        <RejectionModal onClose={handleModalClose} />
      )}
    </>
  );
};

export default Index;
