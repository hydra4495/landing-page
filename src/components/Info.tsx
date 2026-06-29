import { Target, Lightbulb, Clock, Coins, MessageSquare, Layers, Monitor, Palette, CheckCircle } from 'lucide-react';
import { LandingPageContent } from '../types';
import EditableText from './EditableText';

interface InfoProps {
  content: LandingPageContent['info'];
  onChange: (updatedInfo: LandingPageContent['info']) => void;
  isEditMode: boolean;
}

export default function Info({ content, onChange, isEditMode }: InfoProps) {
  const getIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'Target':
        return <Target className={className} />;
      case 'Lightbulb':
        return <Lightbulb className={className} />;
      case 'Clock':
        return <Clock className={className} />;
      case 'Coins':
        return <Coins className={className} />;
      case 'MessageSquare':
        return <MessageSquare className={className} />;
      case 'Layers':
        return <Layers className={className} />;
      case 'Monitor':
        return <Monitor className={className} />;
      case 'Palette':
        return <Palette className={className} />;
      case 'CheckCircle':
        return <CheckCircle className={className} />;
      default:
        return <Lightbulb className={className} />;
    }
  };

  const handleUpdate = (key: keyof Omit<LandingPageContent['info'], 'items'>, value: string) => {
    onChange({
      ...content,
      [key]: value
    });
  };

  const handleUpdateItem = (index: number, field: 'title' | 'description', value: string) => {
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
    <section id="rules" className="py-20 bg-slate-50/50 border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Section Title Header */}
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

        {/* Rules Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-5xl mx-auto">
          {content.items.map((rule, idx) => (
            <div
              key={idx}
              className="flex gap-4 p-6 rounded-2xl border border-slate-200/55 bg-white shadow-2xs hover:shadow-xs transition-shadow duration-300"
            >
              {/* Left Column: Icon */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600 shadow-3xs">
                {getIcon(rule.icon, "h-6 w-6")}
              </div>

              {/* Right Column: Title & Description */}
              <div className="space-y-2 w-full">
                <h3 className="text-base font-bold text-slate-900">
                  <EditableText
                    value={rule.title}
                    onChange={(val) => handleUpdateItem(idx, 'title', val)}
                    isEditMode={isEditMode}
                    as="span"
                  />
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  <EditableText
                    value={rule.description}
                    onChange={(val) => handleUpdateItem(idx, 'description', val)}
                    isEditMode={isEditMode}
                    isMultiline={true}
                    as="span"
                  />
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
