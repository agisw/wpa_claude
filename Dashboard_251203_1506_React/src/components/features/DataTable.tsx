export default function DataTable() {
  // Sample data
  const rows = [
    { no: '1', subarea: 'CVD', stepSeq: '100', stepDesc: 'Step A', rcpId: 'RCP001', rcpGroup: 'Group A', rmModel: 'Model 1', ecModel: 'EC Model A', eqps: ['EQP-A01', 'EQP-A02', 'EQP-A03', 'EQP-A04', 'EQP-A05', 'EQP-A06', 'EQP-A07', 'EQP-A08', 'EQP-A09'] },
    { no: '2', subarea: 'PVD', stepSeq: '200', stepDesc: 'Step B', rcpId: 'RCP002', rcpGroup: 'Group B', rmModel: 'Model 2', ecModel: 'EC Model B', eqps: ['EQP-B01', 'EQP-B02', 'EQP-B03', 'EQP-B04', 'EQP-B05', 'EQP-B06', 'EQP-B07', 'EQP-B08', 'EQP-B09'] },
    { no: '3', subarea: 'ETCH', stepSeq: '300', stepDesc: 'Step C', rcpId: 'RCP003', rcpGroup: 'Group C', rmModel: 'Model 3', ecModel: 'EC Model C', eqps: ['EQP-C01', 'EQP-C02', 'EQP-C03', 'EQP-C04', 'EQP-C05', 'EQP-C06', 'EQP-C07', 'EQP-C08', 'EQP-C09'] },
    { no: '4', subarea: 'PHOTO', stepSeq: '400', stepDesc: 'Step D', rcpId: 'RCP004', rcpGroup: 'Group D', rmModel: 'Model 4', ecModel: 'EC Model D', eqps: ['EQP-D01', 'EQP-D02', 'EQP-D03', 'EQP-D04', 'EQP-D05', 'EQP-D06', 'EQP-D07', 'EQP-D08', 'EQP-D09'] },
    { no: '5', subarea: 'IMP', stepSeq: '500', stepDesc: 'Step E', rcpId: 'RCP005', rcpGroup: 'Group E', rmModel: 'Model 5', ecModel: 'EC Model E', eqps: ['EQP-E01', 'EQP-E02', 'EQP-E03', 'EQP-E04', 'EQP-E05', 'EQP-E06', 'EQP-E07', 'EQP-E08', 'EQP-E09'] },
  ];

  return (
    <div className="bg-white p-3 flex-1 overflow-hidden flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-2 text-xs">
        <div className="flex items-center gap-1 text-[#565e66]">
          <span>사용자: 홍길동</span>
          <div className="h-2.5 w-px bg-[#283037]" />

          {/* Legends */}
          <div className="flex items-center gap-2 ml-2">
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 bg-[#3392d3] rounded-sm" />
              <span className="text-xs leading-3">표준등록설비</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 bg-[#7ec8e3] rounded-sm" />
              <span className="text-xs leading-3">표준등록설비(타라인)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 bg-[#ffd966] rounded-sm" />
              <span className="text-xs leading-3">HCCB진행중 설비</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 bg-[#f4b183] rounded-sm" />
              <span className="text-xs leading-3">ECO진행중 설비</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 bg-[#c5e0b4] rounded-sm" />
              <span className="text-xs leading-3">ECO만료/표준가능 설비</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 bg-[#e4e9ed] rounded-sm" />
              <span className="text-xs leading-3">미확산 설비</span>
            </div>
          </div>

          <div className="h-2.5 w-px bg-[#283037] ml-2" />
        </div>

        <button className="px-2 py-0.5 bg-white border border-[#dadfe4] text-[#384047] text-xs rounded-sm hover:bg-gray-50 transition-colors">
          내보내기
        </button>
      </div>

      {/* Table Container */}
      <div className="flex-1 overflow-auto border border-[#dadfe4] rounded">
        <table className="w-full text-xs">
          <thead className="bg-[#f3f6f8] sticky top-0">
            <tr>
              <th className="border-r border-[#dadfe4] px-2 py-1.5 text-left font-bold text-[#384047] w-[36px]">No</th>
              <th className="border-r border-[#dadfe4] px-2 py-1.5 text-left font-bold text-[#384047] w-[75px]">Subarea</th>
              <th className="border-r border-[#dadfe4] px-2 py-1.5 text-left font-bold text-[#384047] w-[100px]">Step Seq</th>
              <th className="border-r border-[#dadfe4] px-2 py-1.5 text-left font-bold text-[#384047] w-[140px]">Step Desc</th>
              <th className="border-r border-[#dadfe4] px-2 py-1.5 text-left font-bold text-[#384047] w-[80px]">RCP ID</th>
              <th className="border-r border-[#dadfe4] px-2 py-1.5 text-left font-bold text-[#384047] w-[90px]">RCP group</th>
              <th className="border-r border-[#dadfe4] px-2 py-1.5 text-left font-bold text-[#384047] w-[90px]">RM Model</th>
              <th className="border-r border-[#dadfe4] px-2 py-1.5 text-left font-bold text-[#384047] w-[120px]">EC Model</th>
              {/* Equipment columns */}
              {Array.from({ length: 9 }, (_, i) => (
                <th key={i} className="border-r border-[#dadfe4] px-2 py-1.5 text-left font-bold text-[#384047] w-[76px]">
                  EQP ID {i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} className="border-t border-[#dadfe4] hover:bg-[#f9fafb]">
                <td className="border-r border-[#dadfe4] px-2 py-1 text-center">{row.no}</td>
                <td className="border-r border-[#dadfe4] px-2 py-1">{row.subarea}</td>
                <td className="border-r border-[#dadfe4] px-2 py-1">{row.stepSeq}</td>
                <td className="border-r border-[#dadfe4] px-2 py-1">{row.stepDesc}</td>
                <td className="border-r border-[#dadfe4] px-2 py-1">{row.rcpId}</td>
                <td className="border-r border-[#dadfe4] px-2 py-1">{row.rcpGroup}</td>
                <td className="border-r border-[#dadfe4] px-2 py-1">{row.rmModel}</td>
                <td className="border-r border-[#dadfe4] px-2 py-1">{row.ecModel}</td>
                {row.eqps.map((eqp, eqpIdx) => (
                  <td key={eqpIdx} className="border-r border-[#dadfe4] px-2 py-1 bg-[#e8f4f8]">
                    {eqp}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
