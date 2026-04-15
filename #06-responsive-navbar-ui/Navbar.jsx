import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const SERVICES = [
  { id: "web-dev", label: "Web Development", href: "/web-dev" },
  { id: "ui-design", label: "UI / UX Design", href: "/ui-design" },
  { id: "seo", label: "SEO Services", href: "/seo" },
  { id: "analytics", label: "Analytics & Insights", href: "/analytics" },
  { id: "marketing", label: "Digital Marketing", href: "/marketing" },
];

const NAV_LINKS = [
  { id: "home", label: "Home", href: "/" },
  { id: "about", label: "About", href: "/about" },
  { id: "services", label: "Services", href: "/services", dropdown: SERVICES },
  { id: "portfolio", label: "Portfolio", href: "/portfolio" },
  { id: "contact", label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDesktopDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [mobileOpen]);

  return (
    <header className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <div className="shrink-0">
            <Link to="/" className="text-xl font-bold tracking-wider text-white no-underline">SocialStacker</Link>
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <div key={link.id} className="relative" ref={link.dropdown ? dropdownRef : null}>
                {link.dropdown ? (
                  <button onClick={() => setDesktopDropdownOpen(!desktopDropdownOpen)} className="flex items-center gap-1 text-sm font-medium text-blue-50 hover:text-white transition-colors focus:outline-none">
                    {link.label}
                    <svg className={`w-4 h-4 transition-transform duration-200 ${desktopDropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                ) : (
                  <Link to={link.href} className="text-sm font-medium text-blue-50 hover:text-white transition-colors">{link.label}</Link>
                )}

                {link.dropdown && desktopDropdownOpen && (
                  <div className="absolute left-0 mt-3 w-56 rounded-md shadow-lg bg-white py-1 z-50">
                    {link.dropdown.map((service) => (
                      <Link key={service.id} to={service.href} onClick={() => setDesktopDropdownOpen(false)} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                        {service.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/login" className="text-sm font-medium hover:text-blue-200 transition-colors">Log in</Link>
            <Link to="/get-started" className="bg-white text-blue-600 px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-50 transition-colors shadow-sm">Get Started</Link>
          </div>

          <div className="lg:hidden flex items-center">
            <button onClick={() => setMobileOpen(true)} className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none transition-colors">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>
      </div>

      {mobileOpen && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity" onClick={() => setMobileOpen(false)} />}

      <div className={`fixed top-0 right-0 h-full w-72 bg-blue-700 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden overflow-y-auto ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-5 flex items-center justify-between border-b border-blue-500/30">
          <span className="text-lg font-bold text-white tracking-wider">Menu</span>
          <button onClick={() => setMobileOpen(false)} className="p-2 rounded-md text-blue-100 hover:text-white hover:bg-blue-600 focus:outline-none transition-colors">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-4 py-6 space-y-2">
          {NAV_LINKS.map((link) => (
            <div key={link.id}>
              {link.dropdown ? (
                <div>
                  <button onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)} className="w-full flex items-center justify-between px-3 py-3 rounded-md text-base font-medium text-blue-50 hover:bg-blue-600 hover:text-white transition-colors">
                    {link.label}
                    <svg className={`w-5 h-5 transition-transform duration-200 ${mobileDropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileDropdownOpen ? "max-h-64 opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
                    <div className="bg-blue-800/50 rounded-md py-2 space-y-1">
                      {link.dropdown.map((service) => (
                        <Link key={service.id} to={service.href} onClick={() => setMobileOpen(false)} className="block px-6 py-2.5 text-sm font-medium text-blue-100 hover:text-white hover:bg-blue-600/50 transition-colors">
                          {service.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link to={link.href} onClick={() => setMobileOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-blue-50 hover:bg-blue-600 hover:text-white transition-colors">
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="px-4 py-6 mt-4 border-t border-blue-500/30 space-y-4">
          <Link to="/login" className="block w-full text-center px-4 py-3 rounded-md border border-blue-400 text-base font-medium text-white hover:bg-blue-600 transition-colors">Log in</Link>
          <Link to="/get-started" className="block w-full text-center px-4 py-3 rounded-md bg-white text-blue-700 text-base font-bold hover:bg-blue-50 shadow-md transition-colors">Get Started</Link>
        </div>
      </div>
    </header>
  );
}