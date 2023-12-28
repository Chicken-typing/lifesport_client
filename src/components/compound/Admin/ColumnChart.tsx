import React from 'react';
import { Column, ColumnConfig } from '@ant-design/plots';
import { useRevenueQuery } from '../../../query/statistics/get-statistics';
import { format, parseISO } from 'date-fns';
import { Interval, IStatus } from '@interfaces/statistics';
import { map } from 'lodash';

function ColumnChart({ interval, status }: { interval: Interval; status: IStatus }) {
  const {
    data: revenues,
    isFetching: isLoading,
    isError,
  } = useRevenueQuery({ interval: interval, status: status });

  //convert date to formatdate with variable interval
  const formatDate = (dateString: string, interval: Interval) => {
    const parsedDate = parseISO(dateString);
    switch (interval) {
      case 'day':
        return format(parsedDate, 'dd/MM/yyyy');
      case 'month':
        return format(parsedDate, 'MM/yyyy');
      case '3-months':
        return format(parsedDate, 'MM/yyyy');
      case '6-months':
        return format(parsedDate, 'MM/yyyy');
      case 'year':
        return format(parsedDate, 'yyyy');
      default:
        return dateString;
    }
  };

  //convert revenue from string to number
  const convertRevenueToNumber = (data: any) => {
    return map(data, (item: any) => ({
      revenue_interval: formatDate(item.revenue_interval, interval),
      revenue: Number(item.revenue / 100),
    }));
  };

  // reverseArray to for revenue_interval from small to large
  const reverseArray = (data: any) => {
    return data.slice().reverse();
  };

  const columnData = revenues?.data ? convertRevenueToNumber(revenues?.data) : [];
  const reversedData = reverseArray(columnData);

  const config: ColumnConfig = {
    data: reversedData,
    xField: 'revenue_interval',
    yField: 'revenue',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      revenue_interval: {
        alias: 'Revenue Interval',
      },
      revenue: {
        alias: 'Revenue',
      },
    },
  };
  return (
    <div className="column-chart">
      <Column {...config} />
    </div>
  );
}

export default ColumnChart;
