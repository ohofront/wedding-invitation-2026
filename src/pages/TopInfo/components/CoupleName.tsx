const CoupleNames = () => {
  return (
    <div className='w-[calc(100%-48px)] px-[24px] mx-auto flex flex-col items-center justify-center gap-3'>
      {/* 신랑 이름 */}
      <div className='text-xl text-[#2b2222] z-10 tracking-widest'>김강현</div>

      {/* "그리고" 문구 */}
      <div className='text-sm text-[#2b2222] z-10 font-light'>그리고</div>

      {/* 신부 이름 */}
      <div className='text-xl text-[#2b2222] z-10 text-center break-keep leading-relaxed'>
        아나스타시아 클랴로브스카야
      </div>
    </div>
  );
};

export default CoupleNames;
