import React, { useState, useEffect, useRef } from 'react';
import { Pencil } from 'lucide-react';

interface EditableTextProps {
  value: string;
  onChange: (newValue: string) => void;
  isEditMode: boolean;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  isMultiline?: boolean;
}

export default function EditableText({
  value,
  onChange,
  isEditMode,
  className = '',
  as: Tag = 'span',
  isMultiline = false,
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    setIsEditing(false);
    if (tempValue.trim() !== '') {
      onChange(tempValue);
    } else {
      setTempValue(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isMultiline) {
      handleSave();
    }
    if (e.key === 'Escape') {
      setTempValue(value);
      setIsEditing(false);
    }
  };

  if (!isEditMode) {
    return <Tag className={className}>{value}</Tag>;
  }

  if (isEditing) {
    return (
      <div className="relative inline-block w-full" ref={containerRef}>
        {isMultiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className={`w-full bg-slate-100 text-slate-900 border-2 border-orange-500 rounded-lg p-2 focus:outline-hidden text-sm resize-y min-h-[100px] ${className}`}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className={`w-full bg-slate-100 text-slate-900 border-2 border-orange-500 rounded-lg px-2 py-1 focus:outline-hidden ${className}`}
          />
        )}
        <span className="absolute -top-3 -right-2 bg-orange-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs">
          Nhấn Enter để lưu
        </span>
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className={`group relative cursor-pointer border border-dashed border-orange-400/50 hover:border-orange-500 rounded-lg p-1 transition-all ${className}`}
      title="Click để chỉnh sửa nhanh"
    >
      <Tag className="pr-6 inline-block w-full">{value}</Tag>
      <span className="absolute right-1.5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-orange-100 text-orange-600 p-1 rounded-sm">
        <Pencil className="h-3 w-3" />
      </span>
    </div>
  );
}
