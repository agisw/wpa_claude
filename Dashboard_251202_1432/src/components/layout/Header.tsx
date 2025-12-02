export default function Header() {
  return (
    <div className="bg-[#384047] flex items-center justify-between px-3 py-0 h-10 shadow-[0px_0px_2px_0px_rgba(40,48,55,0.12),0px_1px_2px_0px_rgba(40,48,55,0.12)]">
      <div className="flex items-center">
        <div className="flex items-center pr-2">
          <div className="flex gap-1.5 items-center">
            <div className="flex flex-col items-start justify-end">
              <p className="text-white text-[19px] font-bold leading-6 tracking-[0.8px]">
                MBP
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-2.5 px-1 py-0">
          <div className="bg-white opacity-20 h-2.5 w-px" />
        </div>

        <div className="flex items-center pl-1">
          <div className="flex h-10 items-center rounded-[2px]">
            <div className="flex items-start px-0 py-2 rounded-[2px]">
              <div className="flex gap-1 items-center px-1.5 py-px pb-[3px]">
                <p className="text-white text-[14px] font-bold leading-5 tracking-[0.8px]">
                  CONTENTS
                </p>
              </div>
            </div>
          </div>
          <div className="flex h-10 items-center rounded-[2px]">
            <div className="flex items-start px-0 py-2 rounded-[2px]">
              <div className="flex gap-1 items-center px-1.5 py-px pb-[3px]">
                <p className="text-white text-[14px] font-bold leading-5 tracking-[0.8px]">
                  WIDGET STORE
                </p>
              </div>
            </div>
          </div>
          <div className="flex h-10 items-center rounded-[2px]">
            <div className="flex items-start px-0 py-2 rounded-[2px]">
              <div className="flex gap-1 items-center px-1.5 py-px pb-[3px]">
                <p className="text-white text-[14px] font-bold leading-5 tracking-[0.8px]">
                  DASHBOARD
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end">
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="flex items-start bg-[rgba(40,48,55,0.32)] rounded-[2px] min-w-[108px] max-w-[160px] w-[108px]">
              <div className="flex flex-1 flex-col gap-1 items-start px-0 py-0">
                <div className="bg-[rgba(40,48,55,0.32)] flex gap-1 items-center pl-1.5 pr-1 py-0.5 rounded-[2px] w-full">
                  <p className="flex-1 text-[#f3f6f8] text-[12px] leading-[14px] tracking-[0.8px] whitespace-nowrap overflow-hidden text-ellipsis">
                    Search
                  </p>
                  <div className="flex gap-0.5 items-center px-0 py-1">
                    <div className="rounded-[2px] w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2.5 h-2.5 items-center justify-center opacity-20 overflow-clip pl-2 pr-0.5 py-0">
              <div className="bg-white h-full w-px" />
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-transparent flex items-start rounded-[2px] px-1.5 py-0">
              <div className="flex gap-1 items-center py-[3px]">
                <p className="text-[12px] leading-[14px] tracking-[0.8px]">button</p>
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-transparent flex items-start rounded-[2px] px-1.5 py-0">
              <div className="flex gap-1 items-center py-[3px]">
                <p className="text-[12px] leading-[14px] tracking-[0.8px]">button</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 h-2.5 items-center justify-center opacity-20 overflow-clip">
            <div className="flex flex-1 gap-2.5 items-end px-1 py-0">
              <div className="bg-white h-full w-px" />
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-transparent flex items-start rounded-[2px]">
              <div className="flex gap-1 items-center px-1.5 py-0">
                <div className="flex gap-2.5 items-center py-[3px]">
                  <p className="text-[#f3f6f8] text-[12px] leading-[14px] tracking-[0.8px]">
                    접속 시간 (03:57)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 h-2.5 items-center justify-center opacity-20 overflow-clip">
          <div className="flex flex-1 gap-2.5 items-end px-1 py-0">
            <div className="bg-white h-full w-px" />
          </div>
        </div>

        <div className="flex items-center pr-1">
          <div className="flex items-start mr-[-4px]">
            <div className="bg-transparent flex items-start rounded-[2px] px-1.5 py-0">
              <div className="flex gap-1 items-center py-[3px]">
                <p className="text-[12px] leading-[14px] tracking-[0.8px]">button</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
