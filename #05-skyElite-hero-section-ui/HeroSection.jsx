import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = ["Start", "Story", "Rates", "Benefits", "FAQ"];

const VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_091828_e240eb17-6edc-4129-ad9d-98678e3fd238.mp4";

export default function HeroSection() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; }
        * { box-sizing: border-box; }
      `}</style>

      <div className="min-h-screen bg-gray-50">
        <section className="relative h-screen overflow-hidden">
          {/* Video Background */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={VIDEO_URL} type="video/mp4" />
          </video>

          {/* Overlay */}
          <div className="absolute inset-0 bg-white/20 z-10" />

          {/* Content Wrapper */}
          <div className="relative h-full flex flex-col z-20">

            {/* Navigation */}
            <nav className="relative">
              <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
                {/* Brand */}
                <span className="text-2xl font-semibold text-gray-900 tracking-tight">
                  SkyElite
                </span>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link}
                      href="#"
                      className="text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors"
                    >
                      {link}
                    </a>
                  ))}
                </div>

                {/* Mobile Hamburger */}
                <button
                  className="md:hidden text-gray-900 p-1"
                  onClick={() => setMobileOpen((prev) => !prev)}
                  aria-label="Toggle menu"
                >
                  {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
              </div>

              {/* Mobile Menu */}
              {mobileOpen && (
                <div className="absolute top-full left-0 right-0 mx-4 bg-white/95 backdrop-blur-md rounded-xl shadow-lg py-3 px-4 z-50">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link}
                      href="#"
                      className="block px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              )}
            </nav>

            {/* Hero Content */}
            <main className="flex-1 flex items-center justify-center -mt-80">
              <div className="text-center flex flex-col items-center">
                {/* Label */}
                <p className="text-sm font-semibold text-gray-600 tracking-wider uppercase mb-4">
                  Private Jets
                </p>

                {/* Heading */}
                <div className="flex flex-col items-center leading-none">
                  <span className="text-6xl md:text-7xl lg:text-8xl font-normal text-gray-400 leading-none tracking-tighter">
                    Premium.
                  </span>
                  <span
                    className="text-6xl md:text-7xl lg:text-8xl font-semibold leading-none tracking-tighter"
                    style={{ color: "#202A36", marginTop: "-12px" }}
                  >
                    Accessible.
                  </span>
                </div>

                {/* Subtitle */}
                <p className="text-lg md:text-xl text-gray-600 mt-5 mb-6 max-w-2xl font-normal leading-relaxed">
                  Your dedication deserves recognition.
                </p>

                {/* CTAs */}
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <button className="px-6 py-2.5 rounded-full bg-gray-300 text-gray-800 text-sm font-medium hover:bg-gray-400 transition-colors">
                    Discover
                  </button>
                  <button
                    className="px-6 py-2.5 rounded-full text-white text-sm font-medium transition-colors"
                    style={{ backgroundColor: "#202A36" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#1a2229")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#202A36")
                    }
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </main>
          </div>
        </section>
      </div>
    </>
  );
}