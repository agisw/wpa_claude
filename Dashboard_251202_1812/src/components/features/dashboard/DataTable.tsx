import { FileDown } from 'lucide-react';

const tableData = [
  {
    no: '1',
    subarea: 'CVD',
    stepSeq: 'CD043210',
    stepDesc: '1.2 ABC QWE DCD',
    rcpId: 'ABCDE321',
    rcpGroup: 'AB_EFGH',
    rmModel: 'ABCDEF_A',
    ecModel: 'ARC_ARCDEF_A',
    eqps: Array(9).fill('ABC0123'),
  },
  {
    no: '2',
    subarea: 'CVD',
    stepSeq: 'CD063211',
    stepDesc: '1.3 FGH IJK LMN',
    rcpId: 'ABCDE322',
    rcpGroup: 'AB_EFGH',
    rmModel: 'ABCDEF_A',
    ecModel: 'ARC_ARCDEF_A',
    eqps: Array(9).fill('ABC0123'),
  },
  {
    no: '3',
    subarea: 'CVD',
    stepSeq: 'CD043212',
    stepDesc: '1.4 GHI XYZ ABC',
    rcpId: 'ABCDE323',
    rcpGroup: 'AB_EFGH',
    rmModel: 'ABCDEF_A',
    ecModel: 'ARC_ARCDEF_A',
    eqps: Array(9).fill('ABC0123'),
  },
  {
    no: '4',
    subarea: 'CVD',
    stepSeq: 'CD043213',
    stepDesc: '1.5 JKL MNO PQR',
    rcpId: 'ABCDE324',
    rcpGroup: 'AB_EFGH',
    rmModel: 'ABCDEF_A',
    ecModel: 'ARC_ARCDEF_A',
    eqps: Array(9).fill('ABC0123'),
  },
  {
    no: '5',
    subarea: 'CVD',
    stepSeq: 'CD043214',
    stepDesc: '1.6 STU VWX YZA',
    rcpId: 'ABCDE325',
    rcpGroup: 'AB_EFGH',
    rmModel: 'ABCDEF_A',
    ecModel: 'ARC_ARCDEF_A',
    eqps: Array(9).fill('ABC0123'),
  },
];

export default function DataTable() {
  return (
    <div className="px-3 flex-1 flex flex-col">
      {/* Toolbar */}
      <div className="h-5 flex items-center justify-between mb-1">
        {/* Left side - Info text and legends */}
        <div className="flex items-center gap-3 text-[11px] leading-3 tracking-[0.8px] text-[#565e66]">
          <span>사용자:</span>
          <div className="h-2.5 w-px bg-[#ccd1d6]" />
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 bg-[#ccf3ef] rounded-sm" />
              <span className="text-[11px]">표준등록설비</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 bg-[#ffd9d7] rounded-sm" />
              <span className="text-[11px]">표준등록설비(타라인)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 bg-[#fff4cc] rounded-sm" />
              <span className="text-[11px]">HCCB진행중 설비</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 bg-[#ffeacc] rounded-sm" />
              <span className="text-[11px]">ECO진행중 설비</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 bg-[#e4e9ed] rounded-sm" />
              <span className="text-[11px]">ECO만료/표준가능 설비</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 bg-white border border-[#dadfe4] rounded-sm" />
              <span className="text-[11px]">미확산 설비</span>
            </div>
          </div>
          <div className="h-2.5 w-px bg-[#ccd1d6]" />
        </div>

        {/* Right side - Export button */}
        <button className="bg-white border border-[#dadfe4] flex items-center gap-1 px-2 h-5 rounded-sm text-sm leading-5 tracking-[0.8px] text-[#384047] hover:bg-gray-50">
          <FileDown className="w-4 h-4" />
          <span>엑셀</span>
        </button>
      </div>

      {/* Data Table */}
      <div className="flex-1 overflow-auto border border-[#dadfe4] rounded">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-[#e4e9ed]">
              <th className="border border-[#dadfe4] px-1 py-1 text-center font-bold text-[#384047] w-[36px]">No.</th>
              <th className="border border-[#dadfe4] px-1 py-1 text-center font-bold text-[#384047] w-[75px]">Sub area</th>
              <th className="border border-[#dadfe4] px-1 py-1 text-center font-bold text-[#384047] w-[100px]">Step Seq</th>
              <th className="border border-[#dadfe4] px-1 py-1 text-center font-bold text-[#384047] w-[140px]">Step Desc</th>
              <th className="border border-[#dadfe4] px-1 py-1 text-center font-bold text-[#384047] w-[80px]">RCP ID</th>
              <th className="border border-[#dadfe4] px-1 py-1 text-center font-bold text-[#384047] w-[90px]">RCP group</th>
              <th className="border border-[#dadfe4] px-1 py-1 text-center font-bold text-[#384047] w-[90px]">RM Model</th>
              <th className="border border-[#dadfe4] px-1 py-1 text-center font-bold text-[#384047] w-[120px]">EC Model</th>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <th key={i} className="border border-[#dadfe4] px-1 py-1 text-center font-bold text-[#384047] w-[76px]">
                  EQP ID {i}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.no} className="hover:bg-gray-50">
                <td className="border border-[#dadfe4] px-1 py-0.5 text-center text-[#384047]">{row.no}</td>
                <td className="border border-[#dadfe4] px-1 py-0.5 text-center text-[#384047]">{row.subarea}</td>
                <td className="border border-[#dadfe4] px-1 py-0.5 text-center text-[#384047]">{row.stepSeq}</td>
                <td className="border border-[#dadfe4] px-1 py-0.5 text-left text-[#384047]">{row.stepDesc}</td>
                <td className="border border-[#dadfe4] px-1 py-0.5 text-center text-[#384047]">{row.rcpId}</td>
                <td className="border border-[#dadfe4] px-1 py-0.5 text-center text-[#384047]">{row.rcpGroup}</td>
                <td className="border border-[#dadfe4] px-1 py-0.5 text-center text-[#384047]">{row.rmModel}</td>
                <td className="border border-[#dadfe4] px-1 py-0.5 text-center text-[#384047]">{row.ecModel}</td>
                {row.eqps.map((eqp, idx) => (
                  <td
                    key={idx}
                    className="border border-[#dadfe4] px-1 py-0.5 text-center text-[#ff4337] bg-[#ffd9d7]"
                  >
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
