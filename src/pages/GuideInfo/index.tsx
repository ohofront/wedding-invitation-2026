// import GuideInfoTab from '@/pages/GuideInfo/components/GuideInfoTab';

const GuideInfo = () => {
  return (
    <div className='px-6 text-center'>
      {/* --- 소규모 예식 안내 강조 영역 시작 --- */}
      <div className='bg-[#FCFAF9] border border-[#EAE3E0] rounded-xl p-6 text-[15px] leading-8 break-keep text-gray-700 shadow-sm'>
        <p>
          기쁜 날 함께 모시고 싶었지만,
          <br />
          가족과 함께하는 <span className='text-[#C28E79] font-medium'>작은 예식</span>으로 진행하게 되어
          <br />
          직접 초대 드리지 못하는 점
          <br />
          너그럽게 이해해 주시면 감사하겠습니다.
        </p>
        <div className='mx-auto my-4 border-b border-gray-200 w' style={{ width: '40px' }}></div>
        <p>
          비록 자리는 함께하지 못하지만,
          <br />
          따뜻한 마음으로 축복해 주신다면
          <br />
          저희에게는 큰 기쁨이 됩니다.
        </p>
      </div>
      {/* --- 소규모 예식 안내 강조 영역 끝 --- */}

      {/* <GuideInfoTab /> */}
    </div>
  );
};

export default GuideInfo;
