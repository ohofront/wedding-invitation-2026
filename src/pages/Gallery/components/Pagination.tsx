const Pagination = ({
  currentIndex,
  onPageChange,
  totalPages, // 새로 추가된 속성
}: {
  currentIndex: number;
  onPageChange: (index: number) => void;
  totalPages: number; // 새로 추가된 타입
}) => {
  const slidesPerCycle = 5; // 한 번에 보여줄 최대 동그라미 개수

  // 전체 사진이 5개보다 적으면 그 개수만큼만, 많으면 5개만 보여줌
  const displayDotsCount = Math.min(slidesPerCycle, totalPages);
  const currentCycle = Math.ceil(currentIndex / slidesPerCycle);

  // 동그라미 인덱스를 순환
  const dotIndex = (currentIndex - 1) % slidesPerCycle;

  // 만약 사진이 아예 없다면 렌더링하지 않음
  if (totalPages === 0) return null;

  return (
    <div className='flex items-center justify-center gap-2 mt-3'>
      {[...Array(displayDotsCount)].map((_, index) => {
        // 실제 이동할 페이지 번호
        const targetPage = index + 1 + (currentCycle - 1) * slidesPerCycle;

        // targetPage가 전체 사진 개수를 초과하면 빈 값 반환 (마지막 사이클에서 동그라미 개수 조절)
        if (targetPage > totalPages) return null;

        return (
          <button
            key={index}
            onClick={() => onPageChange(targetPage)}
            className={`w-3 h-3 rounded-full transition-all ${index === dotIndex ? 'bg-gray-500' : 'bg-gray-200'}`}
          />
        );
      })}
    </div>
  );
};

export default Pagination;
