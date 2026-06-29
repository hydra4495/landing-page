import React, { useState } from 'react';
import { SectionConfig } from '../types';
import { 
  Settings, 
  Eye, 
  EyeOff, 
  ArrowUp, 
  ArrowDown, 
  RotateCcw, 
  Save, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles,
  MousePointer,
  HelpCircle,
  GripVertical
} from 'lucide-react';

interface BuilderPanelProps {
  sections: SectionConfig[];
  onReorder: (newSections: SectionConfig[]) => void;
  isEditMode: boolean;
  onToggleEditMode: () => void;
  onReset: () => void;
  onSave: () => void;
}

export default function BuilderPanel({
  sections,
  onReorder,
  isEditMode,
  onToggleEditMode,
  onReset,
  onSave,
}: BuilderPanelProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleToggleVisibility = (index: number) => {
    const updated = [...sections];
    updated[index] = { ...updated[index], visible: !updated[index].visible };
    onReorder(updated);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    onReorder(updated);
  };

  const handleMoveDown = (index: number) => {
    if (index === sections.length - 1) return;
    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    onReorder(updated);
  };

  const handleSaveWithFeedback = () => {
    onSave();
    setShowSaveSuccess(true);
    setTimeout(() => {
      setShowSaveSuccess(false);
    }, 2000);
  };

  // Drag and Drop list reordering within the sidebar
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    
    const updated = [...sections];
    const draggedItem = updated[draggedIndex];
    updated.splice(draggedIndex, 1);
    updated.splice(index, 0, draggedItem);
    onReorder(updated);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <>
      {/* Floating Toggle Button (Visible when sidebar is closed) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed left-4 bottom-6 z-50 flex items-center gap-2 rounded-full bg-slate-900 text-white px-4 py-3 shadow-xl hover:bg-slate-800 border border-slate-700/60 active:scale-95 transition-all cursor-pointer font-sans text-xs font-bold"
        >
          <Settings className={`h-4 w-4 text-orange-500 ${isEditMode ? 'animate-spin' : ''}`} />
          <span>Bảng Chỉnh Sửa</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      )}

      {/* Main Sidebar Panel */}
      <div
        className={`fixed top-24 left-4 z-50 w-80 max-h-[calc(100vh-140px)] rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-md p-5 shadow-2xl transition-all duration-300 flex flex-col font-sans overflow-hidden ${
          isOpen ? 'translate-x-0 opacity-100' : '-translate-x-96 opacity-0 pointer-events-none'
        }`}
      >
        {/* Header segment */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-orange-600 animate-pulse" />
            <h3 className="text-sm font-extrabold text-slate-900">Live Website Builder</h3>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            title="Thu nhỏ bảng điều khiển"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>

        {/* Action Toggle Mode Button */}
        <div className="space-y-3 mb-5">
          <button
            onClick={onToggleEditMode}
            className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-extrabold transition-all active:scale-98 shadow-sm cursor-pointer ${
              isEditMode
                ? 'bg-orange-600 text-white hover:bg-orange-700 hover:shadow-orange-200'
                : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            <span>{isEditMode ? 'Tắt Chế Độ Sửa (Xem Thử)' : 'Bật Chế Độ Chỉnh Sửa'}</span>
          </button>
        </div>

        {/* Drag and drop reordering segment */}
        {isEditMode && (
          <div className="flex-1 overflow-y-auto space-y-4 pr-1 min-h-[220px]">
            <div>
              <div className="flex items-center gap-1.5 text-slate-900 font-extrabold text-[11px] uppercase tracking-wider mb-2">
                <GripVertical className="h-3.5 w-3.5 text-slate-500" />
                <span>Kéo thả sắp xếp thứ tự</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-normal mb-3">
                Nhấn giữ nút <GripVertical className="h-3 w-3 inline" /> để kéo thả reorder các mục, hoặc bấm các mũi tên.
              </p>

              {/* Draggable Sections List */}
              <div className="space-y-2">
                {sections.map((sec, idx) => (
                  <div
                    key={sec.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, idx)}
                    onDragOver={(e) => handleDragOver(e, idx)}
                    onDragEnd={handleDragEnd}
                    className={`flex items-center justify-between p-2.5 rounded-xl border bg-white transition-all ${
                      draggedIndex === idx
                        ? 'border-orange-500/70 bg-orange-50/20 scale-[0.98]'
                        : !sec.visible
                        ? 'border-slate-100 bg-slate-50/50 opacity-60'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {/* Drag Grip Handle */}
                      <div className="cursor-grab active:cursor-grabbing p-1 text-slate-400 hover:text-slate-600">
                        <GripVertical className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-xs font-bold text-slate-800 truncate max-w-[130px]">
                        {sec.name}
                      </span>
                    </div>

                    {/* Controls inside item row */}
                    <div className="flex items-center gap-1 shrink-0">
                      {/* Eye Vis Toggle */}
                      <button
                        onClick={() => handleToggleVisibility(idx)}
                        className={`p-1 rounded-sm hover:bg-slate-100 transition-colors ${
                          sec.visible ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-rose-600'
                        }`}
                        title={sec.visible ? 'Ẩn phần này' : 'Hiện phần này'}
                      >
                        {sec.visible ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                      </button>

                      {/* Arrow Controllers */}
                      <button
                        onClick={() => handleMoveUp(idx)}
                        disabled={idx === 0}
                        className="p-1 rounded-sm hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none text-slate-500 hover:text-slate-800 transition-colors"
                        title="Di chuyển lên"
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleMoveDown(idx)}
                        disabled={idx === sections.length - 1}
                        className="p-1 rounded-sm hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none text-slate-500 hover:text-slate-800 transition-colors"
                        title="Di chuyển xuống"
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Editing Tips Guide */}
            <div className="bg-orange-50/50 border border-orange-200/50 rounded-xl p-3 space-y-2">
              <span className="flex items-center gap-1 text-[11px] font-extrabold text-orange-800 uppercase tracking-wide">
                <HelpCircle className="h-3.5 w-3.5" />
                <span>Hướng dẫn sửa nhanh</span>
              </span>
              <ul className="text-[10px] text-orange-950/80 space-y-1.5 list-disc pl-4 leading-relaxed">
                <li>Rê chuột vào bất kỳ đoạn chữ nào có khung nét đứt.</li>
                <li><strong>Click chuột</strong> để mở ô nhập văn bản trực tiếp.</li>
                <li>Thay đổi nội dung, bấm <strong>Enter</strong> hoặc nhấn chuột ra ngoài để tự động lưu tạm thời.</li>
                <li>Góc trên của các mục Hero, About, Tiêu chí có nút <strong>Đổi ảnh</strong> để chỉnh sửa liên kết ảnh minh họa.</li>
              </ul>
            </div>
          </div>
        )}

        {/* If preview mode instructions */}
        {!isEditMode && (
          <div className="flex-1 flex flex-col justify-center items-center text-center p-4 bg-slate-50 border border-slate-100 rounded-xl mb-4">
            <MousePointer className="h-8 w-8 text-slate-400 mb-2 animate-bounce" />
            <span className="text-xs font-bold text-slate-800">Chế độ xem trước</span>
            <p className="text-[10px] text-slate-500 mt-1 max-w-[190px] leading-relaxed">
              Bạn đang ở chế độ hiển thị thực tế. Hãy kích hoạt nút phía trên để bắt đầu chỉnh sửa.
            </p>
          </div>
        )}

        {/* Footer save/reset segment */}
        <div className="border-t border-slate-100 pt-4 mt-auto space-y-2">
          <div className="flex gap-2">
            <button
              onClick={handleSaveWithFeedback}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 text-[11px] font-bold transition-all shadow-3xs cursor-pointer"
            >
              {showSaveSuccess ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Đã lưu!</span>
                </>
              ) : (
                <>
                  <Save className="h-3.5 w-3.5" />
                  <span>Lưu thay đổi</span>
                </>
              )}
            </button>

            <button
              onClick={onReset}
              className="flex items-center justify-center gap-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 text-[11px] font-bold transition-all border border-slate-200 cursor-pointer"
              title="Khôi phục nội dung ban đầu"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <span className="text-[9px] text-slate-400 block text-center">
            Trình quản lý lưu thay đổi vào LocalStorage của trình duyệt
          </span>
        </div>
      </div>
    </>
  );
}
