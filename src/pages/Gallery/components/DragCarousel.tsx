import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { GalleryType } from '@/types';
import Pagination from './Pagination';

// 1. 이미지 임포트 (6장 추가하여 총 10장)
import weddingPhoto1 from '@/assets/images/wedding_01.png';
import weddingPhoto2 from '@/assets/images/wedding_02.png';
import weddingPhoto3 from '@/assets/images/wedding_03.png';
import weddingPhoto4 from '@/assets/images/wedding_04.png';
import weddingPhoto5 from '@/assets/images/wedding_05.png';
import weddingPhoto6 from '@/assets/images/wedding_06.png';
import weddingPhoto7 from '@/assets/images/wedding_07.png';
import weddingPhoto8 from '@/assets/images/wedding_08.png';
import weddingPhoto9 from '@/assets/images/wedding_09.png';
import weddingPhoto10 from '@/assets/images/wedding_10.png';

const localImages: GalleryType[] = [
  { id: 1, src: weddingPhoto1, alt: '웨딩 사진 1' },
  { id: 2, src: weddingPhoto2, alt: '웨딩 사진 2' },
  { id: 3, src: weddingPhoto3, alt: '웨딩 사진 3' },
  { id: 4, src: weddingPhoto4, alt: '웨딩 사진 4' },
  { id: 5, src: weddingPhoto5, alt: '웨딩 사진 5' },
  { id: 6, src: weddingPhoto6, alt: '웨딩 사진 6' },
  { id: 7, src: weddingPhoto7, alt: '웨딩 사진 7' },
  { id: 8, src: weddingPhoto8, alt: '웨딩 사진 8' },
  { id: 9, src: weddingPhoto9, alt: '웨딩 사진 9' },
  { id: 10, src: weddingPhoto10, alt: '웨딩 사진 10' },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false); // 무한 루프 전환 시점 제어

  const dragStartX = useRef(0);
  const dragStartY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const parsedImages = localImages;
  const extendedImages = useMemo(() => {
    if (!parsedImages.length) return [];
    return [parsedImages[parsedImages.length - 1], ...parsedImages, parsedImages[0]];
  }, [parsedImages]);

  // 자동 재생 로직
  useEffect(() => {
    if (dragging || isTransitioning) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 4000); // 3초는 다소 촉박할 수 있어 4초로 변경
    return () => clearInterval(interval);
  }, [dragging, isTransitioning]);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentIndex === 0) {
      setCurrentIndex(parsedImages.length);
    } else if (currentIndex === parsedImages.length + 1) {
      setCurrentIndex(1);
    }
  };

  const handleDragStart = (clientX: number, clientY: number) => {
    if (isTransitioning) return; // 애니메이션 중에는 드래그 방지
    dragStartX.current = clientX;
    dragStartY.current = clientY;
    setDragging(true);
  };

  const handleDragMove = useCallback(
    (clientX: number, clientY: number, e?: any) => {
      if (!dragging) return;
      const deltaX = clientX - dragStartX.current;
      const deltaY = clientY - dragStartY.current;

      // 수직 스크롤 방지 로직 (수평 이동이 더 클 때만 preventDefault)
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (e?.cancelable) e.preventDefault();
        setTranslateX(deltaX);
      }
    },
    [dragging]
  );

  const handleDragEnd = () => {
    if (!dragging) return;
    const threshold = window.innerWidth * 0.2; // 화면 너비의 20% 이상 밀었을 때 이동

    if (translateX < -threshold) {
      setCurrentIndex((prev) => prev + 1);
      setIsTransitioning(true);
    } else if (translateX > threshold) {
      setCurrentIndex((prev) => prev - 1);
      setIsTransitioning(true);
    }

    setTranslateX(0);
    setDragging(false);
  };

  if (!parsedImages.length) return null;

  return (
    <div className='relative w-full overflow-hidden bg-background touch-pan-y'>
      <div
        ref={containerRef}
        className='flex'
        style={{
          // 드래그 중일 때는 transition을 0ms로 설정하여 즉각 반응하게 함
          transition:
            dragging || (!isTransitioning && (currentIndex === 1 || currentIndex === parsedImages.length))
              ? 'none'
              : 'transform 600ms cubic-bezier(0.25, 1, 0.5, 1)',
          transform: `translateX(calc(-${currentIndex * 100}% + ${translateX}px))`,
          willChange: 'transform', // 브라우저 최적화 힌트
        }}
        onTransitionEnd={handleTransitionEnd}
        onMouseDown={(e) => handleDragStart(e.clientX, e.clientY)}
        onMouseMove={(e) => handleDragMove(e.clientX, e.clientY, e)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX, e.touches[0].clientY, e)}
        onTouchEnd={handleDragEnd}
      >
        {extendedImages.map((item, index) => (
          <div className='flex-shrink-0 w-full' key={`${item.id}-${index}`}>
            <img
              // 1. 현재 슬라이드 근처의 이미지는 미리 로드하여 흐릿함을 방지
              loading={Math.abs(index - currentIndex) <= 1 ? 'eager' : 'lazy'}
              className='w-full aspect-[4/5] object-cover select-none'
              style={{
                // 2. 이미지 렌더링 품질 강제 (크기가 늘어날 때 흐릿함 방지)
                imageRendering: 'auto',
                // 3. 하드웨어 가속 시 안티앨리어싱(계단현상) 및 흐릿함 보정
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
              }}
              src={item.src}
              alt={item.alt}
              draggable={false}
            />
          </div>
        ))}
      </div>

      <Pagination
        currentIndex={
          currentIndex === 0 ? parsedImages.length : currentIndex === parsedImages.length + 1 ? 1 : currentIndex
        }
        onPageChange={(idx) => {
          setIsTransitioning(true);
          setCurrentIndex(idx);
        }}
        totalPages={parsedImages.length}
      />
    </div>
  );
};

export default Carousel;
