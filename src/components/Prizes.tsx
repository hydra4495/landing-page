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
    <section id="prizes" className="py-24 sm:py-28 bg-[#FAF9F5] border-t border-stone-200/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold tracking-normal text-stone-900 sm:text-4xl lg:text-5xl leading-tight">
            <EditableText
              value={content.title}
              onChange={(val) => handleUpdate('title', val)}
              isEditMode={isEditMode}
              as="span"
            />{' '}
            <span className="text-orange-600">
              <EditableText
                value={content.titleHighlight}
                onChange={(val) => handleUpdate('titleHighlight', val)}
                isEditMode={isEditMode}
                as="span"
              />
            </span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm md:text-base text-stone-500 font-semibold tracking-wide">
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
                    ? 'bg-gradient-to-br from-[#1c1613] to-[#0d0a09] border-2 border-amber-400 shadow-[0_20px_50px_rgba(245,158,11,0.25)] md:scale-105 z-10'
                    : 'border border-stone-200/90 bg-white hover:border-orange-400 hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                {/* Visual Icon Label at the top of card */}
                <div className={`flex h-14 w-14 items-center justify-center rounded-full mb-6 ${
                  isFirst 
                    ? 'bg-amber-400/20 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]' 
                    : 'bg-stone-50 text-stone-400 border border-stone-100'
                }`}>
                  {isFirst ? (
                    <Trophy className="h-7 w-7 stroke-[2.5]" />
                  ) : (
                    <Star className="h-6 w-6 fill-amber-400/80 text-amber-500" />
                  )}
                </div>

                <div className="space-y-5 w-full flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className={`text-lg sm:text-xl font-extrabold ${isFirst ? 'text-white' : 'text-stone-900'}`}>
                      <EditableText
                        value={prize.title}
                        onChange={(val) => handleUpdateItem(idx, 'title', val)}
                        isEditMode={isEditMode}
                        as="span"
                      />
                    </h3>
                    
                    {/* Big Prize Amount Tag */}
                    <span className="block text-3xl sm:text-4xl font-extrabold text-orange-500 tracking-tight mt-3 font-sans">
                      <EditableText
                        value={prize.amount}
                        onChange={(val) => handleUpdateItem(idx, 'amount', val)}
                        isEditMode={isEditMode}
                        as="span"
                        className="text-orange-500"
                      />
                    </span>
                  </div>

                  <p className={`text-xs sm:text-sm mt-4 leading-relaxed font-semibold ${isFirst ? 'text-stone-300' : 'text-stone-600'}`}>
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
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-linear-to-r from-amber-500 to-orange-500 px-4 py-1 text-[10px] font-extrabold uppercase tracking-widest text-white shadow-lg shadow-orange-500/20">
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
