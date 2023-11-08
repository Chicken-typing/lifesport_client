import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '@/adminLayout/theme';

import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import { mockDataTeam } from '@components/compound/Admin/constants';
import AdminLayout from '@/adminLayout';
import Introduce from '@components/compound/Admin/Introduce';

const Account = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns: any[] = [
    // { field: 'id', headerName: 'ID' },
    // {
    //   field: 'name',
    //   headerName: 'Name',
    //   flex: 1,
    //   cellClassName: 'name-column--cell',
    // },
    // {
    //   field: 'age',
    //   headerName: 'Age',
    //   type: 'number',
    //   headerAlign: 'left',
    //   align: 'left',
    // },
    // {
    //   field: 'phone',
    //   headerName: 'Phone Number',
    //   flex: 1,
    // },
    // {
    //   field: 'email',
    //   headerName: 'Email',
    //   flex: 1,
    // },
    // {
    //   field: 'accessLevel',
    //   headerName: 'Access Level',
    //   flex: 1,
    //   renderCell: ({ row: { access } }: any) => {
    //     return (
    //       <Box
    //         width="60%"
    //         m="0 auto"
    //         p="5px"
    //         display="flex"
    //         justifyContent="center"
    //         bgcolor={
    //           access === 'admin'
    //             ? colors.greenAccent[600]
    //             : access === 'manager'
    //             ? colors.greenAccent[700]
    //             : colors.greenAccent[700]
    //         }
    //         borderRadius="4px"
    //       >
    //         {access === 'admin' && <AdminPanelSettingsOutlinedIcon />}
    //         {access === 'manager' && <SecurityOutlinedIcon />}
    //         {access === 'user' && <LockOpenOutlinedIcon />}
    //         <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
    //           {access}
    //         </Typography>
    //       </Box>
    //     );
    //   },
    // },
  ];

  return (
    <AdminLayout title="Account List">
      <div className="kl-admin-account">
        <Box display="flex" m="20px" flexDirection="column" width="100%">
          {/* HEADER */}
          <Box display="flex" justifyContent="flex-start" alignItems="center">
            <Introduce title="DASHBOARD" subtitle="Welcome to your dashboard" />
          </Box>

          <Box
            height="70vh"
            maxWidth="100%"
            sx={{
              '& .MuiDataGrid-root': {
                border: 'none',
              },
              '& .MuiDataGrid-cell': {
                borderBottom: 'none',
              },
              '& .name-column--cell': {
                color: colors.greenAccent[300],
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: colors.blueAccent[700],
                borderBottom: 'none',
              },
              '& .MuiDataGrid-virtualScroller': {
                backgroundColor: colors.primary[400],
              },
              '& .MuiDataGrid-footerContainer': {
                borderTop: 'none',
                backgroundColor: colors.blueAccent[700],
              },
              '& .MuiCheckbox-root': {
                color: `${colors.greenAccent[200]} !important`,
              },
            }}
          >
            <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} />
          </Box>
        </Box>
      </div>
    </AdminLayout>
  );
};

export default Account;
