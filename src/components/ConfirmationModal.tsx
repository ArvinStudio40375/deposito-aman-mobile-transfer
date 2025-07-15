
import { useState } from 'react';
import { X, Lock, Eye, EyeOff } from 'lucide-react';

interface ConfirmationModalProps {
  transferData: any;
  onSuccess: () => void;
  onClose: () => void;
}

const ConfirmationModal = ({ transferData, onSuccess, onClose }: ConfirmationModalProps) => {
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (pin === '112233') {
      onSuccess();
    } else {
      setError('PIN Salah, Transaksi Dibatalkan');
      setPin('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-scale-in">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Konfirmasi Transfer</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Transfer Details */}
          <div className="mb-6 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Rekening Tujuan:</span>
              <span className="font-medium">{transferData.noRekening}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Nominal:</span>
              <span className="font-medium text-blue-600">{transferData.nominal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Bank Tujuan:</span>
              <span className="font-medium">{transferData.namaBank}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Nama Penerima:</span>
              <span className="font-medium">{transferData.namaPemilik}</span>
            </div>
          </div>

          {/* PIN Input */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Lock className="inline w-4 h-4 mr-1" />
                Konfirmasi PIN Transaksi
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
              Konfirmasi Transfer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
