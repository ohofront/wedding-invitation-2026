import { Button } from '@/components/ui/button';
import KakaoIcon from '@/assets/icons/kakao.svg';
import useKakaoSDK from '@/hooks/useKakaoSDK';

const KakaoShareButton = () => {
  useKakaoSDK(); // 카카오 SDK 로드 커스텀 훅

  // 카카오톡 공유하기
  const shareKakao = () => {
    if (!window.Kakao) {
      alert('카카오 SDK가 아직 로드되지 않았습니다.');
      return;
    }
    if (!window.Kakao.isInitialized()) {
      alert('카카오 SDK가 초기화되지 않았습니다.');
      return;
    }

    if (!window.Kakao.Share) {
      alert('카카오 링크 기능이 초기화되지 않았습니다.');
      return;
    }

    // 💡 아래 주소를 Vercel에서 새로 배포한 본인의 주소로 변경해 주세요!
    // 마지막에 슬래시(/)는 빼고 적어주세요.
    const MY_VERCEL_URL = 'https://wedding-invitation-2026-theta.vercel.app';

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '김강현 ♥ 아나스타시아 결혼합니다',
        description: '저희의 결혼식에 초대합니다.',
        imageUrl: `${MY_VERCEL_URL}/images/wedding.png`,
        link: {
          mobileWebUrl: MY_VERCEL_URL,
          webUrl: MY_VERCEL_URL,
        },
      },
      buttons: [
        {
          title: '청첩장 보기',
          link: {
            mobileWebUrl: MY_VERCEL_URL,
            webUrl: MY_VERCEL_URL,
          },
        },
      ],
    });
  };

  return (
    <Button onClick={shareKakao} variant='ghost' className='gap-2 text-lg'>
      <img src={KakaoIcon} alt='카카오톡 아이콘' width={18} className='grayscale' />
      <p className='text-sm'>카카오톡 공유하기</p>
    </Button>
  );
};

export default KakaoShareButton;
