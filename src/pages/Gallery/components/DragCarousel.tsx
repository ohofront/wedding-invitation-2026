import { useState, useRef, useEffect } from 'react';
import { GalleryType } from '@/types';
import Pagination from './Pagination';

// 1. 사용할 이미지들을 상단에서 import 합니다.
// (파일명과 확장자가 실제 폴더 내 파일과 일치해야 합니다.)
import weddingPhoto1 from '@/assets/images/wedding_01.png';
import weddingPhoto2 from '@/assets/images/wedding_02.png';
import weddingPhoto3 from '@/assets/images/wedding_03.png';
import weddingPhoto4 from '@/assets/images/wedding_04.png';

// 2. import한 이미지 변수들을 배열에 넣어줍니다.
const localImages: GalleryType[] = [
  { id: 1, src: weddingPhoto1, alt: '웨딩 사진 1' },
  { id: 2, src: weddingPhoto2, alt: '웨딩 사진 2' },
  { id: 3, src: weddingPhoto3, alt: '웨딩 사진 3' },
  { id: 4, src: weddingPhoto4, alt: '웨딩 사진 4' },
];

const Carousel = () => {
  const parsedImages = localImages;

  // ... (이하 로직은 기존과 동일)
  const extendedImages: GalleryType[] = parsedImages.length
    ? [parsedImages[parsedImages.length - 1], ...parsedImages, parsedImages[0]]
    : [];

  const [currentIndex, setCurrentIndex] = useState(1);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragStartY, setDragStartY] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const [isVerticalScroll, setIsVerticalScroll] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!parsedImages.length) return;
    if (dragging) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex, dragging, parsedImages.length]);

  const handleTransitionEnd = () => {
    if (currentIndex === 0) {
      setCurrentIndex(parsedImages.length);
      if (containerRef.current) {
        containerRef.current.style.transition = 'none';
        containerRef.current.style.transform = `translateX(-${parsedImages.length * 100}%)`;
        containerRef.current.getBoundingClientRect();
        containerRef.current.style.transition = 'transform 300ms ease-out';
      }
    } else if (currentIndex === parsedImages.length + 1) {
      setCurrentIndex(1);
      if (containerRef.current) {
        containerRef.current.style.transition = 'none';
        containerRef.current.style.transform = `translateX(-100%)`;
        containerRef.current.getBoundingClientRect();
        containerRef.current.style.transition = 'transform 300ms ease-out';
      }
    }
  };

  const handleDragStart = (clientX: number, clientY: number) => {
    setDragStartX(clientX);
    setDragStartY(clientY);
    setDragging(true);
    setIsVerticalScroll(false);
  };

  const handleDragMove = (clientX: number, clientY: number, e?: any) => {
    if (!dragging || dragStartX === null || dragStartY === null) return;
    const deltaX = clientX - dragStartX;
    const deltaY = clientY - dragStartY;

    if (!isVerticalScroll) {
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        setIsVerticalScroll(true);
        return;
      } else {
        setIsVerticalScroll(false);
        if (e && e.cancelable) e.preventDefault();
      }
    }
    setTranslateX(deltaX);
  };

  const handleDragEnd = () => {
    if (!dragging) return;
    if (!isVerticalScroll) {
      if (translateX < -50) setCurrentIndex((prev) => prev + 1);
      else if (translateX > 50) setCurrentIndex((prev) => prev - 1);
    }
    setTranslateX(0);
    setDragging(false);
    setDragStartX(null);
    setDragStartY(null);
  };

  if (!parsedImages.length) return null;

  return (
    <div className='relative w-full overflow-hidden bg-background'>
      <div
        ref={containerRef}
        className='flex transition-transform duration-300 ease-out'
        style={{
          transform: `translateX(calc(-${currentIndex * 100}% + ${translateX}px))`,
        }}
        onTransitionEnd={handleTransitionEnd}
        onMouseDown={(e) => handleDragStart(e.clientX, e.clientY)}
        onMouseMove={(e) => dragging && handleDragMove(e.clientX, e.clientY, e)}
        onMouseUp={handleDragEnd}
        onMouseLeave={() => dragging && handleDragEnd()}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX, e.touches[0].clientY, e)}
        onTouchEnd={handleDragEnd}
      >
        {extendedImages.map((item, index) => (
          <div className='flex-shrink-0 w-full' key={index}>
            <img
              loading={index === currentIndex ? 'eager' : 'lazy'}
              className='object-cover w-full h-auto'
              src={item.src}
              alt={item.alt}
            />
          </div>
        ))}
      </div>
      <Pagination currentIndex={currentIndex} onPageChange={setCurrentIndex} totalPages={parsedImages.length} />
    </div>
  );
};

export default Carousel;
