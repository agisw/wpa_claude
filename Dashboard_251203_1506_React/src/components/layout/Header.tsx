import { Search, Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-[#384047] flex items-center justify-between px-3 h-10 shadow-sm">
      {/* Logo & Navigation */}
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div className="flex items-center pr-2 border-r border-white/20">
          <h1 className="text-white text-[19px] font-bold leading-6 tracking-[0.8px]">
            MBP
          </h1>
        </div>

        {/* Navigation Buttons */}
        <nav className="flex items-center gap-1">
          <button className="px-1.5 py-2 text-white text-sm font-bold leading-5 tracking-[0.8px] hover:bg-white/10 rounded-sm transition-colors">
            CONTENTS
          </button>
          <button className="px-1.5 py-2 text-white text-sm font-bold leading-5 tracking-[0.8px] hover:bg-white/10 rounded-sm transition-colors">
            WIDGET STORE
          </button>
          <button className="px-1.5 py-2 text-white text-sm font-bold leading-5 tracking-[0.8px] hover:bg-white/10 rounded-sm transition-colors">
            DASHBOARD
          </button>
        </nav>
      </div>

      {/* Utility Section */}
      <div className="flex items-center gap-2">
        {/* Search Box */}
        <div className="flex items-center gap-2">
          <div className="bg-[rgba(40,48,55,0.32)] rounded-sm px-1.5 py-0.5 min-w-[108px] max-w-[160px] flex items-center gap-1">
            <span className="text-[#f3f6f8] text-xs leading-[14px] tracking-[0.8px] flex-1">
              Search
            </span>
            <Search className="w-4 h-4 text-[#f3f6f8]" />
          </div>
          <div className="h-2.5 w-px bg-white/20" />
        </div>

        {/* Menu Buttons */}
        <button className="px-1.5 py-0.5 hover:bg-white/10 rounded-sm transition-colors">
          <Menu className="w-4 h-4 text-[#f3f6f8]" />
        </button>
        <button className="px-1.5 py-0.5 hover:bg-white/10 rounded-sm transition-colors">
          <Menu className="w-4 h-4 text-[#f3f6f8]" />
        </button>

        {/* Divider */}
        <div className="h-2.5 w-px bg-white/20" />

        {/* Time Display */}
        <button className="px-1.5 py-0.5 text-[#f3f6f8] text-xs leading-[14px] tracking-[0.8px] hover:bg-white/10 rounded-sm transition-colors">
          접속 시간 (03:57)
        </button>

        {/* Divider */}
        <div className="h-2.5 w-px bg-white/20" />

        {/* Profile */}
        <button className="px-1.5 py-0.5 hover:bg-white/10 rounded-sm transition-colors">
          <Menu className="w-4 h-4 text-[#f3f6f8]" />
        </button>
      </div>
    </header>
  );
}
