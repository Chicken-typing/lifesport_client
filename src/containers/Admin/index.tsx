import AdminLayout from '@/adminLayout';
import { tokens } from '@/adminLayout/theme';
import { mockTransactions } from '@components/compound/Admin/constants';
import Introduce from '@components/compound/Admin/Introduce';
import StatBox from '@components/compound/Admin/StatBox';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import EmailIcon from '@mui/icons-material/Email';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import TrafficIcon from '@mui/icons-material/Traffic';
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { useRevenueQuery } from '@/query/statistics/get-statistics';
import { Interval, IStatus } from '@interfaces/statistics';
import { useState } from 'react';
import PieChart from '@components/compound/Admin/PieChart';
// import DateTimePicker from '@components/compound/Admin/DateTimePicker';
const Admin = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [interval, setIntervals] = useState<Interval>('day');
  const [status, setStatus] = useState<IStatus>('before');

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
  }) as FC;

  return (
    <AdminLayout title="Dashboard">
      <div className="kl-admin-dashboard">
        <Box display="flex" m="20px" flexDirection="column" width="100%">
          {/* HEADER */}
          <Box display="flex" justifyContent="flex-start" alignItems="center">
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
            <Box
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
                  gridColumn: 'span 1',
                  backgroundColor: colors.primary[400],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <StatBox
                  title="12,361"
                  subtitle="Emails Sent"
                  progress="0.75"
                  increase="+14%"
                  icon={<EmailIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
                />
              </Box>
              <Box
                sx={{
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
                  gridColumn: 'span 1',
                  backgroundColor: colors.primary[400],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <StatBox
                  title="32,441"
                  subtitle="New Clients"
                  progress="0.30"
                  increase="+5%"
                  icon={<PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
                />
              </Box>
              <Box
                sx={{
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
            </Box>

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
                {mockTransactions.map((transaction, i) => (
                  <Box
                    key={`${transaction.txId}-${i}`}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom={`4px solid ${colors.primary[500]}`}
                    p="15px"
                  >
                    <Box>
                      <Typography color={colors.greenAccent[500]} variant="h5" fontWeight="600">
                        {transaction.txId}
                      </Typography>
                      <Typography color={colors.grey[100]}>{transaction.user}</Typography>
                    </Box>
                    <Box color={colors.grey[100]}>{transaction.date}</Box>
                    <Box
                      sx={{
                        backgroundColor: colors.greenAccent[500],
                        p: '5px 10px',
                        borderRadius: '4px',
                      }}
                    >
                      ${transaction.cost}
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
                gridRow: 'span 6',
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
                  Campaign
                </Typography>
                {/* <DateTimePicker /> */}
              </Box>

              <Box min-height="fit-content" p="20px 20px">
                {<PieChart />}
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
