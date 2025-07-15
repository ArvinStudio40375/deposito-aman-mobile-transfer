
import { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

interface TransferFormProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
}

const TransferForm = ({ onSubmit, onClose }: TransferFormProps) => {
  const [formData, setFormData] = useState({
    noRekening: '',
    nominal: '',
    namaBank: '',
    namaPemilik: ''
  });

  const [showBankDropdown, setShowBankDropdown] = useState(false);

  const bankList = [
    'Bank Rakyat Indonesia (BRI)',
    'Bank Central Asia (BCA)',
    'Bank Negara Indonesia (BNI)',
    'Bank Mandiri',
    'Bank CIMB Niaga',
    'Bank Danamon',
    'Bank Permata',
    'Bank OCBC NISP',
    'Bank Maybank',
    'Bank BTN',
    'Bank Mega',
    'Bank Bukopin',
    'Bank Panin',
    'Bank BTPN',
    'Bank Sinarmas'
  ];

  const handleNominalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    const formatted = value ? `Rp ${parseInt(value).toLocaleString('id-ID')},00,-` : '';
    setFormData({ ...formData, nominal: formatted });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.noRekening && formData.nominal && formData.namaBank && formData.namaPemilik) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="sticky top-0 bg-white p-6 border-b rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Transfer Deposito</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nomor Rekening Tujuan
            </label>
            <input
              type="number"
              value={formData.noRekening}
              onChange={(e) => setFormData({ ...formData, noRekening: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Masukkan nomor rekening"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nominal Penarikan
            </label>
            <input
              type="text"
              value={formData.nominal}
              onChange={handleNominalChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Rp 0,00,-"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Bank
            </label>
            <button
              type="button"
              onClick={() => setShowBankDropdown(!showBankDropdown)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left flex items-center justify-between"
            >
              <span className={formData.namaBank ? 'text-gray-900' : 'text-gray-500'}>
                {formData.namaBank || 'Pilih bank tujuan'}
              </span>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </button>

            {showBankDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                {bankList.map((bank) => (
                  <button
                    key={bank}
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, namaBank: bank });
                      setShowBankDropdown(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  >
                    {bank}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Pemilik Rekening
            </label>
            <input
              type="text"
              value={formData.namaPemilik}
              onChange={(e) => setFormData({ ...formData, namaPemilik: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Masukkan nama pemilik rekening"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105"
          >
            Lanjutkan
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransferForm;
