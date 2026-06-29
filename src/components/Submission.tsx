import React from 'react';
import { Mail, Landmark, Send, MapPin, ChevronRight } from 'lucide-react';
import { LandingPageContent } from '../types';
import EditableText from './EditableText';

interface SubmissionProps {
  content?: NonNullable<LandingPageContent['submission']>;
  onChange: (val: NonNullable<LandingPageContent['submission']>) => void;
  isEditMode: boolean;
}

export default function Submission({ content, onChange, isEditMode }: SubmissionProps) {
  // Safe default fallback
  const data = content || {
    title: 'Hình Thức',
    titleHighlight: 'Nộp Bài Dự Thi',
    organizerLabel: 'Ban Tổ chức Cuộc thi sáng tác bộ nhận diện (BI):',
    organizerContent: 'Công ty Cổ phần Quỹ đầu tư mạo hiểm Thành phố Hồ Chí Minh, địa chỉ: 123 Trương Định, phường Xuân Hòa, Thành phố Hồ Chí Minh.',
    methodLabel: 'Hình thức nhận bài thi:',
    emailLabel: '01 bản điện tử qua thư điện tử (email):',
    emailContent: 'hdtrung@hcmc.vc',
    physicalLabel: '01 bản gốc:',
    physicalContent: 'Bản giấy có chữ ký nếu là cá nhân/nhóm tác giả hoặc chữ ký và đóng dấu nếu là tổ chức, gửi trực tiếp về Ban Tổ chức - Công ty Cổ phần Quỹ đầu tư mạo hiểm Thành phố Hồ Chí Minh, địa chỉ nêu trên.'
  };

  const handleUpdate = (key: keyof NonNullable<LandingPageContent['submission']>, value: string) => {
    onChange({
      ...data,
      [key]: value
    });
  };

  return (
    <section id="submission" className="py-24 sm:py-28 bg-white text-stone-800 relative overflow-hidden border-t border-stone-200/40">
      {/* Decorative subtle background accents */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-orange-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold tracking-normal text-stone-900 sm:text-4xl lg:text-5xl leading-tight">
            <EditableText
              value={data.title}
              onChange={(val) => handleUpdate('title', val)}
              isEditMode={isEditMode}
              as="span"
            />{' '}
            <span className="text-orange-600 relative inline-block">
              <EditableText
                value={data.titleHighlight}
                onChange={(val) => handleUpdate('titleHighlight', val)}
                isEditMode={isEditMode}
                as="span"
              />
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-orange-500 rounded-full opacity-40" />
            </span>
          </h2>
        </div>

        <div className="space-y-10">
          {/* Organizer Card Info */}
          <div className="bg-[#FAF9F5] rounded-2xl p-6 sm:p-8 border border-stone-200/70 border-l-4 border-l-orange-500 shadow-xs hover:shadow-md transition-all">
            <div className="flex gap-5 items-start">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100/70 text-orange-600">
                <Landmark className="h-6 w-6 stroke-[2.5]" />
              </div>
              <div className="space-y-3 flex-1">
                <h3 className="text-xs font-bold text-stone-500 uppercase tracking-widest">
                  <EditableText
                    value={data.organizerLabel}
                    onChange={(val) => handleUpdate('organizerLabel', val)}
                    isEditMode={isEditMode}
                    as="span"
                  />
                </h3>
                <p className="text-base sm:text-lg font-bold text-stone-900 leading-relaxed">
                  <EditableText
                    value={data.organizerContent}
                    onChange={(val) => handleUpdate('organizerContent', val)}
                    isEditMode={isEditMode}
                    isMultiline={true}
                    as="span"
                  />
                </p>
              </div>
            </div>
          </div>

          {/* Submission Methods Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <ChevronRight className="h-5 w-5 text-orange-500 stroke-[3]" />
              <h3 className="text-lg sm:text-xl font-extrabold text-stone-900 tracking-normal">
                <EditableText
                  value={data.methodLabel}
                  onChange={(val) => handleUpdate('methodLabel', val)}
                  isEditMode={isEditMode}
                  as="span"
                />
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Method 1: Email Submission */}
              <div className="bg-[#FAF9F5] rounded-2xl p-6 sm:p-8 border-2 border-dashed border-orange-200/95 hover:border-orange-500 transition-colors relative group">
                <div className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600 group-hover:scale-110 transition-transform shadow-3xs">
                  <Send className="h-4 w-4" />
                </div>
                
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100/70 text-orange-600 mb-6 shadow-3xs">
                  <Mail className="h-6 w-6 stroke-[2.5]" />
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-stone-500 uppercase tracking-widest">
                    <EditableText
                      value={data.emailLabel}
                      onChange={(val) => handleUpdate('emailLabel', val)}
                      isEditMode={isEditMode}
                      as="span"
                    />
                  </h4>
                  <p className="text-lg sm:text-xl font-extrabold text-orange-600 break-all font-sans hover:underline">
                    <a href={`mailto:${data.emailContent}`}>
                      <EditableText
                        value={data.emailContent}
                        onChange={(val) => handleUpdate('emailContent', val)}
                        isEditMode={isEditMode}
                        as="span"
                      />
                    </a>
                  </p>
                </div>
              </div>

              {/* Method 2: Physical / Hardcopy Submission */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-sm hover:border-orange-500 hover:shadow-xl transition-all relative group">
                <div className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600 group-hover:scale-110 transition-transform shadow-3xs">
                  <MapPin className="h-4 w-4" />
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100/70 text-orange-600 mb-6 shadow-3xs">
                  <Landmark className="h-6 w-6 stroke-[2.5]" />
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-stone-500 uppercase tracking-widest">
                    <EditableText
                      value={data.physicalLabel}
                      onChange={(val) => handleUpdate('physicalLabel', val)}
                      isEditMode={isEditMode}
                      as="span"
                    />
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 font-semibold leading-relaxed">
                    <EditableText
                      value={data.physicalContent}
                      onChange={(val) => handleUpdate('physicalContent', val)}
                      isEditMode={isEditMode}
                      isMultiline={true}
                      as="span"
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
