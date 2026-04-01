import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "الرئيسية", href: "#hero" },
    { label: "من نحن", href: "#about" },
    { label: "خدماتنا", href: "#services" },
    { label: "الجامعات", href: "#universities" },
    { label: "المعاهد", href: "#institutes" },
    { label: "تواصل معنا", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/97 backdrop-blur-sm border-b border-green-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-18 flex items-center justify-between" style={{ height: "72px" }}>
        <div className="flex items-center gap-3">
          {/* Logo — white background + object-contain to keep logo crisp */}
          <div className="w-14 h-14 rounded-full bg-white border-2 border-green-200 shadow-sm flex items-center justify-center overflow-hidden flex-shrink-0">
            <img
              src="/logo.jpeg"
              alt="Algeria2Malaysia"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="text-green-800 font-bold text-base leading-tight">Algeria2Malaysia</div>
            <div className="text-green-600 text-xs">الجزائر إلى ماليزيا</div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-gray-700 hover:text-green-700 font-medium transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#apply"
            className="bg-green-700 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-green-800 transition-colors shadow-sm"
          >
            ابدأ الآن
          </a>
        </div>

        <button
          className="md:hidden text-green-800 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-green-100 px-4 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-gray-700 hover:text-green-700 font-medium py-2 border-b border-gray-100"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#apply"
            className="bg-green-700 text-white px-5 py-3 rounded-full text-sm font-bold text-center hover:bg-green-800 transition-colors mt-2"
            onClick={() => setOpen(false)}
          >
            ابدأ الآن
          </a>
        </div>
      )}
    </nav>
  );
}
