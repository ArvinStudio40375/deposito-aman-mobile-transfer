
import { CheckCircle, X } from 'lucide-react';

interface SuccessModalProps {
  transferData: any;
  onClose: () => void;
}

const SuccessModal = ({ transferData, onClose }: SuccessModalProps) => {
  const currentDate = new Date().toLocaleString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const handleClose = () => {
    onClose();
    // Trigger saldo update
    window.dispatchEvent(new CustomEvent('saldoUpdate'));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-scale-in">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-green-600">Transfer Berhasil</h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">Transaksi Berhasil</h3>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <h4 className="font-semibold text-gray-800 mb-3">Detail Transaksi:</h4>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Jumlah Transfer:</span>
              <span className="font-medium text-green-600">{transferData.nominal}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Bank Tujuan:</span>
              <span className="font-medium">{transferData.namaBank}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Rekening Tujuan:</span>
              <span className="font-medium">{transferData.noRekening}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Nama Penerima:</span>
              <span className="font-medium">{transferData.namaPemilik}</span>
            </div>
            
            <div className="flex justify-between border-t pt-3">
              <span className="text-gray-600">Waktu Transaksi:</span>
              <span className="font-medium">{currentDate}</span>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 mt-6"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
