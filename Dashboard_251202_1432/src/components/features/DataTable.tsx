export default function DataTable() {
  const sampleData = [
    {
      no: "1",
      subarea: "CVD",
      stepSeq: "CD043210",
      stepDesc: "1.2 ABC QWE DCD",
      rcpId: "ABCDE321",
      rcpGroup: "AB_EFGH",
      rmModel: "ABCDEF_A",
      ecModel: "ARC_ARCDEF_A",
      eqps: ["ABCD123", "ABCD123", "ABCD123", "ABCD123", "ABCD123", "ABCD123", "ABCD123", "ABCD123", "ABCD123"]
    },
    {
      no: "2",
      subarea: "CVD",
      stepSeq: "CD043211",
      stepDesc: "1.3 DEF XYZ PQR",
      rcpId: "ABCDE322",
      rcpGroup: "AB_EFGH",
      rmModel: "ABCDEF_A",
      ecModel: "ARC_ARCDEF_A",
      eqps: ["ABCD123", "ABCD123", "ABCD123", "ABCD123", "ABCD123", "ABCD123", "ABCD123", "ABCD123", "ABCD123"]
    },
    {
      no: "3",
      subarea: "CVD",
      stepSeq: "CD043212",
      stepDesc: "1.4 GHI XYZ ABC",
      rcpId: "ABCDE323",
      rcpGroup: "AB_EFGH",
      rmModel: "ABCDEF_A",
      ecModel: "ARC_ARCDEF_A",
      eqps: ["ABCD123", "ABCD123", "ABCD123", "ABCD123", "ABCD123", "ABCD123", "ABCD123", "ABCD123", "ABCD123"]
    },
    {
      no: "4",
      subarea: "CVD",
      stepSeq: "CD043213",
      stepDesc: "1.5 JKL MNO PQR",
      rcpId: "ABCDE324",
      rcpGroup: "AB_EFGH",
      rmModel: "ABCDEF_A",
      ecModel: "ARC_ARCDEF_A",
      eqps: ["ABCD123", "ABCD123", "ABCD123", "ABCD123", "ABCD123", "ABCD123", "ABCD123", "ABCD123", "ABCD123"]
    },
    {
      no: "5",
      subarea: "CVD",
      stepSeq: "CD043214",
      stepDesc: "1.6 STU VWX YZA",
      rcpId: "ABCDE325",
      rcpGroup: "AB_EFGH",
      rmModel: "ABCDEF_A",
      ecModel: "ARC_ARCDEF_A",
      eqps: ["ABCD123", "ABCD123", "ABCD123", "ABCD123", "ABCD123", "ABCD123", "ABCD123", "ABCD123", "ABCD123"]
    }
  ];

  const legendItems = [
    { color: "#ffffff", label: "표준등록설비" },
    { color: "#ccf0f9", label: "표준등록설비(타라인)" },
    { color: "#ccd3f1", label: "HCCB진행중 설비" },
    { color: "#d4f1d7", label: "ECO진행중 설비" },
    { color: "#ffe9c8", label: "ECO만료/표준가능 설비" },
    { color: "#ffd9d7", label: "미확산 설비" }
  ];

  const getRandomCellColor = () => {
    const colors = ["#ffffff", "#ccf0f9", "#ccd3f1", "#d4f1d7", "#ffe9c8", "#ffd9d7"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="px-3 py-0">
      <div className="flex gap-px items-center h-5 mb-7">
        <div className="flex gap-2.5 items-center justify-center">
          <p className="text-[#767d84] text-[12px] leading-[14px] tracking-[0.8px] whitespace-nowrap">
            ※EQP ID를 클릭하면 YMS ECO Analysis로 이동합니다
          </p>
        </div>

        <div className="flex gap-2.5 items-center justify-center w-[13px]">
          <div className="bg-[#ccd1d6] h-2.5 w-px" />
        </div>

        <div className="flex gap-2 items-center justify-end">
          {legendItems.map((item, index) => (
            <div key={index} className="flex gap-1 items-center">
              <div
                className="w-2.5 h-2.5 border border-[#dadfe4]"
                style={{ backgroundColor: item.color }}
              />
              <p className="text-[#565e66] text-[11px] leading-3 tracking-[0.8px]">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <div className="flex gap-2.5 items-center justify-center w-[13px]">
          <div className="bg-[#ccd1d6] h-2.5 w-px" />
        </div>

        <div className="bg-white border border-[#dadfe4] flex items-start rounded-[2px]">
          <div className="flex gap-1 items-center px-1.5 py-0">
            <div className="flex gap-2.5 items-center py-[3px]">
              <p className="text-[#384047] text-[12px] leading-[14px] tracking-[0.8px]">
                칼럼 설정
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <table className="border-collapse">
            <thead>
              <tr>
                <th className="bg-[#f6f8f9] border border-[#dadfe4] px-2 py-1 text-left w-[36px]">
                  <p className="text-[#565e66] text-[11px] font-bold leading-4 tracking-[0.8px]">No.</p>
                </th>
                <th className="bg-[#f6f8f9] border border-[#dadfe4] px-2 py-1 text-left w-[75px]">
                  <p className="text-[#565e66] text-[11px] font-bold leading-4 tracking-[0.8px]">Sub area</p>
                </th>
                <th className="bg-[#f6f8f9] border border-[#dadfe4] px-2 py-1 text-left w-[100px]">
                  <p className="text-[#565e66] text-[11px] font-bold leading-4 tracking-[0.8px]">Step Seq</p>
                </th>
                <th className="bg-[#f6f8f9] border border-[#dadfe4] px-2 py-1 text-left w-[140px]">
                  <p className="text-[#565e66] text-[11px] font-bold leading-4 tracking-[0.8px]">Step Desc</p>
                </th>
                <th className="bg-[#f6f8f9] border border-[#dadfe4] px-2 py-1 text-left w-[80px]">
                  <p className="text-[#565e66] text-[11px] font-bold leading-4 tracking-[0.8px]">Recipe ID</p>
                </th>
                <th className="bg-[#f6f8f9] border border-[#dadfe4] px-2 py-1 text-left w-[90px]">
                  <p className="text-[#565e66] text-[11px] font-bold leading-4 tracking-[0.8px]">PRC group</p>
                </th>
                <th className="bg-[#f6f8f9] border border-[#dadfe4] px-2 py-1 text-left w-[90px]">
                  <p className="text-[#565e66] text-[11px] font-bold leading-4 tracking-[0.8px]">RM Model</p>
                </th>
                <th className="bg-[#f6f8f9] border border-[#dadfe4] px-2 py-1 text-left w-[120px]">
                  <p className="text-[#565e66] text-[11px] font-bold leading-4 tracking-[0.8px]">EC Model</p>
                </th>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <th key={num} className="bg-[#f6f8f9] border border-[#dadfe4] px-2 py-1 text-left w-[76px]">
                    <p className="text-[#565e66] text-[11px] font-bold leading-4 tracking-[0.8px]">EQP ID {num}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sampleData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="bg-white border border-[#e4e9ed] px-2 py-0.5">
                    <p className="text-[#384047] text-[11px] leading-4 tracking-[0.8px]">{row.no}</p>
                  </td>
                  <td className="bg-white border border-[#e4e9ed] px-2 py-0.5">
                    <p className="text-[#384047] text-[11px] leading-4 tracking-[0.8px]">{row.subarea}</p>
                  </td>
                  <td className="bg-white border border-[#e4e9ed] px-2 py-0.5">
                    <p className="text-[#384047] text-[11px] leading-4 tracking-[0.8px]">{row.stepSeq}</p>
                  </td>
                  <td className="bg-white border border-[#e4e9ed] px-2 py-0.5">
                    <p className="text-[#384047] text-[11px] leading-4 tracking-[0.8px]">{row.stepDesc}</p>
                  </td>
                  <td className="bg-white border border-[#e4e9ed] px-2 py-0.5">
                    <p className="text-[#384047] text-[11px] leading-4 tracking-[0.8px]">{row.rcpId}</p>
                  </td>
                  <td className="bg-white border border-[#e4e9ed] px-2 py-0.5">
                    <p className="text-[#384047] text-[11px] leading-4 tracking-[0.8px]">{row.rcpGroup}</p>
                  </td>
                  <td className="bg-white border border-[#e4e9ed] px-2 py-0.5">
                    <p className="text-[#384047] text-[11px] leading-4 tracking-[0.8px]">{row.rmModel}</p>
                  </td>
                  <td className="bg-white border border-[#e4e9ed] px-2 py-0.5">
                    <p className="text-[#384047] text-[11px] leading-4 tracking-[0.8px]">{row.ecModel}</p>
                  </td>
                  {row.eqps.map((eqp, eqpIndex) => (
                    <td
                      key={eqpIndex}
                      className="border border-[#e4e9ed] px-2 py-0.5"
                      style={{ backgroundColor: getRandomCellColor() }}
                    >
                      <p className="text-[#384047] text-[11px] leading-4 tracking-[0.8px] cursor-pointer hover:underline">
                        {eqp}
                      </p>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
