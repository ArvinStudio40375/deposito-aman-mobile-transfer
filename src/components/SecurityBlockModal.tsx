
const SecurityBlockModal = () => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-scale-in">
        <div className="text-center mb-6">
          <div className="inline-block p-4 bg-red-100 rounded-full mb-4">
            <img 
              src="/lovable-uploads/8261b87d-898e-413b-86c4-e62466f8b700.png" 
              alt="BRI Logo" 
              className="w-8 h-8"
            />
          </div>
          <h2 className="text-xl font-bold text-red-600 mb-4">Akses Diblokir Sementara</h2>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <p className="text-gray-800 text-sm leading-relaxed text-center">
            Anda Telah Mencoba Mengakses Halaman BRI Deposit Lebih dari 3x Tanpa melakukan Transaksi Apapun. Maka Untuk Sementara kami Memblokir Akses Ke Halaman akun anda Demi Keamanan Dengan Dana Anda Yang Anda Miliki.
          </p>
        </div>

        <div className="text-center">
          <p className="text-gray-600 text-sm font-medium">Terimakasih</p>
        </div>
      </div>
    </div>
  );
};

export default SecurityBlockModal;
