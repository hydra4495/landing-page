import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#2a130f] text-white border-t border-white/5 py-12 font-sans">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-4 max-w-3xl text-left">
          
          {/* Row 1: Company Name and Slogan */}
          <p className="text-sm sm:text-base font-extrabold text-white leading-relaxed">
            Công ty Cổ phần Quỹ đầu tư mạo hiểm Thành phố Hồ Chí Minh – Hỗ trợ khởi nghiệp và đổi mới sáng tạo tại TP.HCM.
          </p>

          {/* Row 2: Address */}
          <div className="flex items-center gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#4e251b] text-white">
              <MapPin className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-white/95">
              Địa chỉ: TP. Hồ Chí Minh, Việt Nam
            </span>
          </div>

          {/* Row 3: Hotline */}
          <div className="flex items-center gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#4e251b] text-white">
              <Phone className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-[#f97316]">
              Hotline: (028) 3827 1111
            </span>
          </div>

          {/* Row 4: Email */}
          <div className="flex items-center gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#4e251b] text-white">
              <Mail className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-white/95">
              Email: hdtrung@hcmc.vc
            </span>
          </div>

          {/* Row 5: Copyright Info */}
          <div className="text-xs sm:text-sm font-bold text-white/90 mt-2 pt-2 border-t border-white/5">
            © 2024 Công ty Cổ phần Quỹ đầu tư mạo hiểm Thành phố Hồ Chí Minh
          </div>

        </div>
      </div>
    </footer>
  );
}

