
import { useEffect } from 'react';
import { Building2 } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center overflow-hidden">
      {/* Animated background stars */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-20 w-1 h-1 bg-white rounded-full animate-pulse delay-2000"></div>
        <div className="absolute top-60 left-1/2 w-1 h-1 bg-white rounded-full animate-pulse delay-500"></div>
      </div>
      
      <div className="text-center z-10">
        {/* Logo Animation */}
        <div className="mb-8 animate-fade-in">
          <div className="inline-block p-6 bg-white/10 rounded-full backdrop-blur-sm animate-scale-in">
            <Building2 className="w-20 h-20 text-white animate-bounce" />
          </div>
        </div>
        
        {/* Text Animation */}
        <div className="space-y-4 animate-fade-in delay-1000">
          <h1 className="text-4xl md:text-5xl font-bold text-white animate-scale-in delay-1500">
            BRI Deposit
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-200 animate-scale-in delay-2000">
            Mobile
          </h2>
        </div>
        
        {/* Loading indicator */}
        <div className="mt-12 animate-fade-in delay-3000">
          <div className="w-16 h-1 bg-white/30 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
