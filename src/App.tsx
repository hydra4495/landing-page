/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Info from './components/Info';
import Prizes from './components/Prizes';
import Criteria from './components/Criteria';
import Submission from './components/Submission';
import RegisterModal from './components/RegisterModal';
import Footer from './components/Footer';
import SectionWrapper from './components/SectionWrapper';
import { DEFAULT_SECTIONS, DEFAULT_CONTENT } from './data';
import { SectionConfig, LandingPageContent } from './types';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isEditMode = false;

  // Initialize state from local storage or defaults
  const [sections, setSections] = useState<SectionConfig[]>(() => {
    const saved = localStorage.getItem('aura_builder_sections');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as SectionConfig[];
        const hasSubmission = parsed.some(s => s.id === 'submission');
        if (!hasSubmission) {
          const updated = [...parsed, { id: 'submission', name: 'Hình thức nộp bài', visible: true }];
          localStorage.setItem('aura_builder_sections', JSON.stringify(updated));
          return updated;
        }
        return parsed;
      } catch (e) {
        return DEFAULT_SECTIONS;
      }
    }
    return DEFAULT_SECTIONS;
  });

  const [content, setContent] = useState<LandingPageContent>(() => {
    const saved = localStorage.getItem('aura_builder_content');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as LandingPageContent;
        let modified = false;

        // Migrate criteria if it is still using the old template
        if (parsed.criteria && (parsed.criteria.items.length !== 4 || parsed.criteria.title === 'Tiêu Chí Đánh Giá')) {
          parsed.criteria = DEFAULT_CONTENT.criteria;
          modified = true;
        }

        // Automatic image upgrade for smart city network without cars
        if (parsed.criteria && parsed.criteria.imageUrl && (
          parsed.criteria.imageUrl.includes('photo-1519501025264-65ba15a82390') || 
          parsed.criteria.imageUrl.includes('photo-1513542789411-b6a5d4f31634')
        )) {
          parsed.criteria.imageUrl = DEFAULT_CONTENT.criteria.imageUrl;
          modified = true;
        }

        // Migrate info if it is still using the old template (4 items instead of 7)
        if (!parsed.info || !parsed.info.items || parsed.info.items.length !== 7 || parsed.info.title === 'Thông Tin') {
          parsed.info = DEFAULT_CONTENT.info;
          modified = true;
        }

        // Migrate about if it is still using the old template
        if (!parsed.about || parsed.about.title === 'Về Cuộc Thi Sáng Tác') {
          parsed.about = DEFAULT_CONTENT.about;
          modified = true;
        }

        // Migrate submission if it is missing
        if (!parsed.submission) {
          parsed.submission = DEFAULT_CONTENT.submission;
          modified = true;
        } else if (parsed.submission.emailContent !== 'hdtrung@hcmc.vc') {
          parsed.submission.emailContent = 'hdtrung@hcmc.vc';
          modified = true;
        }

        // Migrate hero image if it's using the old forest image
        if (parsed.hero && parsed.hero.imageUrl && parsed.hero.imageUrl.includes('photo-1448375240586-882707db888b')) {
          parsed.hero.imageUrl = DEFAULT_CONTENT.hero.imageUrl;
          modified = true;
        }

        if (modified) {
          localStorage.setItem('aura_builder_content', JSON.stringify(parsed));
        }
        return parsed;
      } catch (e) {
        return DEFAULT_CONTENT;
      }
    }
    return DEFAULT_CONTENT;
  });

  const [draggedSectionIndex, setDraggedSectionIndex] = useState<number | null>(null);

  // Synchronize on changes
  const handleSave = () => {
    localStorage.setItem('aura_builder_sections', JSON.stringify(sections));
    localStorage.setItem('aura_builder_content', JSON.stringify(content));
  };

  const handleReset = () => {
    if (window.confirm('Bạn có chắc chắn muốn khôi phục toàn bộ nội dung và sắp xếp về mặc định ban đầu?')) {
      setSections(DEFAULT_SECTIONS);
      setContent(DEFAULT_CONTENT);
      localStorage.removeItem('aura_builder_sections');
      localStorage.removeItem('aura_builder_content');
    }
  };

  const handleContentChange = <K extends keyof LandingPageContent>(
    sectionId: K,
    updatedSectionContent: LandingPageContent[K]
  ) => {
    setContent((prev) => ({
      ...prev,
      [sectionId]: updatedSectionContent
    }));
  };

  // Section Reordering Operations
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    setSections(updated);
  };

  const handleMoveDown = (index: number) => {
    if (index === sections.length - 1) return;
    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    setSections(updated);
  };

  const handleToggleVisibility = (index: number) => {
    const updated = [...sections];
    updated[index] = { ...updated[index], visible: !updated[index].visible };
    setSections(updated);
  };

  // Drag and drop entire sections on page canvas
  const handleDragStart = (e: React.DragEvent<any>, index: number) => {
    setDraggedSectionIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<any>, index: number) => {
    e.preventDefault();
    if (draggedSectionIndex === null || draggedSectionIndex === index) return;
    
    const updated = [...sections];
    const draggedItem = updated[draggedSectionIndex];
    updated.splice(draggedSectionIndex, 1);
    updated.splice(index, 0, draggedItem);
    setSections(updated);
    setDraggedSectionIndex(index);
  };

  const handleDrop = (e: React.DragEvent<any>, index: number) => {
    setDraggedSectionIndex(null);
  };

  return (
    <div id="app" className="min-h-screen bg-white font-sans text-slate-900 antialiased selection:bg-orange-500/10 selection:text-orange-950 pb-20">
      
      {/* Navigation Header */}
      <Header onRegisterClick={() => setIsModalOpen(true)} />

      {/* Main Dynamic Ordered Sections Canvas */}
      <main className="relative">
        {sections.map((sec, index) => {
          const isSecVisible = sec.visible;

          const component = (() => {
            switch (sec.id) {
              case 'hero':
                return (
                  <Hero
                    content={content.hero}
                    onChange={(val) => handleContentChange('hero', val)}
                    isEditMode={isEditMode}
                    onRegisterClick={() => setIsModalOpen(true)}
                  />
                );
              case 'about':
                return (
                  <About
                    content={content.about}
                    onChange={(val) => handleContentChange('about', val)}
                    isEditMode={isEditMode}
                  />
                );
              case 'rules':
                return (
                  <Info
                    content={content.info}
                    onChange={(val) => handleContentChange('rules' as any, val)} // Match fallback
                    isEditMode={isEditMode}
                  />
                );
              case 'prizes':
                return (
                  <Prizes
                    content={content.prizes}
                    onChange={(val) => handleContentChange('prizes', val)}
                    isEditMode={isEditMode}
                  />
                );
              case 'criteria':
                return (
                  <Criteria
                    content={content.criteria}
                    onChange={(val) => handleContentChange('criteria', val)}
                    isEditMode={isEditMode}
                  />
                );
              case 'submission':
                return (
                  <Submission
                    content={content.submission}
                    onChange={(val) => handleContentChange('submission' as any, val)}
                    isEditMode={isEditMode}
                  />
                );
              default:
                return null;
            }
          })();

          if (!component) return null;

          return (
            <SectionWrapper
              key={sec.id}
              id={sec.id}
              name={sec.name}
              index={index}
              total={sections.length}
              visible={isSecVisible}
              isEditMode={isEditMode}
              onMoveUp={() => handleMoveUp(index)}
              onMoveDown={() => handleMoveDown(index)}
              onToggleVisibility={() => handleToggleVisibility(index)}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {component}
            </SectionWrapper>
          );
        })}
      </main>

      {/* Site Footer */}
      <Footer />

      {/* Interactive Registration Modal */}
      <RegisterModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

    </div>
  );
}
