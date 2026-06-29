import { useState, useEffect } from 'react';
import { ArrowRight, Image as ImageIcon } from 'lucide-react';
import { LandingPageContent } from '../types';
import EditableText from './EditableText';

interface HeroProps {
  content: LandingPageContent['hero'];
  onChange: (updatedHero: LandingPageContent['hero']) => void;
  isEditMode: boolean;
  onRegisterClick: () => void;
}

export default function Hero({ content, onChange, isEditMode, onRegisterClick }: HeroProps) {
  // Dynamic countdown timer - target set to 15 days from now to keep the preview beautiful
  const [timeLeft, setTimeLeft] = useState({
    days: '02',
    hours: '14',
    minutes: '45',
    seconds: '10'
  });
  const [showBgInput, setShowBgInput] = useState(false);

  useEffect(() => {
    // Target date set to 17h00 - 06/07/2026 local time
    const targetDate = new Date('2026-07-06T17:00:00');

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: d.toString().padStart(2, '0'),
        hours: h.toString().padStart(2, '0'),
        minutes: m.toString().padStart(2, '0'),
        seconds: s.toString().padStart(2, '0')
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleUpdate = (key: keyof LandingPageContent['hero'], value: string) => {
    onChange({
      ...content,
      [key]: value
    });
  };

  return (
    <section 
      id="hero" 
      className="relative flex min-h-[640px] sm:min-h-[720px] md:min-h-[800px] flex-col justify-center items-center py-24 px-4 text-center overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 163, 255, 0.15), rgba(15, 23, 42, 0.45)), url('${content.imageUrl || "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1920&q=80"}')`
      }}
    >
      {/* Dynamic Background Image URL Editor for visual site building */}
      {isEditMode && (
        <div className="absolute top-16 right-4 z-30 flex flex-col items-end">
          <button
            onClick={() => setShowBgInput(!showBgInput)}
            className="flex items-center gap-1.5 rounded-lg bg-slate-900/95 text-white border border-slate-700 hover:border-orange-500 px-3 py-1.5 text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <ImageIcon className="h-3.5 w-3.5 text-orange-400" />
            <span>Đổi ảnh nền Hero</span>
          </button>
          
          {showBgInput && (
            <div className="mt-2 w-72 bg-slate-900 border border-slate-700 rounded-xl p-3 shadow-2xl z-40 text-left">
              <label className="text-[10px] font-bold text-slate-400 block mb-1">ĐƯỜNG DẪN ẢNH (URL)</label>
              <input
                type="text"
                value={content.imageUrl}
                onChange={(e) => handleUpdate('imageUrl', e.target.value)}
                placeholder="Dán link ảnh Unsplash..."
                className="w-full bg-slate-800 text-white rounded px-2.5 py-1.5 text-xs border border-slate-600 focus:outline-hidden focus:border-orange-500 font-mono"
              />
              <span className="text-[9px] text-slate-500 block mt-1.5">Mẹo: Sử dụng ảnh chất lượng cao từ Unsplash</span>
            </div>
          )}
        </div>
      )}

      {/* Accent golden/orange orb light background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-96 w-96 rounded-full bg-[#00A3FF]/10 blur-3xl" />

      {/* Fully transparent background container so buildings shine through */}
      <div className="mx-auto max-w-4xl z-10 flex flex-col items-center bg-transparent border-0 shadow-none backdrop-blur-none px-6 py-4">
        {/* National/Global Contest Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#00A3FF]/55 bg-slate-950/60 px-5 py-2 text-xs font-extrabold uppercase tracking-widest text-[#00A3FF] mb-6 shadow-md">
          <EditableText
            value={content.badge}
            onChange={(val) => handleUpdate('badge', val)}
            isEditMode={isEditMode}
            className="text-xs font-bold tracking-widest uppercase text-[#00A3FF]"
          />
          <ArrowRight className="h-3.5 w-3.5 stroke-[3.5] text-[#00A3FF]" />
        </div>

        {/* Big Bold Title with high drop shadow for amazing readability over images */}
        <h1 className="text-3xl font-extrabold tracking-wide text-white sm:text-4xl md:text-5xl lg:text-6xl font-sans leading-tight w-full max-w-3xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
          <EditableText
            value={content.title}
            onChange={(val) => handleUpdate('title', val)}
            isEditMode={isEditMode}
            as="span"
            className="block w-full text-center text-white font-extrabold"
          />
          <span className="block mt-4 relative inline-block text-amber-400 pb-2">
            <EditableText
              value={content.titleHighlight}
              onChange={(val) => handleUpdate('titleHighlight', val)}
              isEditMode={isEditMode}
              as="span"
              className="text-amber-400 font-extrabold"
            />
            {/* Custom golden underline bar like in standard designs */}
            <span className="absolute bottom-0 left-0 h-1 w-full bg-linear-to-r from-amber-400 to-[#00A3FF] rounded-full" />
          </span>
        </h1>

        {/* Description Subtitle */}
        <p className="mx-auto mt-8 max-w-2xl text-base sm:text-lg text-white font-semibold leading-relaxed font-sans drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
          <EditableText
            value={content.desc}
            onChange={(val) => handleUpdate('desc', val)}
            isEditMode={isEditMode}
            isMultiline={true}
            as="span"
            className="text-white font-semibold"
          />
        </p>

        {/* Countdown Area */}
        <div className="mt-8 sm:mt-12 flex flex-col items-center w-full">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-widest mb-5 bg-slate-950/75 px-5 py-2 rounded-full border border-[#00A3FF]/30 shadow-md">
            Hạn cuối đăng ký: 17h00 ngày 06/07/2026
          </span>

          <div className="flex gap-4 sm:gap-5">
            {/* Days */}
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-slate-950/85 border border-[#00A3FF]/40 shadow-md">
                <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{timeLeft.days}</span>
              </div>
              <span className="mt-2.5 text-[10px] font-extrabold text-white uppercase tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">Ngày</span>
            </div>

            {/* Hours */}
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-slate-950/85 border border-[#00A3FF]/40 shadow-md">
                <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{timeLeft.hours}</span>
              </div>
              <span className="mt-2.5 text-[10px] font-extrabold text-white uppercase tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">Giờ</span>
            </div>

            {/* Minutes */}
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-slate-950/85 border border-[#00A3FF]/40 shadow-md">
                <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{timeLeft.minutes}</span>
              </div>
              <span className="mt-2.5 text-[10px] font-extrabold text-white uppercase tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">Phút</span>
            </div>

            {/* Seconds */}
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-slate-950/85 border border-amber-500/35 shadow-lg shadow-amber-500/5">
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 tracking-tight">{timeLeft.seconds}</span>
              </div>
              <span className="mt-2.5 text-[10px] font-extrabold text-white uppercase tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">Giây</span>
            </div>
          </div>
        </div>

        {/* Call to action button to stimulate response */}
        <button
          onClick={onRegisterClick}
          className="mt-10 px-8 py-4 sm:px-10 rounded-full bg-linear-to-r from-[#00A3FF] to-[#00E5FF] text-white font-extrabold text-base shadow-lg shadow-[#00A3FF]/40 hover:shadow-[#00A3FF]/60 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer uppercase tracking-wider flex items-center gap-2.5 group"
        >
          Đăng Ký Tham Gia Ngay
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1.5 transition-transform stroke-[2.5]" />
        </button>

      </div>
    </section>
  );
}
