import React from 'react';

const BlessingContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className='mb-8 leading-8 break-keep'>
        작은 예식으로 인해 따로 모시지 못해 죄송한 마음입니다.
        <br />
        마음으로 전해주시는 축하만으로도
        <br />
        저희에겐 충분히 큰 기쁨입니다.
        <br />
        <br />
        혹시 마음을 전하고 싶으신 분들을 위해
        <br />
        모바일 청첩장에 계좌를 함께 남깁니다.
      </div>
      {children}
    </div>
  );
};

export default BlessingContent;
