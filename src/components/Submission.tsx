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
    <section id="submission" className="py-20 bg-slate-50 text-slate-800 relative overflow-hidden">
      {/* Decorative subtle background accents */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            <EditableText
              value={data.title}
              onChange={(val) => handleUpdate('title', val)}
              isEditMode={isEditMode}
              as="span"
            />{' '}
            <span className="text-blue-600 relative inline-block">
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

        <div className="space-y-8">
          {/* Organizer Card Info */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex gap-4 items-start">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Landmark className="h-5 w-5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                  <EditableText
                    value={data.organizerLabel}
                    onChange={(val) => handleUpdate('organizerLabel', val)}
                    isEditMode={isEditMode}
                    as="span"
                  />
                </h3>
                <p className="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed">
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
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ChevronRight className="h-5 w-5 text-orange-500 stroke-[3]" />
              <h3 className="text-lg font-extrabold text-slate-900">
                <EditableText
                  value={data.methodLabel}
                  onChange={(val) => handleUpdate('methodLabel', val)}
                  isEditMode={isEditMode}
                  as="span"
                />
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Method 1: Email Submission */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-dashed border-blue-200 hover:border-blue-400 transition-colors relative group">
                <div className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform">
                  <Send className="h-4 w-4" />
                </div>
                
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-5">
                  <Mail className="h-6 w-6" />
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <EditableText
                      value={data.emailLabel}
                      onChange={(val) => handleUpdate('emailLabel', val)}
                      isEditMode={isEditMode}
                      as="span"
                    />
                  </h4>
                  <p className="text-lg font-black text-blue-600 break-all font-mono">
                    <EditableText
                      value={data.emailContent}
                      onChange={(val) => handleUpdate('emailContent', val)}
                      isEditMode={isEditMode}
                      as="span"
                    />
                  </p>
                </div>
              </div>

              {/* Method 2: Physical / Hardcopy Submission */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-xs hover:shadow-md transition-shadow relative group">
                <div className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-orange-50 text-orange-600 group-hover:scale-110 transition-transform">
                  <MapPin className="h-4 w-4" />
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600 mb-5">
                  <Landmark className="h-6 w-6" />
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <EditableText
                      value={data.physicalLabel}
                      onChange={(val) => handleUpdate('physicalLabel', val)}
                      isEditMode={isEditMode}
                      as="span"
                    />
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
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
