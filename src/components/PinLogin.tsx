
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PinLoginProps {
  onSuccess: () => void;
}

const PinLogin = ({ onSuccess }: PinLoginProps) => {
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (pin === '112233') {
      onSuccess();
    } else {
      setError('PIN Salah! Akses Ditolak');
      setPin('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
            <img 
              src="/lovable-uploads/8261b87d-898e-413b-86c4-e62466f8b700.png" 
              alt="BRI Logo" 
              className="w-8 h-8"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">PIN Transaksi</h2>
          <p className="text-gray-600">Masukkan PIN untuk melanjutkan</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Masukkan PIN Transaksi
            </label>
            <div className="relative">
              <input
                type={showPin ? "text" : "password"}
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError('');
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-xl tracking-widest"
                placeholder="••••••"
                maxLength={6}
                required
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 animate-fade-in">
              <p className="text-red-600 text-sm text-center font-medium">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
};

export default PinLogin;
