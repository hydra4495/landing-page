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
    <section id="criteria" className="py-20 bg-gradient-to-br from-[#1e40af] via-[#2563eb] to-[#0b1329] text-white overflow-hidden relative">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
        
        <div className="space-y-4 max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
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

          <p className="text-xs sm:text-sm text-amber-100/85 leading-relaxed font-normal">
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
        <div className="mx-auto max-w-2xl text-left rounded-2xl bg-black/25 border border-white/10 p-6 sm:p-8 space-y-5 shadow-2xl backdrop-blur-xs">
          {content.items.map((criterion, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              {/* Highlighted check icon */}
              <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-400/20 text-amber-400">
                <Check className="h-4 w-4 stroke-[3]" />
              </div>
              <div className="space-y-1 w-full">
                <span className="text-sm sm:text-base font-bold text-white block">
                  <EditableText
                    value={criterion.title}
                    onChange={(val) => handleUpdateItem(idx, 'title', val)}
                    isEditMode={isEditMode}
                    as="span"
                  />
                </span>
                <span className="text-[12px] sm:text-sm text-amber-100/75 block font-normal leading-relaxed">
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
