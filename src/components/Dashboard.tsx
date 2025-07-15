
import { useState, useEffect } from 'react';
import { ArrowRight, User, CreditCard, Bell, Settings } from 'lucide-react';

interface DashboardProps {
  onTransferClick: () => void;
}

const Dashboard = ({ onTransferClick }: DashboardProps) => {
  const [saldoDeposito, setSaldoDeposito] = useState(0);
  const [saldoTabungan, setSaldoTabungan] = useState(0);

  useEffect(() => {
    const updateSaldo = () => {
      setSaldoDeposito(parseInt(localStorage.getItem('saldoDeposito') || '0'));
      setSaldoTabungan(parseInt(localStorage.getItem('saldoTabungan') || '0'));
    };

    updateSaldo();
    
    // Listen for storage changes
    window.addEventListener('storage', updateSaldo);
    
    // Custom event for internal updates
    window.addEventListener('saldoUpdate', updateSaldo);
    
    return () => {
      window.removeEventListener('storage', updateSaldo);
      window.removeEventListener('saldoUpdate', updateSaldo);
    };
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      {/* Header */}
      <div className="relative px-6 pt-12 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-lg">
              <img 
                src="/lovable-uploads/8261b87d-898e-413b-86c4-e62466f8b700.png" 
                alt="BRI Logo" 
                className="w-6 h-6"
              />
            </div>
            <div>
              <p className="text-white text-sm opacity-80">Selamat datang,</p>
              <p className="text-white font-semibold">SITI AMINAH</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Bell className="w-6 h-6 text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full"></div>
            </div>
            <Settings className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Balance Cards */}
        <div className="space-y-4">
          {/* Deposito Balance */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-blue-100 text-sm">Saldo Deposito Utama</p>
                <p className="text-3xl font-bold">{formatCurrency(saldoDeposito)}</p>
              </div>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <CreditCard className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-blue-100 text-sm">Semua Depositomu</span>
              <ArrowRight className="w-4 h-4 text-blue-100" />
            </div>
          </div>

          {/* Tabungan Balance */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-green-100 text-sm">Saldo Tabungan</p>
                <p className="text-3xl font-bold">{formatCurrency(saldoTabungan)}</p>
              </div>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <CreditCard className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-green-100 text-sm">Saldo Mengendap</span>
              <ArrowRight className="w-4 h-4 text-green-100" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 py-4">
        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Layanan Utama</h3>
          
          <button
            onClick={onTransferClick}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            TRANSFER DEPOSITO
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="w-12 h-12 bg-cyan-500 rounded-xl mx-auto mb-3 flex items-center justify-center">
              <span className="text-white font-bold">Rp</span>
            </div>
            <p className="text-white text-sm font-medium">Transfer</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="w-12 h-12 bg-teal-500 rounded-xl mx-auto mb-3 flex items-center justify-center">
              <span className="text-white font-bold">BR</span>
            </div>
            <p className="text-white text-sm font-medium">BRIVA</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="w-12 h-12 bg-green-500 rounded-xl mx-auto mb-3 flex items-center justify-center">
              <span className="text-white text-bold">+</span>
            </div>
            <p className="text-white text-sm font-medium">Top Up</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="w-12 h-12 bg-pink-500 rounded-xl mx-auto mb-3 flex items-center justify-center">
              <span className="text-white text-bold">💳</span>
            </div>
            <p className="text-white text-sm font-medium">Lifestyle</p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="px-6 py-8">
        <div className="text-center">
          <p className="text-blue-300 font-medium mb-2">Lainnya</p>
          <div className="w-8 h-1 bg-blue-400 rounded-full mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
