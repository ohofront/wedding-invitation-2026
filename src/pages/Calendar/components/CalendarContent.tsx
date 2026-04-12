import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const days = ['일', '월', '화', '수', '목', '금', '토'];

const CalendarContent = () => {
  // 2026년 6월 달력 세팅 (월은 0부터 시작하므로 6월은 5)
  const firstDay = new Date(2026, 5, 1).getDay(); // 6월 1일의 요일
  const lastDate = new Date(2026, 6, 0).getDate(); // 6월의 마지막 날짜 (30일)

  const dates = Array(firstDay)
    .fill(null)
    .concat([...Array(lastDate)].map((_, i) => i + 1));

  return (
    <div className='w-full h-full leading-9'>
      <div className='text-2xl font-medium tracking-wide'>2026.06.03</div>
      <div className='mb-5 tracking-wider'>수요일 오후 12시 00분</div>

      <div className='w-full px-4 pb-10 text-center'>
        <Table>
          <TableHeader>
            <TableRow>
              {days.map((day, index) => (
                <TableHead key={index} className={day === '일' ? 'text-[#c6472b] text-center' : 'text-center'}>
                  {day}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: Math.ceil(dates.length / 7) }, (_, week) => (
              <TableRow key={week}>
                {dates.slice(week * 7, (week + 1) * 7).map((date, i) => (
                  <TableCell
                    key={i}
                    className={`${i === 0 ? 'text-[#c6472b]' : ''} ${
                      date === 3 ? 'bg-[#858585] text-white rounded-full' : ''
                    }`}
                  >
                    {date || ''}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CalendarContent;
