import React from 'react';
import { ArrowUp, ArrowDown, EyeOff, Eye, GripVertical } from 'lucide-react';

interface SectionWrapperProps {
  key?: React.Key;
  id: string;
  name: string;
  index: number;
  total: number;
  visible: boolean;
  isEditMode: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onToggleVisibility: () => void;
  onDragStart: (e: React.DragEvent<any>, index: number) => void;
  onDragOver: (e: React.DragEvent<any>, index: number) => void;
  onDrop: (e: React.DragEvent<any>, index: number) => void;
  children: React.ReactNode;
}

export default function SectionWrapper({
  id,
  name,
  index,
  total,
  visible,
  isEditMode,
  onMoveUp,
  onMoveDown,
  onToggleVisibility,
  onDragStart,
  onDragOver,
  onDrop,
  children,
}: SectionWrapperProps) {
  if (!isEditMode) {
    return visible ? <>{children}</> : null;
  }

  return (
    <div
      draggable={isEditMode}
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDrop={(e) => onDrop(e, index)}
      className={`relative group/section transition-all duration-300 ${
        !visible ? 'opacity-40 border-2 border-dashed border-slate-300 bg-slate-50' : 'border-2 border-transparent hover:border-orange-500/45'
      }`}
    >
      {/* Visual Indicator of Reordering / Section Info */}
      <div className="absolute top-2 left-4 z-30 flex items-center gap-2 bg-slate-900/90 backdrop-blur-md text-white px-3 py-1.5 rounded-full shadow-md text-xs font-semibold opacity-100 md:opacity-0 md:group-hover/section:opacity-100 transition-opacity duration-200">
        {/* Drag Handle */}
        <div className="cursor-grab active:cursor-grabbing text-slate-400 hover:text-white p-0.5">
          <GripVertical className="h-4 w-4" />
        </div>
        
        <span className="text-[11px] font-mono text-slate-300">#{index + 1}</span>
        <span>{name}</span>
        
        {!visible && <span className="text-[10px] bg-rose-600 px-1.5 py-0.5 rounded-sm">Đang ẩn</span>}

        <div className="h-4 w-[1px] bg-slate-700 mx-1" />

        {/* Visibility Toggle */}
        <button
          onClick={onToggleVisibility}
          className="text-slate-300 hover:text-white transition-colors p-0.5"
          title={visible ? 'Ẩn mục này' : 'Hiện mục này'}
        >
          {visible ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
        </button>

        {/* Up / Down controllers */}
        <button
          onClick={onMoveUp}
          disabled={index === 0}
          className="disabled:opacity-35 disabled:pointer-events-none text-slate-300 hover:text-white transition-colors p-0.5"
          title="Di chuyển lên"
        >
          <ArrowUp className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={onMoveDown}
          disabled={index === total - 1}
          className="disabled:opacity-35 disabled:pointer-events-none text-slate-300 hover:text-white transition-colors p-0.5"
          title="Di chuyển xuống"
        >
          <ArrowDown className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Editor overlay warning when hidden */}
      {!visible && (
        <div className="absolute inset-0 bg-slate-100/15 pointer-events-none flex items-center justify-center z-10 border border-slate-300/40">
          <div className="bg-slate-900/80 backdrop-blur-md text-white px-4 py-2 rounded-lg text-xs font-bold pointer-events-auto flex items-center gap-2">
            <EyeOff className="h-4 w-4 text-orange-500" />
            <span>Phần này sẽ bị ẩn đối với khách truy cập</span>
            <button
              onClick={onToggleVisibility}
              className="ml-2 bg-orange-600 hover:bg-orange-700 px-2 py-1 rounded text-[10px]"
            >
              Hiện lại
            </button>
          </div>
        </div>
      )}

      {/* Actual Content of Section */}
      <div className="relative">{children}</div>
    </div>
  );
}
