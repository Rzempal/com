'use client';

function FooterTagline() {
  return (
    <svg viewBox="0 0 560 60" className="footer-logo w-full max-w-[420px] h-auto">
      {/* Neural network nodes */}
      <circle cx="5" cy="15" r="2" className="rtk-node rtk-n1" />
      <circle cx="20" cy="5" r="2" className="rtk-node rtk-n2" />
      <circle cx="10" cy="30" r="2" className="rtk-node rtk-n3" />
      {/* Neural links */}
      <line x1="5" y1="15" x2="20" y2="5" className="rtk-link rtk-l1" />
      <line x1="20" y1="5" x2="10" y2="30" className="rtk-link rtk-l2" />
      <line x1="5" y1="15" x2="10" y2="30" className="rtk-link rtk-l3" />
      {/* Flow path */}
      <path d="M 10 30 L 40 30" className="rtk-path" />
      {/* Prompt // */}
      <text x="48" y="38" className="footer-cmd">{'//'}</text>
      {/* Typed text */}
      <text x="86" y="38" className="footer-typed">NO BORING WEBSITES ALLOWED</text>
      {/* Cursor */}
      <g className="footer-cursor-g">
        <rect x="86" y="16" width="14" height="26" className="footer-cursor" />
      </g>
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-transparent">
      <div className="max-w-5xl mx-auto px-6 py-12 flex justify-center">
        <FooterTagline />
      </div>
    </footer>
  );
}
