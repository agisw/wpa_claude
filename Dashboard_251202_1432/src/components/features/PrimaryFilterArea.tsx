export default function PrimaryFilterArea() {
  return (
    <div className="relative px-3 py-0">
      <div className="flex gap-2 items-start pt-12">
        <p className="text-[#384047] text-[20px] font-bold leading-6 tracking-[0.8px]">
          동종확산 Dashboard
        </p>
      </div>

      <div className="bg-[#dadfe4] h-px w-full mt-8" />

      <div className="flex items-end mt-2">
        <div className="flex gap-2 items-end">
          <div className="flex flex-col gap-0.5 items-start">
            <p className="text-[#565e66] text-[12px] font-bold leading-5 tracking-[0.8px]">
              Line<span className="text-[#ff4337]">*</span>
            </p>
            <div className="flex items-start px-0 py-0 rounded-[2px] w-[120px] min-w-[120px] max-w-[160px]">
              <div className="flex flex-1 flex-col gap-1 items-start">
                <div className="bg-white border border-[#dadfe4] flex gap-1 items-start px-1.5 py-0 rounded-[2px] w-full">
                  <div className="flex flex-1 gap-2.5 items-center px-0 py-0.5">
                    <p className="flex-1 text-[#384047] text-[14px] leading-5 tracking-[0.8px] whitespace-nowrap overflow-hidden text-ellipsis">
                      A1_ABCD
                    </p>
                  </div>
                  <div className="flex gap-0.5 items-center px-0 py-1">
                    <div className="rounded-[2px] w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-0.5 items-start">
            <p className="text-[#565e66] text-[12px] font-bold leading-5 tracking-[0.8px]">
              Sub area
            </p>
            <div className="flex items-start px-0 py-0 rounded-[2px] w-[120px] min-w-[120px] max-w-[160px]">
              <div className="flex flex-1 flex-col gap-1 items-start">
                <div className="bg-white border border-[#dadfe4] flex gap-1 items-start px-1.5 py-0 rounded-[2px] w-full">
                  <div className="flex flex-1 gap-2.5 items-center px-0 py-0.5">
                    <p className="flex-1 text-[#384047] text-[14px] leading-5 tracking-[0.8px] whitespace-nowrap overflow-hidden text-ellipsis">
                      CVD
                    </p>
                  </div>
                  <div className="flex gap-0.5 items-center px-0 py-1">
                    <div className="rounded-[2px] w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-0.5 items-start">
            <p className="text-[#565e66] text-[12px] font-bold leading-5 tracking-[0.8px]">
              Design rule<span className="text-[#ff4337]">*</span>
            </p>
            <div className="flex items-start px-0 py-0 rounded-[2px] w-[120px] min-w-[120px] max-w-[160px]">
              <div className="flex flex-1 flex-col gap-1 items-start">
                <div className="bg-white border border-[#dadfe4] flex gap-1 items-start px-1.5 py-0 rounded-[2px] w-full">
                  <div className="flex flex-1 gap-2.5 items-center px-0 py-0.5">
                    <p className="flex-1 text-[#384047] text-[14px] leading-5 tracking-[0.8px] whitespace-nowrap overflow-hidden text-ellipsis">
                      ABC12
                    </p>
                  </div>
                  <div className="flex gap-0.5 items-center px-0 py-1">
                    <div className="rounded-[2px] w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-0.5 items-start">
            <p className="text-[#565e66] text-[12px] font-bold leading-5 tracking-[0.8px]">
              Process ID<span className="text-[#ff4337]">*</span>
            </p>
            <div className="flex items-start px-0 py-0 rounded-[2px] w-[120px] min-w-[120px] max-w-[160px]">
              <div className="flex flex-1 flex-col gap-1 items-start">
                <div className="bg-white border border-[#dadfe4] flex gap-1 items-start px-1.5 py-0 rounded-[2px] w-full">
                  <div className="flex flex-1 gap-2.5 items-center px-0 py-0.5">
                    <p className="flex-1 text-[#384047] text-[14px] leading-5 tracking-[0.8px] whitespace-nowrap overflow-hidden text-ellipsis">
                      EFGH
                    </p>
                  </div>
                  <div className="flex gap-0.5 items-center px-0 py-1">
                    <div className="rounded-[2px] w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-0.5 items-start">
            <p className="text-[#565e66] text-[12px] font-bold leading-5 tracking-[0.8px]">
              PRC group<span className="text-[#ff4337]">*</span>
            </p>
            <div className="flex items-start px-0 py-0 rounded-[2px] w-[250px]">
              <div className="flex flex-1 flex-col gap-1 items-start px-0 py-0">
                <div className="bg-white border border-[#dadfe4] flex gap-1 items-start px-1.5 py-0 rounded-[2px] w-full">
                  <div className="flex flex-1 gap-2.5 items-center px-0 py-0.5">
                    <p className="flex-1 text-[#384047] text-[14px] leading-5 tracking-[0.8px] whitespace-nowrap overflow-hidden text-ellipsis">
                      AB12345CD:EFGHJKLMNOPR25
                    </p>
                  </div>
                  <div className="flex gap-0.5 items-center px-0 py-1">
                    <div className="rounded-[2px] w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-0.5 items-start">
            <p className="text-[#565e66] text-[12px] font-bold leading-5 tracking-[0.8px]">
              Step seq
            </p>
            <div className="flex items-start px-0 py-0 rounded-[2px] w-[332px]">
              <div className="flex flex-1 flex-col gap-1 items-start">
                <div className="bg-white border border-[#dadfe4] flex gap-1 items-start px-1.5 py-0 rounded-[2px] w-full">
                  <div className="flex flex-1 gap-2.5 items-center px-0 py-0.5">
                    <p className="flex-1 text-[#384047] text-[14px] leading-5 tracking-[0.8px] whitespace-nowrap overflow-hidden text-ellipsis">
                      AB12345CD:EFGHIJKLMNOPQRSTUV123435
                    </p>
                  </div>
                  <div className="flex gap-0.5 items-center px-0 py-1">
                    <div className="rounded-[2px] w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[max-content] grid-rows-[max-content] inline-grid justify-items-start ml-auto">
          <div className="flex gap-1.5 items-center ml-3 mt-0">
            <div className="bg-[#3392d3] flex items-start rounded-[2px]">
              <div className="flex gap-1 h-6 items-center justify-center px-2 py-0 w-11">
                <p className="text-white text-[14px] font-bold leading-5 tracking-[0.8px]">
                  검색
                </p>
              </div>
            </div>
            <div className="bg-white border border-[#dadfe4] flex items-start rounded-[2px]">
              <div className="flex gap-1 items-center px-2 py-0.5">
                <p className="text-[#384047] text-[14px] leading-5 tracking-[0.8px]">
                  조건 저장
                </p>
              </div>
            </div>
            <div className="bg-white border border-[#dadfe4] flex items-start rounded-[2px]">
              <div className="flex gap-1 items-center px-2 py-0.5">
                <p className="text-[#384047] text-[14px] leading-5 tracking-[0.8px]">
                  조건 불러오기
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute h-3 left-1/2 top-[147px] translate-x-[-50%] w-[61.714px]">
        <div className="bg-white border border-[#e4e9ed] h-3 w-[60px] rounded-sm" />
        <div className="absolute bg-[#edf2f4] bottom-0 h-px left-px w-[58px]" />
        <div className="absolute left-[calc(50%-0.36px)] w-[5px] h-[5px] top-1 translate-x-[-50%]">
          <div className="text-[#565e66]">▲</div>
        </div>
      </div>
    </div>
  );
}
