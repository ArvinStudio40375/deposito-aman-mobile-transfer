
import { AlertTriangle, X } from 'lucide-react';

interface RejectionModalProps {
  onClose: () => void;
}

const RejectionModal = ({ onClose }: RejectionModalProps) => {
  const saldoDeposito = parseInt(localStorage.getItem('saldoDeposito') || '0');
  const minimalSaldo = Math.floor(saldoDeposito * 0.015);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-red-600">Transaksi Ditolak</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">Saldo Tabungan Tidak Mencukupi</h3>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <h4 className="font-bold text-red-800 mb-4 text-center">📌 Peraturan Transfer Dana dari Deposito</h4>
            
            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <h5 className="font-semibold text-gray-800 mb-2">1. Tidak Ada Limit Minimal Transfer</h5>
                <p>Pengguna bebas melakukan transfer dari dana deposito ke rekening tabungan tanpa batasan jumlah minimal.</p>
              </div>

              <div>
                <h5 className="font-semibold text-gray-800 mb-2">2. Saldo Tabungan Wajib Tersisa (Mengendap)</h5>
                <p>Setelah proses transfer dilakukan, rekening tabungan wajib menyisakan saldo minimal sebesar <strong>1,5% dari total nilai deposito</strong> sebagai dana mengendap.</p>
              </div>

              <div className="bg-white border border-red-200 rounded-lg p-4">
                <h6 className="font-semibold text-gray-800 mb-2">Contoh:</h6>
                <p>Jika total nilai deposito adalah <strong>{formatCurrency(saldoDeposito)}</strong>, maka:</p>
                <p className="text-red-600 font-semibold mt-1">
                  Saldo tabungan harus tersisa minimal <strong>{formatCurrency(minimalSaldo)}</strong>
                </p>
              </div>

              <div>
                <h5 className="font-semibold text-gray-800 mb-2">3. Tujuan Peraturan</h5>
                <p>Ketentuan ini diberlakukan untuk menjaga kestabilan saldo pengguna serta mendukung keamanan transaksi berkelanjutan.</p>
              </div>

              <div>
                <h5 className="font-semibold text-gray-800 mb-2">4. Sistem Otomatis Cek Saldo</h5>
                <p>Sistem akan otomatis menolak permintaan transfer apabila saldo tabungan yang tersisa setelah transfer kurang dari batas minimum 1,5% tersebut.</p>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectionModal;
