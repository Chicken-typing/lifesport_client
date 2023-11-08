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
import { Box, IconButton, Typography, useTheme } from '@mui/material';

const Admin = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
                gridRow: 'span 2',
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
                  p="0 30px"
                  display="flex "
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                      Revenue Generated
                    </Typography>
                    <Typography variant="h3" fontWeight="bold" color={colors.greenAccent[500]}>
                      $59,342.32
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton>
                      <DownloadOutlinedIcon
                        sx={{ fontSize: '26px', color: colors.greenAccent[500] }}
                      />
                    </IconButton>
                  </Box>
                </Box>

                <Box height="250px" m="-20px 0 0 0"></Box>
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
            {/* <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              p="30px"
            >
              <Typography variant="h5" fontWeight="600">
                Campaign
              </Typography>
              <Box display="flex" flexDirection="column" alignItems="center" mt="25px">
                <ProgressCircle size="125" />
                <Typography variant="h5" color={colors.greenAccent[500]} sx={{ mt: '15px' }}>
                  $48,352 revenue generated
                </Typography>
                <Typography>Includes extra misc expenditures and costs</Typography>
              </Box>
            </Box>
            <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]}>
              <Typography variant="h5" fontWeight="600" sx={{ padding: '30px 30px 0 30px' }}>
                Sales Quantity
              </Typography>
              <Box height="250px" mt="-20px">
                <BarChart isDashboard={true} />
              </Box>
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
