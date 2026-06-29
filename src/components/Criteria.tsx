import { useState } from 'react';
import { Check, Image as ImageIcon } from 'lucide-react';
import { LandingPageContent } from '../types';
import EditableText from './EditableText';

interface CriteriaProps {
  content: LandingPageContent['criteria'];
  onChange: (updatedCriteria: LandingPageContent['criteria']) => void;
  isEditMode: boolean;
}

export default function Criteria({ content, onChange, isEditMode }: CriteriaProps) {
  const [showImgInput, setShowImgInput] = useState(false);

  const handleUpdate = (key: keyof Omit<LandingPageContent['criteria'], 'items'>, value: string) => {
    onChange({
      ...content,
      [key]: value
    });
  };

  const handleUpdateItem = (index: number, field: 'title' | 'desc', value: string) => {
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
    <section id="criteria" className="py-24 sm:py-28 bg-gradient-to-b from-slate-50 via-white to-[#F0F8FF] text-slate-900 overflow-hidden relative border-t border-slate-100">
      {/* Decorative high-tech grid/shapes in background */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#00a3ff_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center relative z-10">
        
        <div className="space-y-4 max-w-3xl mx-auto mb-14">
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

          <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed font-semibold">
            <EditableText
              value={content.desc}
              onChange={(val) => handleUpdate('desc', val)}
              isEditMode={isEditMode}
              isMultiline={true}
              as="span"
            />
          </p>
        </div>

        {/* Centered list box container with criteria details - Light Glassmorphic Card */}
        <div className="mx-auto max-w-2xl text-left rounded-2xl bg-white/80 border border-slate-200/60 p-6 sm:p-8 space-y-6 shadow-[0_25px_60px_rgba(0,163,255,0.06)] backdrop-blur-md">
          {content.items.map((criterion, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              {/* Highlighted check icon */}
              <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#00A3FF]/15 text-[#00A3FF] border border-[#00A3FF]/10 shadow-xs">
                <Check className="h-4 w-4 stroke-[3]" />
              </div>
              <div className="space-y-2 w-full">
                <span className="text-sm sm:text-base font-extrabold text-slate-900 block">
                  <EditableText
                    value={criterion.title}
                    onChange={(val) => handleUpdateItem(idx, 'title', val)}
                    isEditMode={isEditMode}
                    as="span"
                  />
                </span>
                <span className="text-xs sm:text-sm text-slate-600 leading-relaxed block font-semibold">
                  <EditableText
                    value={criterion.desc}
                    onChange={(val) => handleUpdateItem(idx, 'desc', val)}
                    isEditMode={isEditMode}
                    isMultiline={true}
                    as="span"
                  />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
