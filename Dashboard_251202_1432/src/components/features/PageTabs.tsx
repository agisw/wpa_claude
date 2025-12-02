export default function PageTabs() {
  return (
    <div className="flex items-center h-6 px-3">
      <div className="flex items-center w-[160px] min-w-[120px] max-w-[200px]">
        <div className="bg-[#dadfe4] h-6 w-px" />
        <div className="flex flex-1 flex-col items-start">
          <div className="bg-[#dadfe4] h-px w-full" />
          <div className="bg-[#e4e9ed] flex gap-2 items-center pl-[11px] pr-[3px] py-px w-full">
            <p className="flex-1 text-[#767d84] text-[12px] leading-[14px] tracking-[0.8px] whitespace-nowrap overflow-hidden text-ellipsis">
              PEMS Main
            </p>
            <div className="bg-transparent flex items-start rounded-[2px]">
              <div className="flex gap-1 items-center p-0.5">
                <div className="rounded-[2px] w-4 h-4" />
              </div>
            </div>
          </div>
          <div className="bg-[#dadfe4] h-px w-full" />
        </div>
      </div>

      <div className="flex items-center w-[170px] min-w-[120px] max-w-[200px]">
        <div className="bg-[#dadfe4] h-6 w-px" />
        <div className="flex flex-1 flex-col items-start">
          <div className="bg-[#e4e9ed] h-px w-full" />
          <div className="bg-white flex gap-2 items-center pl-[11px] pr-[3px] py-px w-full">
            <p className="flex-1 text-[#3392d3] text-[12px] font-bold leading-5 tracking-[0.8px] whitespace-nowrap overflow-hidden text-ellipsis">
              동종확산 ECO Highway
            </p>
            <div className="bg-transparent flex items-start rounded-[2px]">
              <div className="flex gap-1 items-center p-0.5">
                <div className="rounded-[2px] w-4 h-4" />
              </div>
            </div>
          </div>
          <div className="bg-[#dadfe4] h-px w-full" />
        </div>
        <div className="bg-[#dadfe4] h-6 w-px" />
      </div>

      <div className="flex flex-1 items-center min-w-[3px]">
        <div className="flex flex-1 flex-col items-start">
          <div className="bg-[#dadfe4] h-px w-full" />
          <div className="bg-[#e4e9ed] h-[22px] w-full" />
          <div className="bg-[#dadfe4] h-px w-full" />
        </div>
      </div>

      <div className="flex items-center">
        <div className="bg-[#dadfe4] h-6 w-px" />
        <div className="flex flex-col items-start w-[22px]">
          <div className="bg-[#dadfe4] h-px w-[22px]" />
          <div className="bg-[#e4e9ed] flex gap-2 items-center p-px w-[22px]">
            <div className="bg-transparent flex items-start rounded-[2px]">
              <div className="flex gap-1 items-center p-0.5">
                <div className="rounded-[2px] w-4 h-4 flex items-center justify-center">
                  <span className="text-[#b2b6bb] text-xs">‹</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#dadfe4] h-px w-[22px]" />
        </div>
      </div>

      <div className="flex items-center">
        <div className="bg-[#dadfe4] h-6 w-px" />
        <div className="flex flex-col items-start w-[22px]">
          <div className="bg-[#dadfe4] h-px w-[22px]" />
          <div className="bg-[#e4e9ed] flex gap-2 items-center p-px w-[22px]">
            <div className="bg-transparent flex items-start rounded-[2px]">
              <div className="flex gap-1 items-center p-0.5">
                <div className="rounded-[2px] w-4 h-4 flex items-center justify-center">
                  <span className="text-[#b2b6bb] text-xs">›</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#dadfe4] h-px w-[22px]" />
        </div>
      </div>

      <div className="flex items-center">
        <div className="bg-[#dadfe4] h-6 w-px" />
        <div className="flex flex-col items-start w-[22px]">
          <div className="bg-[#dadfe4] h-px w-[22px]" />
          <div className="bg-[#e4e9ed] flex gap-2 items-center p-px w-[22px]">
            <div className="bg-transparent flex items-start rounded-[2px]">
              <div className="flex gap-1 items-center p-0.5">
                <div className="rounded-[2px] w-4 h-4" />
              </div>
            </div>
          </div>
          <div className="bg-[#dadfe4] h-px w-[22px]" />
        </div>
      </div>

      <div className="flex items-center">
        <div className="bg-[#dadfe4] h-6 w-px" />
        <div className="flex flex-col items-start w-[22px]">
          <div className="bg-[#dadfe4] h-px w-[22px]" />
          <div className="bg-[#e4e9ed] flex gap-2 items-center p-px w-[22px]">
            <div className="bg-transparent flex items-start rounded-[2px]">
              <div className="flex gap-1 items-center p-0.5">
                <div className="rounded-[2px] w-4 h-4" />
              </div>
            </div>
          </div>
          <div className="bg-[#dadfe4] h-px w-[22px]" />
        </div>
      </div>
    </div>
  );
}
