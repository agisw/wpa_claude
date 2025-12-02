export default function Footer() {
  return (
    <div className="flex flex-col items-start h-5">
      <div className="bg-[#e4e9ed] flex flex-1 flex-col items-center justify-center w-full">
        <div className="bg-[#dadfe4] h-px w-full" />
        <div className="flex flex-1 gap-1 items-center justify-center pb-0.5 pt-px px-5 w-full">
          <div className="flex gap-2.5 items-center justify-end">
            <p className="text-[#565e66] text-[11px] leading-3 tracking-[0.8px] opacity-60">
              개인정보청리방침
            </p>
            <div className="flex flex-col items-start">
              <div className="bg-transparent h-px w-full" />
              <div className="flex flex-col gap-2.5 h-[11px] items-center justify-center overflow-clip">
                <div className="flex flex-1 gap-2.5 items-end px-2.5 py-0">
                  <div className="bg-[#283037] opacity-20 h-full w-px" />
                </div>
              </div>
            </div>
            <div className="flex gap-1 items-center">
              <div className="h-4 w-20 relative">
                <div className="absolute border border-[#90969d] border-solid left-0 rounded-[7px] w-3 h-3 top-0.5" />
                <p className="absolute left-10 text-[#767d84] text-[11px] leading-3 tracking-[0.8px]">
                  2025 Samsung
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
