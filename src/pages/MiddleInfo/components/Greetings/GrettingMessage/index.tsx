import middleInfoImage from '@/assets/images/middleInfoImage.png';

const GreetingMessage = () => {
  return (
    <>
      <div className='text-xl font-medium'>소중한 분들께 결혼 소식을 전합니다.</div>

      <div className='m-10 leading-8 break-keep'>
        함께 있을 때 제일 행복하고,
        <br />
        함께 있을 때 제일 웃게 됩니다.
        <br />
        초여름 햇살이 눈부신 6월, 저희 두 사람 <span className='text-[#C28E79]'>결혼</span>합니다.
        <br />
        <br />
        서로를 향한 사랑으로 새로운 길을 함께 걷고자 합니다.
        <br />
        아름다운 시작의 순간을 따뜻한 마음으로 지켜봐 주시고,
        <br />두 사람의 앞날을 <span className='text-[#C28E79]'>축복</span>해 주시면 감사하겠습니다.
      </div>

      {/* Content 이미지 */}
      <div className='pt-4'>
        <img src={middleInfoImage} alt='웨딩 사진' className='w-full' />
      </div>
    </>
  );
};

export default GreetingMessage;
