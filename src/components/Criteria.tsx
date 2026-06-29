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
    <section id="criteria" className="py-24 sm:py-28 bg-gradient-to-br from-[#1a1411] via-[#221a17] to-[#0c0908] text-white overflow-hidden relative border-t border-stone-800">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
        
        <div className="space-y-4 max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl font-extrabold tracking-normal text-white sm:text-4xl lg:text-5xl leading-tight">
            <EditableText
              value={content.title}
              onChange={(val) => handleUpdate('title', val)}
              isEditMode={isEditMode}
              as="span"
            />{' '}
            <span className="text-amber-400">
              <EditableText
                value={content.titleHighlight}
                onChange={(val) => handleUpdate('titleHighlight', val)}
                isEditMode={isEditMode}
                as="span"
              />
            </span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-amber-100/80 leading-relaxed font-semibold">
            <EditableText
              value={content.desc}
              onChange={(val) => handleUpdate('desc', val)}
              isEditMode={isEditMode}
              isMultiline={true}
              as="span"
            />
          </p>
        </div>

        {/* Centered list box container with criteria details */}
        <div className="mx-auto max-w-2xl text-left rounded-2xl bg-stone-950/65 border border-stone-800/80 p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-md">
          {content.items.map((criterion, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              {/* Highlighted check icon */}
              <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-400/20 text-amber-400 shadow-xs">
                <Check className="h-4 w-4 stroke-[3]" />
              </div>
              <div className="space-y-2 w-full">
                <span className="text-sm sm:text-base font-extrabold text-white block">
                  <EditableText
                    value={criterion.title}
                    onChange={(val) => handleUpdateItem(idx, 'title', val)}
                    isEditMode={isEditMode}
                    as="span"
                  />
                </span>
                <span className="text-xs sm:text-sm text-stone-300 leading-relaxed block font-semibold">
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
