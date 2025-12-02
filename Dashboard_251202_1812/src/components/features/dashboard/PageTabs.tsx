import { X, ChevronLeft, ChevronRight, Menu } from 'lucide-react';

export default function PageTabs() {
  return (
    <div className="h-6 flex items-center bg-[#e4e9ed] border-t border-[#dadfe4]">
      {/* Tab 1 - Inactive */}
      <div className="flex items-stretch h-6 border-l border-[#dadfe4]">
        <div className="bg-[#e4e9ed] flex items-center px-3 gap-2 border-t border-b border-[#dadfe4]">
          <span className="text-xs leading-[14px] tracking-[0.8px] text-[#767d84]">PEMS Main</span>
          <button className="hover:bg-black/5 p-0.5 rounded">
            <X className="w-4 h-4 text-[#767d84]" />
          </button>
        </div>
      </div>

      {/* Tab 2 - Active */}
      <div className="flex items-stretch h-6 border-l border-[#dadfe4]">
        <div className="bg-white flex items-center px-3 gap-2 border-t border-b border-[#dadfe4]">
          <span className="text-xs font-bold leading-5 tracking-[0.8px] text-[#3392d3]">
            동종확산 ECO Highway
          </span>
          <button className="hover:bg-black/5 p-0.5 rounded">
            <X className="w-4 h-4 text-[#3392d3]" />
          </button>
        </div>
        <div className="w-px bg-[#dadfe4]" />
      </div>

      {/* Empty space */}
      <div className="flex-1 bg-[#e4e9ed] border-t border-b border-[#dadfe4]" />

      {/* Navigation buttons */}
      <div className="flex items-stretch h-6">
        {/* Left arrow */}
        <div className="border-l border-[#dadfe4] flex items-center">
          <div className="bg-[#e4e9ed] w-[23px] h-6 flex items-center justify-center border-t border-b border-[#dadfe4]">
            <button className="hover:bg-black/5 p-0.5 rounded">
              <ChevronLeft className="w-4 h-4 text-[#b2b6bb]" />
            </button>
          </div>
        </div>

        {/* Right arrow */}
        <div className="border-l border-[#dadfe4] flex items-center">
          <div className="bg-[#e4e9ed] w-[23px] h-6 flex items-center justify-center border-t border-b border-[#dadfe4]">
            <button className="hover:bg-black/5 p-0.5 rounded">
              <ChevronRight className="w-4 h-4 text-[#b2b6bb]" />
            </button>
          </div>
        </div>

        {/* Menu button */}
        <div className="border-l border-[#dadfe4] flex items-center">
          <div className="bg-[#e4e9ed] w-[23px] h-6 flex items-center justify-center border-t border-b border-[#dadfe4]">
            <button className="hover:bg-black/5 p-0.5 rounded">
              <Menu className="w-4 h-4 text-[#b2b6bb]" />
            </button>
          </div>
        </div>

        {/* Close button */}
        <div className="border-l border-[#dadfe4] flex items-center">
          <div className="bg-[#e4e9ed] w-[23px] h-6 flex items-center justify-center border-t border-b border-[#dadfe4]">
            <button className="hover:bg-black/5 p-0.5 rounded">
              <X className="w-4 h-4 text-[#b2b6bb]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
