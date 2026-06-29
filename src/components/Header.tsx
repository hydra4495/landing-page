import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onRegisterClick: () => void;
}

export default function Header({ onRegisterClick }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="flex cursor-pointer flex-col"
          >
            <span className="text-xl font-black tracking-wider text-slate-900 font-sans">
              CUỘC THI
            </span>
            <span className="text-[9px] font-bold tracking-[0.2em] text-orange-600 uppercase">
              Sáng Tác Brand Identity
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            <button
              onClick={() => scrollToSection('about')}
              className="text-sm font-semibold text-slate-700 hover:text-orange-600 transition-colors"
            >
              Giới thiệu
            </button>
            <button
              onClick={() => scrollToSection('rules')}
              className="text-sm font-semibold text-slate-700 hover:text-orange-600 transition-colors"
            >
              Quy định
            </button>
            <button
              onClick={() => scrollToSection('prizes')}
              className="text-sm font-semibold text-slate-700 hover:text-orange-600 transition-colors"
            >
              Giải thưởng
            </button>
            <button
              onClick={() => scrollToSection('criteria')}
              className="text-sm font-semibold text-slate-700 hover:text-orange-600 transition-colors"
            >
              Tiêu chí
            </button>
          </nav>



          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-50 md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-b border-slate-100 bg-white px-6 py-6 md:hidden">
          <div className="flex flex-col gap-5">
            <button
              onClick={() => scrollToSection('about')}
              className="text-left text-sm font-bold text-slate-800"
            >
              Giới thiệu
            </button>
            <button
              onClick={() => scrollToSection('rules')}
              className="text-left text-sm font-bold text-slate-800"
            >
              Quy định
            </button>
            <button
              onClick={() => scrollToSection('prizes')}
              className="text-left text-sm font-bold text-slate-800"
            >
              Giải thưởng
            </button>
            <button
              onClick={() => scrollToSection('criteria')}
              className="text-left text-sm font-bold text-slate-800"
            >
              Tiêu chí
            </button>

          </div>
        </div>
      )}
    </header>
  );
}
