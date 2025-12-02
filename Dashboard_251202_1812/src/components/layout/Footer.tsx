export default function Footer() {
  return (
    <footer className="bg-[#e4e9ed] h-5 flex items-center justify-center border-t border-[#dadfe4]">
      <div className="flex items-center gap-1 text-[11px] leading-3 tracking-[0.8px] text-[#565e66] opacity-60">
        <span>개인정보청리방침</span>
        <div className="h-[11px] flex items-center">
          <div className="h-2.5 w-px bg-[#283037] opacity-20" />
        </div>
        <div className="flex items-center gap-1">
          <span>© 2025 Samsung</span>
        </div>
      </div>
    </footer>
  );
}
