import AdminLayout from '@/adminLayout';
import { tokens } from '@/adminLayout/theme';
import { mockTransactions } from '@components/compound/Admin/constants';
import DateTimePicker from '@components/compound/Admin/DateTimePicker';
import Introduce from '@components/compound/Admin/Introduce';
import StatBox from '@components/compound/Admin/StatBox';
import { Interval, IStatus } from '@interfaces/statistics';
import EmailIcon from '@mui/icons-material/Email';
import PeopleIcon from '@mui/icons-material/People';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import TrafficIcon from '@mui/icons-material/Traffic';
import ReceiptIcon from '@mui/icons-material/Receipt';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  useTheme,
} from '@mui/material';
import { DateRange } from '@mui/x-date-pickers-pro';
import { getUnixTime } from 'date-fns';
import dayjs, { Dayjs } from 'dayjs';
import dynamic from 'next/dynamic';
import { FC, useState } from 'react';
import { useInvoicesQuery } from '@/query/invoices/get-invoices';
import { isEmpty, size } from 'lodash';
import { format } from 'date-fns';
const Admin = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const today = dayjs();
  const [interval, setIntervals] = useState<Interval>('day');
  const [status, setStatus] = useState<IStatus>('before');
  const [time, setTime] = useState<DateRange<Dayjs>>([today.startOf('week'), today]);
  const { data: invoices, isLoading } = useInvoicesQuery({});

  const handleChangeInterval = (event: SelectChangeEvent) => {
    setIntervals(event.target.value as Interval);
  };

  const handleChangeStatus = (event: SelectChangeEvent) => {
    setStatus(event.target.value as IStatus);
  };

  const ColumnChart = dynamic(() => import('@components/compound/Admin/ColumnChart'), {
    ssr: false,
  }) as FC<{ interval: Interval; status: IStatus }>;

  const PieChart = dynamic(() => import('@components/compound/Admin/PieChart'), {
    ssr: false,
  }) as FC<{ time: DateRange<Dayjs> }>;

  return (
    <AdminLayout title="Dashboard">
      <div className="kl-admin-dashboard">
        <Box display="flex" m="20px" flexDirection="column" width="100%">
          {/* HEADER */}
          <Box mb="30px" display="flex" justifyContent="flex-start" alignItems="center">
            <Introduce title="DASHBOARD" subtitle="Welcome to your dashboard" />
          </Box>

          {/* GRID & CHARTS */}
          <Box
            maxWidth="100%"
            display="grid"
            gridTemplateColumns="repeat(4, 1fr)"
            gridAutoRows="140px"
            gap="20px"
            gridTemplateRows="repeat(auto, 1fr)"
          >
            {/* ROW 1 */}
            {/* <Box
              display="grid"
              gridColumn="span 4"
              gridRow="span 1"
              gridTemplateColumns="repeat(4, 1fr)"
              gridAutoRows="140px"
              gap="20px"
              sx={{
                '@media (max-width: 768px)': {
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gridRow: 'span 2',
                },
                '@media (max-width: 480px)': {
                  gridTemplateColumns: '1fr',
                  gridRow: 'span 4',
                },
              }}
            >
              <Box
                sx={{
                  paddingInline: '10px',
                  gridColumn: 'span 1',
                  backgroundColor: colors.primary[400],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <StatBox
                  title={String(size(invoices?.order_lists))}
                  subtitle="Total Transaction"
                  progress="0.75"
                  increase="+14%"
                  icon={<ReceiptIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
                />
              </Box>
              <Box
                sx={{
                  paddingInline: '10px',
                  gridColumn: 'span 1',
                  backgroundColor: colors.primary[400],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <StatBox
                  title="431,225"
                  subtitle="Sales Obtained"
                  progress="0.50"
                  increase="+21%"
                  icon={
                    <PointOfSaleIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />
                  }
                />
              </Box>
              <Box
                sx={{
                  paddingInline: '10px',
                  gridColumn: 'span 1',
                  backgroundColor: colors.primary[400],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <StatBox
                  title="32,441"
                  subtitle="People"
                  progress="0.30"
                  increase="+5%"
                  icon={<PeopleIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
                />
              </Box>
              <Box
                sx={{
                  paddingInline: '10px',
                  gridColumn: 'span 1',
                  backgroundColor: colors.primary[400],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <StatBox
                  title="1,325,134"
                  subtitle="Traffic Received"
                  progress="0.80"
                  increase="+43%"
                  icon={<TrafficIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
                />
              </Box>
            </Box> */}

            {/* ROW 2 */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gridColumn: 'span 4',
                gridRow: 'span 4',
                gridTemplateRows: 'repeat(auto, 1fr)',
                gap: '20px',
                '@media (max-width: 768px)': {
                  gridRow: 'span 4',
                },
              }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridColumn: 'span 8',
                  gridRow: 'span 2',
                  backgroundColor: colors.primary[400],
                  '@media (max-width: 768px)': {
                    gridColumn: 'span 12',
                    gridRow: 'span 2',
                  },
                }}
              >
                <Box
                  mt="25px"
                  p="30px 30px"
                  display="flex "
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box mb="30px">
                    <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                      Revenue Generated
                    </Typography>
                    <Typography variant="h3" fontWeight="bold" color={colors.greenAccent[500]}>
                      $59,342.32
                    </Typography>
                  </Box>

                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Interval</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={interval}
                        label="Interval"
                        onChange={handleChangeInterval}
                      >
                        <MenuItem value={'day'}>Day</MenuItem>
                        <MenuItem value={'month'}>Month</MenuItem>
                        <MenuItem value={'3-months'}>3-Months</MenuItem>
                        <MenuItem value={'6-months'}>6-Months</MenuItem>
                        <MenuItem value={'year'}>Year</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Status</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={status}
                        label="Status"
                        onChange={handleChangeStatus}
                      >
                        <MenuItem value={'before'}>Before</MenuItem>
                        <MenuItem value={'after'}>After</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>

                <Box min-height="fit-content" p="20px 20px">
                  {<ColumnChart interval={interval} status={status} />}
                </Box>
              </Box>

              <Box
                sx={{
                  gridColumn: 'span 4',
                  gridRow: 'span 2',
                  backgroundColor: colors.primary[400],
                  overflow: 'auto',
                  '@media (max-width: 768px)': {
                    gridColumn: 'span 12',
                    gridRow: 'span 2',
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: `4px solid ${colors.primary[500]}`,
                    colors: colors.grey[100],
                    p: '15px',
                  }}
                >
                  <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                    Recent Transactions
                  </Typography>
                </Box>
                {!isEmpty(invoices?.order_lists) &&
                  invoices?.order_lists.map((transaction, i) => (
                    <Box
                      key={`${transaction.id}-${i}`}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      borderBottom={`4px solid ${colors.primary[500]}`}
                      p="15px"
                    >
                      <Box>
                        <Typography color={colors.greenAccent[500]} variant="h5" fontWeight="600">
                          {transaction.id}
                        </Typography>
                        <Typography color={colors.grey[100]}>{transaction.name}</Typography>
                      </Box>
                      <Box color={colors.grey[100]}>
                        {format(new Date(Number(transaction?.paid_at) * 1000), 'dd/MM/yyyy')}
                      </Box>
                      <Box
                        sx={{
                          backgroundColor: colors.greenAccent[500],
                          p: '5px 10px',
                          borderRadius: '4px',
                        }}
                      >
                        {(transaction?.amount_total / 100).toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                          minimumFractionDigits: 2,
                        })}
                      </Box>
                    </Box>
                  ))}
              </Box>
            </Box>

            {/* ROW 3 */}
            <Box
              sx={{
                display: 'grid',
                gridColumn: 'span 4',
                gridRow: 'span 4',
                backgroundColor: colors.primary[400],
                gap: '30px',
              }}
            >
              <Box
                mt="25px"
                p="30px 30px 0 30px"
                display="flex "
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h5" fontWeight="600">
                  Brands Best Seller
                </Typography>
                <DateTimePicker getState={setTime} />
              </Box>

              <Box min-height="fit-content" p="20px 20px">
                {<PieChart time={time} />}
              </Box>
            </Box>

            {/* <Box
              sx={{
                gridColumn: 'span 4',
                gridRow: 'span 2',
                backgroundColor: colors.primary[400],
              }}
            >
              <Typography variant="h5" fontWeight="600" sx={{ padding: '30px 30px 0 30px' }}>
                Sales Quantity
              </Typography>
              <Box height="250px" mt="-20px"></Box>
            </Box> */}
            {/* <Box
              sx={{
                gridColumn: 'span 4',
                gridRow: 'span 2',
                backgroundColor: colors.primary[400],
                padding: '30px',
              }}
            >
              <Typography variant="h5" fontWeight="600" sx={{ marginBottom: '15px' }}>
                Geography Based Traffic
              </Typography>
              <Box height="200px">
                <GeographyChart isDashboard={true} />
              </Box>
            </Box> */}
          </Box>
        </Box>
      </div>
    </AdminLayout>
  );
};
export default Admin;
