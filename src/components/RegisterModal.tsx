import { useState, FormEvent } from 'react';
import { X, CheckCircle2, Sparkles } from 'lucide-react';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [org, setOrg] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [registrationCode, setRegistrationCode] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Vui lòng nhập họ và tên';
    }
    if (!email.trim()) {
      newErrors.email = 'Vui lòng nhập địa chỉ email';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email không đúng định dạng';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    }
    if (!accepted) {
      newErrors.accepted = 'Bạn phải đồng ý với quy định cuộc thi';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Success state simulator
    const code = 'AURA-' + Math.floor(100000 + Math.random() * 900000);
    setRegistrationCode(code);
    setErrors({});
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      {/* Container */}
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-100 bg-white shadow-2xl overflow-hidden transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header decoration bar */}
        <div className="h-2.5 bg-linear-to-r from-orange-500 to-amber-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content */}
        {!isSubmitted ? (
          <div className="p-6 sm:p-8">
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Sparkles className="h-5.5 w-5.5 text-orange-600" />
              <span>Đăng Ký Tham Gia</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Hãy cung cấp đầy đủ thông tin để chính thức ghi danh vào cuộc thi sáng tác Brand Identity toàn quốc.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Name */}
              <div className="space-y-1.5">
                <label htmlFor="modal-name" className="text-xs font-semibold text-slate-700 block">
                  Họ và tên <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="modal-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className={`w-full rounded-xl border px-4 py-2.5 text-xs focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-hidden transition-all ${
                    errors.name ? 'border-rose-400' : 'border-slate-200'
                  }`}
                />
                {errors.name && <p className="text-4xs font-bold text-rose-500 mt-0.5">{errors.name}</p>}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="modal-email" className="text-xs font-semibold text-slate-700 block">
                  Địa chỉ Email <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  id="modal-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className={`w-full rounded-xl border px-4 py-2.5 text-xs focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-hidden transition-all ${
                    errors.email ? 'border-rose-400' : 'border-slate-200'
                  }`}
                />
                {errors.email && <p className="text-4xs font-bold text-rose-500 mt-0.5">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label htmlFor="modal-phone" className="text-xs font-semibold text-slate-700 block">
                  Số điện thoại <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  id="modal-phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0901234567"
                  className={`w-full rounded-xl border px-4 py-2.5 text-xs focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-hidden transition-all ${
                    errors.phone ? 'border-rose-400' : 'border-slate-200'
                  }`}
                />
                {errors.phone && <p className="text-4xs font-bold text-rose-500 mt-0.5">{errors.phone}</p>}
              </div>

              {/* Organization/School */}
              <div className="space-y-1.5">
                <label htmlFor="modal-org" className="text-xs font-semibold text-slate-700 block">
                  Đơn vị công tác / Trường học <span className="text-slate-400 font-normal">(Tùy chọn)</span>
                </label>
                <input
                  type="text"
                  id="modal-org"
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                  placeholder="Đại học Mỹ thuật, Freelancer,..."
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-hidden transition-all"
                />
              </div>

              {/* Accept Rules checkbox */}
              <div className="space-y-1.5 pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer text-slate-600">
                  <input
                    type="checkbox"
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded-sm border-slate-300 text-orange-600 focus:ring-orange-500/20 accent-orange-600"
                  />
                  <span className="text-xs font-normal leading-normal">
                    Tôi đồng ý với mọi <span className="text-orange-600 font-semibold underline">quy định và thể lệ</span> của cuộc thi sáng tác.
                  </span>
                </label>
                {errors.accepted && <p className="text-4xs font-bold text-rose-500">{errors.accepted}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-6 rounded-xl bg-orange-600 py-3 text-xs font-extrabold text-white hover:bg-orange-700 transition-all cursor-pointer"
              >
                Gửi Đăng Ký Ghi Danh
              </button>
            </form>
          </div>
        ) : (
          /* Success Screen */
          <div className="p-8 text-center flex flex-col items-center">
            <div className="h-14 w-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 shadow-inner">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <h3 className="text-lg font-black text-slate-900">
              Đăng Ký Thành Công!
            </h3>
            <p className="mt-2 text-xs text-slate-500 max-w-sm leading-relaxed">
              Chúc mừng bạn đã ghi danh thành công. Vui lòng lưu lại mã số báo danh bên dưới để nộp bài thiết kế dự thi.
            </p>

            {/* SBD Summary card */}
            <div className="mt-6 rounded-xl bg-slate-50 border border-slate-100 p-5 text-left w-full">
              <span className="text-4xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Mã số báo danh (SBD):</span>
              <span className="block text-xl font-mono font-black text-orange-600 tracking-wider">
                {registrationCode}
              </span>

              <div className="h-px bg-slate-200 my-3.5" />

              <div className="space-y-1.5 text-[11px] leading-relaxed text-slate-600">
                <p>• <strong>Thí sinh:</strong> {name}</p>
                <p>• <strong>Email:</strong> {email}</p>
                {org && <p>• <strong>Đơn vị:</strong> {org}</p>}
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-8 rounded-xl bg-slate-900 px-6 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition-all"
            >
              Đóng cửa sổ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
