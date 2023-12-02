import { Pie, PieConfig } from '@ant-design/plots';
import { DateRange } from '@mui/x-date-pickers-pro';
import dayjs, { Dayjs } from 'dayjs';
import { useSellingRateMutation } from '../../../query/statistics/get-statistics';
import { getUnixTime } from 'date-fns';
import { useEffect, useState } from 'react';

function PieChart({ time }: { time: DateRange<Dayjs> }) {
  const { mutateAsync: sellingRateMutation } = useSellingRateMutation();
  const [datas, setDatas] = useState<Record<string, any>[]>([]);
  useEffect(() => {
    const firstDate = time[0];
    const secondDate = time[1];

    if (
      firstDate &&
      dayjs.isDayjs(firstDate) &&
      firstDate.isValid() &&
      secondDate &&
      dayjs.isDayjs(secondDate) &&
      secondDate.isValid()
    ) {
      const start_date = getUnixTime(firstDate.toDate());
      const end_date = getUnixTime(secondDate.toDate());

      // Gọi hook mutateAsync ở đây
      sellingRateMutation({ start_date, end_date }).then((response: any) => {
        setDatas(response?.data ? response?.data : {});
      });
    }
  }, [time, sellingRateMutation]);

  const config: PieConfig = {
    appendPadding: 10,
    data: datas.map((item) => ({ type: item.brand, value: parseInt(item.total_sale_brand) })),
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
  };

  return (
    <div>
      <Pie {...config} />
    </div>
  );
}

export default PieChart;
