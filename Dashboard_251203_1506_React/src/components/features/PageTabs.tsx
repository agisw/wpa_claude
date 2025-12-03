import { X, Plus, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

export default function PageTabs() {
  const tabs = [
    { id: 1, title: '동종확산 Dashboard', active: true },
    { id: 2, title: 'Analysis View', active: false },
    { id: 3, title: 'Report', active: false },
  ];

  return (
    <div className="bg-white border-t border-[#dadfe4] h-6 flex items-center px-3 gap-1">
      {/* Tabs */}
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`
            flex items-center gap-1 px-2 py-0.5 rounded-sm text-xs leading-5 tracking-[0.8px] cursor-pointer
            ${tab.active ? 'bg-[#e8f4f8] text-[#384047] font-bold' : 'text-[#565e66] hover:bg-gray-100'}
          `}
        >
          <span>{tab.title}</span>
          {tab.active && (
            <button className="hover:bg-[#d0e8f0] rounded-sm p-0.5">
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      ))}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Tab Controls */}
      <div className="flex items-center gap-0.5">
        <button className="p-0.5 hover:bg-gray-100 rounded-sm">
          <ChevronLeft className="w-4 h-4 text-[#565e66]" />
        </button>
        <button className="p-0.5 hover:bg-gray-100 rounded-sm">
          <ChevronRight className="w-4 h-4 text-[#565e66]" />
        </button>
        <button className="p-0.5 hover:bg-gray-100 rounded-sm">
          <MoreHorizontal className="w-4 h-4 text-[#565e66]" />
        </button>
        <button className="p-0.5 hover:bg-gray-100 rounded-sm">
          <Plus className="w-4 h-4 text-[#565e66]" />
        </button>
      </div>
    </div>
  );
}
