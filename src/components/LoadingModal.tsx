
import { Loader2 } from 'lucide-react';

const LoadingModal = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center animate-scale-in">
        <div className="mb-6">
          <Loader2 className="w-16 h-16 mx-auto text-blue-600 animate-spin" />
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-4">Tunggu Sebentar...</h3>
        
        <p className="text-gray-600 text-sm leading-relaxed">
          Kami sedang memeriksa ketersediaan Transfer. Mohon jangan ditutup dan tetap di sini.
        </p>
        
        <div className="mt-6">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;
