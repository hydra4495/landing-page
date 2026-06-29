import { Star, Trophy } from 'lucide-react';
import { LandingPageContent } from '../types';
import EditableText from './EditableText';

interface PrizesProps {
  content: LandingPageContent['prizes'];
  onChange: (updatedPrizes: LandingPageContent['prizes']) => void;
  isEditMode: boolean;
}

export default function Prizes({ content, onChange, isEditMode }: PrizesProps) {
  const handleUpdate = (key: keyof Omit<LandingPageContent['prizes'], 'items'>, value: string) => {
    onChange({
      ...content,
      [key]: value
    });
  };

  const handleUpdateItem = (index: number, field: 'title' | 'amount' | 'desc', value: string) => {
    const updatedItems = [...content.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    };
    onChange({
      ...content,
      items: updatedItems
    });
  };

  return (
    <section id="prizes" className="py-24 sm:py-28 bg-slate-50/80 border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
         {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold tracking-normal text-slate-900 sm:text-4xl lg:text-5xl leading-tight">
            <EditableText
              value={content.title}
              onChange={(val) => handleUpdate('title', val)}
              isEditMode={isEditMode}
              as="span"
            />{' '}
            <span className="text-[#00A3FF]">
              <EditableText
                value={content.titleHighlight}
                onChange={(val) => handleUpdate('titleHighlight', val)}
                isEditMode={isEditMode}
                as="span"
              />
            </span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm md:text-base text-slate-500 font-semibold tracking-wide">
            <EditableText
              value={content.subtitle}
              onChange={(val) => handleUpdate('subtitle', val)}
              isEditMode={isEditMode}
              as="span"
            />
          </p>
        </div>

        {/* Prizes Layout */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 max-w-5xl mx-auto items-stretch">
          {content.items.map((prize, idx) => {
            const isFirst = prize.isFirst;
            return (
              <div
                key={idx}
                className={`relative rounded-2xl p-8 text-center flex flex-col items-center justify-between transition-all duration-300 ${
                  isFirst
                    ? 'bg-linear-to-br from-[#00A3FF] via-[#00B4D8] to-[#0077B6] border-2 border-cyan-200 shadow-[0_20px_50px_rgba(0,163,255,0.35)] md:scale-105 z-10 text-white'
                    : 'border border-slate-200/95 bg-white hover:border-[#00A3FF] hover:shadow-[0_20px_40px_rgba(0,163,255,0.08)] hover:-translate-y-1'
                }`}
              >
                {/* Visual Icon Label at the top of card */}
                <div className={`flex h-14 w-14 items-center justify-center rounded-full mb-6 ${
                  isFirst 
                    ? 'bg-white/20 text-white shadow-[0_0_20px_rgba(255,255,255,0.35)]' 
                    : 'bg-[#00A3FF]/10 text-[#00A3FF] border border-[#00A3FF]/15'
                }`}>
                  {isFirst ? (
                    <Trophy className="h-7 w-7 stroke-[2.5]" />
                  ) : (
                    <Star className="h-6 w-6 fill-[#00A3FF]/20 text-[#00A3FF]" />
                  )}
                </div>

                <div className="space-y-5 w-full flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className={`text-lg sm:text-xl font-extrabold ${isFirst ? 'text-white' : 'text-slate-900'}`}>
                      <EditableText
                        value={prize.title}
                        onChange={(val) => handleUpdateItem(idx, 'title', val)}
                        isEditMode={isEditMode}
                        as="span"
                      />
                    </h3>
                    
                    {/* Big Prize Amount Tag */}
                    <span className={`block text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 font-sans ${isFirst ? 'text-yellow-300' : 'text-[#00A3FF]'}`}>
                      <EditableText
                        value={prize.amount}
                        onChange={(val) => handleUpdateItem(idx, 'amount', val)}
                        isEditMode={isEditMode}
                        as="span"
                        className={isFirst ? 'text-yellow-300' : 'text-[#00A3FF]'}
                      />
                    </span>
                  </div>

                  <p className={`text-xs sm:text-sm mt-4 leading-relaxed ${isFirst ? 'text-white/90 font-medium' : 'text-slate-600 font-semibold'}`}>
                    <EditableText
                      value={prize.desc}
                      onChange={(val) => handleUpdateItem(idx, 'desc', val)}
                      isEditMode={isEditMode}
                      isMultiline={true}
                      as="span"
                    />
                  </p>
                </div>

                {isFirst && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-linear-to-r from-yellow-400 via-amber-400 to-orange-400 px-4 py-1 text-[10px] font-extrabold uppercase tracking-widest text-slate-950 shadow-lg shadow-amber-400/20">
                    Đặc Biệt
                  </span>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
