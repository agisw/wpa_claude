import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export default function FilterArea() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="bg-white px-3 py-3">
      {/* Page Header */}
      <div className="mb-2">
        <h2 className="text-[#384047] text-xl font-bold leading-6 tracking-[0.8px]">
          동종확산 Dashboard
        </h2>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#e4e9ed] mb-2" />

      {/* Filters */}
      {!isCollapsed && (
        <div className="flex items-end gap-2 mb-3">
          {/* Filter Fields */}
          <div className="flex gap-2 flex-1">
            {/* Line Filter */}
            <div className="flex flex-col gap-0.5">
              <label className="text-[#565e66] text-xs font-bold leading-5 tracking-[0.8px]">
                Line<span className="text-[#ff4337]">*</span>
              </label>
              <div className="min-w-[120px] max-w-[160px]">
                <select className="w-full px-1.5 py-0.5 border border-[#dadfe4] rounded-sm text-sm leading-5 tracking-[0.8px] text-[#384047] bg-white">
                  <option>A1_ABCD</option>
                </select>
              </div>
            </div>

            {/* Sub area Filter */}
            <div className="flex flex-col gap-0.5">
              <label className="text-[#565e66] text-xs font-bold leading-5 tracking-[0.8px]">
                Sub area
              </label>
              <div className="min-w-[120px] max-w-[160px]">
                <select className="w-full px-1.5 py-0.5 border border-[#dadfe4] rounded-sm text-sm leading-5 tracking-[0.8px] text-[#384047] bg-white">
                  <option>CVD</option>
                </select>
              </div>
            </div>

            {/* Design rule Filter */}
            <div className="flex flex-col gap-0.5">
              <label className="text-[#565e66] text-xs font-bold leading-5 tracking-[0.8px]">
                Design rule<span className="text-[#ff4337]">*</span>
              </label>
              <div className="min-w-[120px] max-w-[160px]">
                <select className="w-full px-1.5 py-0.5 border border-[#dadfe4] rounded-sm text-sm leading-5 tracking-[0.8px] text-[#384047] bg-white">
                  <option>ABC12</option>
                </select>
              </div>
            </div>

            {/* Process ID Filter */}
            <div className="flex flex-col gap-0.5">
              <label className="text-[#565e66] text-xs font-bold leading-5 tracking-[0.8px]">
                Process ID<span className="text-[#ff4337]">*</span>
              </label>
              <div className="min-w-[120px] max-w-[160px]">
                <select className="w-full px-1.5 py-0.5 border border-[#dadfe4] rounded-sm text-sm leading-5 tracking-[0.8px] text-[#384047] bg-white">
                  <option>EFGH</option>
                </select>
              </div>
            </div>

            {/* PRC group Filter */}
            <div className="flex flex-col gap-0.5">
              <label className="text-[#565e66] text-xs font-bold leading-5 tracking-[0.8px]">
                PRC group<span className="text-[#ff4337]">*</span>
              </label>
              <div className="w-[250px]">
                <select className="w-full px-1.5 py-0.5 border border-[#dadfe4] rounded-sm text-sm leading-5 tracking-[0.8px] text-[#384047] bg-white">
                  <option>AB12345CD:EFGHJKLMNOPR25</option>
                </select>
              </div>
            </div>

            {/* Step seq Filter */}
            <div className="flex flex-col gap-0.5">
              <label className="text-[#565e66] text-xs font-bold leading-5 tracking-[0.8px]">
                Step seq
              </label>
              <div className="w-[332px]">
                <select className="w-full px-1.5 py-0.5 border border-[#dadfe4] rounded-sm text-sm leading-5 tracking-[0.8px] text-[#384047] bg-white">
                  <option>AB12345CD:EFGHIJKLMNOPQRSTUV123435</option>
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 ml-auto">
            <div className="h-2.5 w-px bg-[#ccd1d6]" />
            <button className="px-2 py-0.5 bg-[#3392d3] text-white text-sm font-bold leading-5 tracking-[0.8px] rounded-sm hover:bg-[#2d7db8] transition-colors">
              검색
            </button>
            <button className="px-2 py-0.5 bg-white border border-[#dadfe4] text-[#384047] text-sm leading-5 tracking-[0.8px] rounded-sm hover:bg-gray-50 transition-colors">
              조건 저장
            </button>
            <button className="px-2 py-0.5 bg-white border border-[#dadfe4] text-[#384047] text-sm leading-5 tracking-[0.8px] rounded-sm hover:bg-gray-50 transition-colors">
              조건 불러오기
            </button>
          </div>
        </div>
      )}

      {/* Collapse Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center gap-1 px-2 py-0.5 hover:bg-gray-100 rounded-sm transition-colors"
        >
          <div className="h-px w-14 bg-[#ccd1d6]" />
          {isCollapsed ? (
            <ChevronDown className="w-3 h-3 text-[#565e66]" />
          ) : (
            <ChevronUp className="w-3 h-3 text-[#565e66]" />
          )}
          <div className="h-px w-14 bg-[#ccd1d6]" />
        </button>
      </div>
    </div>
  );
}
