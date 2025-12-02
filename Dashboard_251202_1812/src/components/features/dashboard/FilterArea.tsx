import { ChevronDown } from 'lucide-react';

export default function FilterArea() {
  return (
    <div className="px-3 py-3">
      {/* Page Header */}
      <div className="mb-2">
        <h1 className="text-[20px] font-bold leading-6 tracking-[0.8px] text-[#384047]">
          동종확산 Dashboard
        </h1>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#dadfe4] mb-3" />

      {/* Filters */}
      <div className="flex items-end gap-2">
        {/* Filter Fields */}
        <div className="flex gap-2">
          {/* Line */}
          <div className="flex flex-col gap-0.5">
            <label className="text-xs font-bold leading-5 tracking-[0.8px] text-[#565e66]">
              Line<span className="text-[#ff4337]">*</span>
            </label>
            <div className="w-[120px] bg-white border border-[#dadfe4] rounded-sm px-1.5 py-0.5 flex items-center justify-between">
              <span className="text-sm leading-5 tracking-[0.8px] text-[#384047]">A1_ABCD</span>
              <ChevronDown className="w-4 h-4 text-[#b2b6bb]" />
            </div>
          </div>

          {/* Sub area */}
          <div className="flex flex-col gap-0.5">
            <label className="text-xs font-bold leading-5 tracking-[0.8px] text-[#565e66]">
              Sub area
            </label>
            <div className="w-[120px] bg-white border border-[#dadfe4] rounded-sm px-1.5 py-0.5 flex items-center justify-between">
              <span className="text-sm leading-5 tracking-[0.8px] text-[#384047]">CVD</span>
              <ChevronDown className="w-4 h-4 text-[#b2b6bb]" />
            </div>
          </div>

          {/* Design rule */}
          <div className="flex flex-col gap-0.5">
            <label className="text-xs font-bold leading-5 tracking-[0.8px] text-[#565e66]">
              Design rule<span className="text-[#ff4337]">*</span>
            </label>
            <div className="w-[120px] bg-white border border-[#dadfe4] rounded-sm px-1.5 py-0.5 flex items-center justify-between">
              <span className="text-sm leading-5 tracking-[0.8px] text-[#384047]">ABC12</span>
              <ChevronDown className="w-4 h-4 text-[#b2b6bb]" />
            </div>
          </div>

          {/* Process ID */}
          <div className="flex flex-col gap-0.5">
            <label className="text-xs font-bold leading-5 tracking-[0.8px] text-[#565e66]">
              Process ID<span className="text-[#ff4337]">*</span>
            </label>
            <div className="w-[120px] bg-white border border-[#dadfe4] rounded-sm px-1.5 py-0.5 flex items-center justify-between">
              <span className="text-sm leading-5 tracking-[0.8px] text-[#384047]">EFGH</span>
              <ChevronDown className="w-4 h-4 text-[#b2b6bb]" />
            </div>
          </div>

          {/* PRC group */}
          <div className="flex flex-col gap-0.5">
            <label className="text-xs font-bold leading-5 tracking-[0.8px] text-[#565e66]">
              PRC group<span className="text-[#ff4337]">*</span>
            </label>
            <div className="w-[250px] bg-white border border-[#dadfe4] rounded-sm px-1.5 py-0.5 flex items-center justify-between">
              <span className="text-sm leading-5 tracking-[0.8px] text-[#384047] truncate">
                AB12345CD:EFGHJKLMNOPR25
              </span>
              <ChevronDown className="w-4 h-4 text-[#b2b6bb] flex-shrink-0" />
            </div>
          </div>

          {/* Step seq */}
          <div className="flex flex-col gap-0.5">
            <label className="text-xs font-bold leading-5 tracking-[0.8px] text-[#565e66]">
              Step seq
            </label>
            <div className="w-[332px] bg-white border border-[#dadfe4] rounded-sm px-1.5 py-0.5 flex items-center justify-between">
              <span className="text-sm leading-5 tracking-[0.8px] text-[#384047] truncate">
                AB12345CD:EFGHIJKLMNOPQRSTUV123435
              </span>
              <ChevronDown className="w-4 h-4 text-[#b2b6bb] flex-shrink-0" />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-1.5 ml-3">
          <div className="h-2.5 w-px bg-[#ccd1d6]" />
          <button className="bg-[#3392d3] text-white text-sm font-bold leading-5 tracking-[0.8px] px-2 h-6 rounded-sm hover:bg-[#2d7cb8]">
            검색
          </button>
          <button className="bg-white border border-[#dadfe4] text-[#384047] text-sm leading-5 tracking-[0.8px] px-2 py-0.5 rounded-sm hover:bg-gray-50">
            조건 저장
          </button>
          <button className="bg-white border border-[#dadfe4] text-[#384047] text-sm leading-5 tracking-[0.8px] px-2 py-0.5 rounded-sm hover:bg-gray-50">
            조건 불러오기
          </button>
        </div>
      </div>
    </div>
  );
}
