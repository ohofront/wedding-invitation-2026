import ContactDialog from '@/pages/MiddleInfo/components/Greetings/Contacting/ContactDialog';

const Contacting = () => {
  return (
    <>
      {/* 신랑측, 신부측 이름 */}
      <div className='py-4 leading-9 break-keep'>
        {/* 신랑측 */}
        <div>
          <span className='text-lg'>김영일 · 김윤희</span>
          <span className='text-sm mx-2 text-[#8a857f]'>
            <span>의</span>
            <span className='ml-1'>아들</span>
          </span>
          <span className='text-lg'>강현</span>
        </div>

        {/* 신부측: 아버님 성함이 없으므로 어머님 성함만 표기 */}
        <div className='mt-1'>
          <span className='text-lg'>이리나 클랴로브스카야</span>
          <span className='text-sm mx-2 text-[#8a857f]'>
            <span>의</span>
            <span className='mx-2'>딸</span>
          </span>
          <span className='text-lg'>아나스타시아</span>
        </div>
      </div>

      {/* 연락하기 버튼 */}
      <div className='flex items-center justify-center'>
        <ContactDialog />
      </div>
    </>
  );
};

export default Contacting;
