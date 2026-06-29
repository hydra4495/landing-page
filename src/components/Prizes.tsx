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
    <section id="prizes" className="py-20 bg-white border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
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
          <p className="mt-4 text-xs sm:text-sm text-slate-500 font-medium">
            <EditableText
              value={content.subtitle}
              onChange={(val) => handleUpdate('subtitle', val)}
              isEditMode={isEditMode}
              as="span"
            />
          </p>
        </div>

        {/* Prizes Layout */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {content.items.map((prize, idx) => {
            const isFirst = prize.isFirst;
            return (
              <div
                key={idx}
                className={`relative rounded-2xl border p-8 text-center flex flex-col items-center justify-between transition-all duration-300 ${
                  isFirst
                    ? 'border-orange-500 bg-orange-50/5 shadow-lg shadow-orange-100/50 md:scale-105 z-10'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                }`}
              >
                {/* Visual Icon Label at the top of card */}
                <div className={`flex h-12 w-12 items-center justify-center rounded-full mb-6 ${
                  isFirst 
                    ? 'bg-orange-100 text-orange-600' 
                    : 'bg-slate-50 text-slate-400'
                }`}>
                  {isFirst ? (
                    <Trophy className="h-6 w-6 stroke-[2.5]" />
                  ) : (
                    <Star className="h-5 w-5 fill-slate-300 text-slate-300" />
                  )}
                </div>

                <div className="space-y-4 w-full">
                  <h3 className="text-lg font-extrabold text-slate-900">
                    <EditableText
                      value={prize.title}
                      onChange={(val) => handleUpdateItem(idx, 'title', val)}
                      isEditMode={isEditMode}
                      as="span"
                    />
                  </h3>
                  
                  {/* Big Prize Amount Tag */}
                  <span className="block text-2xl font-black text-orange-600 tracking-tight font-mono">
                    <EditableText
                      value={prize.amount}
                      onChange={(val) => handleUpdateItem(idx, 'amount', val)}
                      isEditMode={isEditMode}
                      as="span"
                    />
                  </span>

                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
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
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange-600 px-3 py-0.5 text-[9px] font-black uppercase tracking-wider text-white shadow-xs">
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
