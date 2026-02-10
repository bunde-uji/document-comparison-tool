"use client";

import Link from "next/link";

function Navbar() {
    return (  
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link 
              href="/"
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-slate-900 rounded-lg transform group-hover:rotate-12 transition-transform duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">J</div>
              </div>
              <span className="text-2xl font-extrabold text-slate-900 tracking-tight serif">Juxta<span className="text-indigo-600">Doc</span></span>
            </Link>
            
            <div className="hidden md:flex items-center gap-10">
              <Link 
                href="/compare"
                className="group relative inline-flex items-center justify-center px-6 py-3 font-bold text-white transition-all duration-200 bg-slate-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-slate-800"
              >
                Launch Tool
                <i className="fas fa-arrow-right ml-2 text-xs opacity-50 group-hover:translate-x-1 transition-transform"></i>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
}

export default Navbar;