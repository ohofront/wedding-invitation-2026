import { useEffect, useState } from 'react';

const CountDown = () => {
  // 예식 날짜 및 시간 설정 (2026년 6월 3일 12:00)
  const targetDate = new Date('2026-06-03T12:00:00').getTime();
  const [timer, setTimer] = useState(targetDate - Date.now());

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer(targetDate - Date.now());
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [targetDate]);

  const formatTime = (ms: number) => {
    // 디데이 지났을 경우 0으로 처리 (선택 사항)
    if (ms < 0) return { days: 0, hours: '00', minutes: '00', seconds: '00' };

    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
      days,
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
    };
  };

  const { days, hours, minutes, seconds } = formatTime(timer);

  return (
    <>
      <div className='w-full mb-5 leading-8'>
        <div className='inline-block align-top'>
          <div className='text-[#999999] text-[10px]'>DAYS</div>
          <span className='px-4 text-xl'>{days}</span>
        </div>
        <div className='inline-block align-top'>
          <div className='text-[#999999] text-[10px]'>&nbsp;</div>
          <span className='text-xs'>:</span>
        </div>
        <div className='inline-block align-top'>
          <div className='text-[#999999] text-[10px]'>HOUR</div>
          <span className='px-4 text-xl'>{hours}</span>
        </div>
        <div className='inline-block align-top'>
          <div className='text-[#999999] text-[10px]'>&nbsp;</div>
          <span className='text-xs'>:</span>
        </div>
        <div className='inline-block align-top'>
          <div className='text-[#999999] text-[10px]'>MIN</div>
          <span className='px-4 text-xl'>{minutes}</span>
        </div>
        <div className='inline-block align-top'>
          <div className='text-[#999999] text-[10px]'>&nbsp;</div>
          <span className='text-xs'>:</span>
        </div>
        <div className='inline-block align-top'>
          <div className='text-[#999999] text-[10px]'>SEC</div>
          <span className='px-4 text-xl'>{seconds}</span>
        </div>
      </div>

      <div className='break-keep'>
        <span>강현🩷아나스타시아 의 결혼식이&nbsp;</span>
        <span>
          <span className='text-[#ea7664]'>{timer > 0 ? days + 1 : 0}일</span>
          <span>&nbsp;남았습니다.</span>
        </span>
      </div>
    </>
  );
};

export default CountDown;
