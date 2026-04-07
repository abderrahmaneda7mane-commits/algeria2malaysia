import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { useNavigate, getNavState, navigate } from "../hooks/useNavigate";

function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

function handleNavLink(sectionId: string | null, page: "universities" | null, closeMobile?: () => void) {
  if (closeMobile) closeMobile();
  if (page) {
    navigate(page);
    return;
  }
  if (!sectionId) return;
  const { page: currentPage } = getNavState();
  if (currentPage === "home") {
    scrollToSection(sectionId);
  } else {
    navigate("home", { scrollTo: sectionId });
  }
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links: { label: string; sectionId: string | null; page: "universities" | null }[] = [
    { label: "الرئيسية",   sectionId: "hero",        page: null },
    { label: "من نحن",     sectionId: "about",       page: null },
    { label: "خدماتنا",    sectionId: "services",    page: null },
    { label: "الجامعات",   sectionId: null,          page: "universities" },
    { label: "المعاهد",    sectionId: "institutes",  page: null },
    { label: "تواصل معنا", sectionId: "contact",     page: null },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/97 backdrop-blur-sm border-b border-green-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-18 flex items-center justify-between" style={{ height: "72px" }}>
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavLink("hero", null)}>
          <div className="flex-shrink-0 w-14 h-14 rounded-full overflow-hidden border-2 border-green-500 shadow-md bg-white" style={{ width: 56, height: 56 }}>
            <img
              src="/logo-hq.jpg"
              alt="Algeria2Malaysia"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="text-green-800 font-extrabold text-base leading-tight tracking-tight">Algeria2Malaysia</div>
            <div className="text-green-500 text-[11px] font-medium">الجزائر إلى ماليزيا</div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <button
              key={l.label}
              onClick={() => handleNavLink(l.sectionId, l.page)}
              className="text-sm text-gray-700 hover:text-green-700 font-medium transition-colors"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => navigate("search")}
            className="flex items-center gap-1.5 border border-gray-200 text-gray-600 hover:text-green-700 hover:border-green-300 bg-gray-50 hover:bg-green-50 px-4 py-2 rounded-full text-sm font-medium transition-all"
            title="بحث عن تخصص"
          >
            <Search size={15} />
            <span>ابحث عن تخصص</span>
          </button>
          <button
            onClick={() => handleNavLink("apply", null)}
            className="bg-green-700 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-green-800 transition-colors shadow-sm"
          >
            ابدأ الآن
          </button>
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
          <button
            onClick={() => { setOpen(false); navigate("search"); }}
            className="flex items-center gap-2 border border-green-200 text-green-700 bg-green-50 px-4 py-2.5 rounded-full text-sm font-semibold justify-center"
          >
            <Search size={15} />
            ابحث عن تخصص
          </button>
          {links.map((l) => (
            <button
              key={l.label}
              onClick={() => handleNavLink(l.sectionId, l.page, () => setOpen(false))}
              className="text-sm text-gray-700 hover:text-green-700 font-medium py-2 border-b border-gray-100 text-right"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => { setOpen(false); handleNavLink("apply", null); }}
            className="bg-green-700 text-white px-5 py-3 rounded-full text-sm font-bold text-center hover:bg-green-800 transition-colors mt-2"
          >
            ابدأ الآن
          </button>
        </div>
      )}
    </nav>
  );
}
