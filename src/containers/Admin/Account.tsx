import AdminLayout from '@/adminLayout';
import { tokens } from '@/adminLayout/theme';
import { mockDataTeam } from '@components/compound/Admin/constants';
import Introduce from '@components/compound/Admin/Introduce';
import { Button } from '@components/primitive';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import { Box, ToggleButton, ToggleButtonGroup, Tooltip, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import request from '@utils/request';
import { useState } from 'react';

type IAccount = 'all' | 'admin' | 'customer';

const Account = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [type, setType] = useState<IAccount>('all');
  const [selection, setSelection] = useState<any[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const fetchUsers = async () => {
    const data: any = await request.request({
      method: 'GET',
      url: '/users/list',
    });

    return data;
  };

  const { data: users, isFetching: isLoading } = useQuery(['/users/list', {}], fetchUsers, {
    retry: 1,
  });

  const handleChangeType = (event: React.MouseEvent<HTMLElement>, newAlignment: IAccount) => {
    if (newAlignment !== null) {
      setType(newAlignment);
    }
  };

  const filterOrdersByType = (users: any, type: IAccount) => {
    if (type === 'all') {
      return users;
    }
    if (type === 'admin') {
      return users.filter((user: any) => user.role !== 'customer');
    }
    if (type === 'customer') {
      return users.filter((user: any) => user.role === 'customer');
    }
  };

  const columns: any[] = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell',
    },

    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'role',
      headerName: 'Role',
      flex: 1,
      renderCell: ({ row: { role } }: any) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            bgcolor={
              role === 'master_admin'
                ? colors.greenAccent[600]
                : role === 'admin'
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {role === 'master_admin' && <AdminPanelSettingsOutlinedIcon />}
            {role === 'admin' && <SecurityOutlinedIcon />}
            {role === 'customer' && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
              {role}
            </Typography>
          </Box>
        );
      },
    },
    // {
    //   field: 'action',
    //   headerName: 'Action',
    //   flex: 1,
    //   renderCell: ({ row: { access } }: any) => {
    //     return (
    //       <div className="action-group">
    //         <Button color="green-500" fullWidth className="button">
    //           <i className="fa-regular fa-pen-to-square"></i>
    //         </Button>

    //         <Button color="green-500" fullWidth className="button">
    //           <i className="fa-regular fa-trash"></i>
    //         </Button>
    //       </div>
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

          <ToggleButtonGroup
            color="secondary"
            value={type}
            exclusive
            onChange={handleChangeType}
            style={{ marginBottom: '50px' }}
            aria-label="Platform"
          >
            <ToggleButton defaultChecked style={{ width: '100px' }} value="all">
              All
            </ToggleButton>
            <ToggleButton style={{ width: '100px' }} value="admin">
              Admin
            </ToggleButton>
            <ToggleButton style={{ width: '100px' }} value="customer">
              Customer
            </ToggleButton>
          </ToggleButtonGroup>

          <div
            className="function"
            style={{
              display: type !== 'all' ? 'block' : 'none',
              gap: '6px',
              width: 'fit-content',
              marginLeft: 'auto',
              marginBottom: '10px',
            }}
          >
            <Button
              color="green-500"
              fullWidth
              onClick={() => setOpenDialog(true)}
              // disabled={isEmpty(selection)}
              className="button"
              style={{
                width: '30px',
                marginLeft: 'auto',
              }}
            >
              <Tooltip title="Edit Status" placement="left" arrow>
                <i className="fa-light fa-pen-to-square" />
              </Tooltip>
            </Button>
          </div>

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
            <DataGrid
              checkboxSelection
              hideFooter
              rows={filterOrdersByType(users?.user_lists || [], type)}
              columns={columns}
              loading={isLoading}
            />
          </Box>
        </Box>
      </div>
    </AdminLayout>
  );
};

export default Account;
