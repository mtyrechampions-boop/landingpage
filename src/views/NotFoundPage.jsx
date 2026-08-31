'use client';

import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="relative">
        <h1 className="text-[120px] md:text-[180px] font-black text-slate-900/5 select-none">404</h1>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight mb-2">Page Not Found</h2>
          <p className="text-slate-500 font-medium max-w-md mx-auto mb-8">
            The page you are looking for might have been moved, deleted, or never existed.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Link 
          href="/" 
          className="flex items-center gap-2 bg-[#FB7E10] text-white px-8 py-4 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-orange-600 transition-all active:scale-95 shadow-xl shadow-orange-500/20"
        >
          <Home size={18} />
          Back to Home
        </Link>
        <button 
          onClick={() => window.history.back()}
          className="flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-900/20"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
