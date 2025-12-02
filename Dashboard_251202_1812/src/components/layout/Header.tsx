export default function Header() {
  return (
    <header className="bg-[#384047] flex items-center justify-between px-3 h-10 shadow-[0px_0px_2px_0px_rgba(40,48,55,0.12),0px_1px_2px_0px_rgba(40,48,55,0.12)]">
      <div className="flex items-center gap-2">
        {/* Logo */}
        <div className="pr-2">
          <p className="text-white text-[19px] font-bold leading-6 tracking-[0.8px]">
            MBP
          </p>
        </div>

        {/* Divider */}
        <div className="h-2.5 w-px bg-white opacity-20" />

        {/* Navigation */}
        <div className="flex items-center gap-0">
          <button className="px-1.5 py-2 text-white text-sm font-bold leading-5 tracking-[0.8px] rounded-sm hover:bg-white/10">
            CONTENTS
          </button>
          <button className="px-1.5 py-2 text-white text-sm font-bold leading-5 tracking-[0.8px] rounded-sm hover:bg-white/10">
            WIDGET STORE
          </button>
          <button className="px-1.5 py-2 text-white text-sm font-bold leading-5 tracking-[0.8px] rounded-sm hover:bg-white/10">
            DASHBOARD
          </button>
        </div>
      </div>

      {/* Right side utilities */}
      <div className="flex items-center gap-2">
        {/* Search box */}
        <div className="flex items-center gap-1">
          <div className="bg-[rgba(40,48,55,0.32)] rounded-sm px-1.5 py-0.5 min-w-[108px]">
            <p className="text-[#f3f6f8] text-xs leading-[14px] tracking-[0.8px]">
              Search
            </p>
          </div>
          <div className="h-2.5 w-px bg-white opacity-20" />
        </div>

        {/* Menu buttons */}
        <button className="px-1.5 py-0.5 text-[#f3f6f8] text-xs leading-[14px] tracking-[0.8px] hover:bg-white/10 rounded-sm">
          button
        </button>
        <button className="px-1.5 py-0.5 text-[#f3f6f8] text-xs leading-[14px] tracking-[0.8px] hover:bg-white/10 rounded-sm">
          button
        </button>

        {/* Divider */}
        <div className="h-2.5 w-px bg-white opacity-20" />

        {/* Clock */}
        <div className="px-1.5 py-0.5">
          <p className="text-[#f3f6f8] text-xs leading-[14px] tracking-[0.8px]">
            접속 시간 (03:57)
          </p>
        </div>

        {/* Divider */}
        <div className="h-2.5 w-px bg-white opacity-20" />

        {/* Profile */}
        <button className="px-1.5 py-0.5 text-[#f3f6f8] text-xs leading-[14px] tracking-[0.8px] hover:bg-white/10 rounded-sm">
          button
        </button>
      </div>
    </header>
  );
}
