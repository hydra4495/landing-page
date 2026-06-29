import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { LandingPageContent } from '../types';
import EditableText from './EditableText';

interface AboutProps {
  content: LandingPageContent['about'];
  onChange: (updatedAbout: LandingPageContent['about']) => void;
  isEditMode: boolean;
}

export default function About({ content, onChange, isEditMode }: AboutProps) {
  const [showImgInput, setShowImgInput] = useState(false);

  const handleUpdate = (key: keyof LandingPageContent['about'], value: string) => {
    onChange({
      ...content,
      [key]: value
    });
  };

  return (
    <section id="about" className="py-24 sm:py-28 bg-[#FAF9F5]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 items-center">
          
          {/* Left Column: Text */}
          <div className="space-y-8">
            <h2 className="text-3xl font-extrabold tracking-normal text-stone-900 sm:text-4xl lg:text-5xl leading-tight">
              <EditableText
                value={content.title}
                onChange={(val) => handleUpdate('title', val)}
                isEditMode={isEditMode}
                as="span"
              />{' '}
              <span className="text-orange-600 block sm:inline">
                <EditableText
                  value={content.titleHighlight}
                  onChange={(val) => handleUpdate('titleHighlight', val)}
                  isEditMode={isEditMode}
                  as="span"
                />
              </span>
            </h2>
            
            <div className="text-sm sm:text-base md:text-lg text-stone-700 leading-relaxed font-medium whitespace-pre-line space-y-5">
              <EditableText
                value={content.desc}
                onChange={(val) => handleUpdate('desc', val)}
                isEditMode={isEditMode}
                isMultiline={true}
                as="div"
              />
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="relative">
            <div className="absolute -inset-1.5 rounded-2xl bg-linear-to-tr from-orange-500 to-amber-400 opacity-25 blur-xl" />
            
            {isEditMode && (
              <div className="absolute top-4 right-4 z-20">
                <button
                  onClick={() => setShowImgInput(!showImgInput)}
                  className="flex items-center gap-1 bg-slate-900/90 text-white rounded-lg px-2.5 py-1.5 text-[10px] font-bold border border-slate-700 hover:border-orange-500 transition-all cursor-pointer"
                >
                  <ImageIcon className="h-3 w-3 text-orange-400" />
                  <span>Đổi ảnh</span>
                </button>
                {showImgInput && (
                  <div className="absolute right-0 mt-1.5 w-64 bg-slate-900 text-white border border-slate-700 rounded-lg p-3 shadow-2xl z-30">
                    <label className="text-[9px] font-bold text-slate-400 block mb-1">LINK ẢNH MINH HỌA</label>
                    <input
                      type="text"
                      value={content.imageUrl}
                      onChange={(e) => handleUpdate('imageUrl', e.target.value)}
                      placeholder="Dán link ảnh mới..."
                      className="w-full bg-slate-800 text-white rounded px-2.5 py-1 text-xs border border-slate-600 focus:outline-hidden focus:border-orange-500 font-mono"
                    />
                  </div>
                )}
              </div>
            )}

            <div className="relative overflow-hidden rounded-2xl border-2 border-stone-200 bg-stone-100 shadow-2xl">
              <img
                src={content.imageUrl || "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80"}
                alt="Brand Identity Design Materials"
                className="w-full object-cover h-[300px] sm:h-[380px] hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
