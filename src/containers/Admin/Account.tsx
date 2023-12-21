import AdminLayout from '@/adminLayout';
import { tokens } from '@/adminLayout/theme';
import { mockDataTeam } from '@components/compound/Admin/constants';
import Introduce from '@components/compound/Admin/Introduce';
import { Button } from '@components/primitive';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import {
  Box,
  Dialog,
  DialogActions,
  DialogTitle,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import request from '@utils/request';
import { useState } from 'react';
import { map } from 'lodash';
import { cookieStorage } from '@utils/cookieStorage';
import { decodeToken } from '@utils/decode';
import { decode } from 'punycode';
import { useRoleMutation, useDeleteMutation } from '@/query/role/roleMutation';
import { toast } from 'react-toastify';

type IAccount = 'all' | 'admin' | 'customer';

const Account = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [type, setType] = useState<IAccount>('all');
  const [selection, setSelection] = useState<{ id: string; role: string }>({
    id: '',
    role: '',
  });
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const token = cookieStorage.getAccessTokenInfo();
  const decoded = decodeToken(token || '');
  const { mutateAsync: updateMutation } = useRoleMutation();
  const { mutateAsync: deleteMutation } = useDeleteMutation();

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

  const handleCloseDialog = () => setOpenDialog(false);

  const handleEditRole = (id: string, role: string) => {
    updateMutation({ id: id, role: role === 'admin' ? 'customer' : 'admin' })
      .then((response: any) => {
        if (response?.status === 'success') {
          toast.success('Update Successfully', {
            position: 'top-center',
            hideProgressBar: true,
            theme: 'colored',
          });
        }
      })
      .catch((error: any) =>
        toast.error(error, {
          position: 'top-center',
          hideProgressBar: true,
          theme: 'colored',
        }),
      );
  };

  const handleDeleteAdmin = (id: string, role: string) => {
    deleteMutation({ id: id, role: role })
      .then((response: any) => {
        if (response?.status === 'success') {
          toast.success('Deleted Successfully', {
            position: 'top-center',
            hideProgressBar: true,
            theme: 'colored',
          });
        }
      })
      .catch((error: any) =>
        toast.error(error, {
          position: 'top-center',
          hideProgressBar: true,
          theme: 'colored',
        }),
      );
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
  ];

  if (decoded?.role === 'master_admin' && type === 'admin') {
    columns.push({
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: ({ row: { id, role } }: any) => {
        if (role === 'admin' || role === 'customer') {
          return (
            <div className="action-group">
              <Button
                onClick={() => handleEditRole(id, role)}
                color="green-500"
                fullWidth
                className="button"
              >
                <i className="fa-regular fa-pen-to-square"></i>
              </Button>

              <Button
                onClick={() => {
                  setSelection({ id, role });
                  setOpenDialog(true);
                }}
                color="green-500"
                fullWidth
                className="button"
              >
                <i className="fa-regular fa-trash"></i>
              </Button>
            </div>
          );
        } else {
          // Nếu không phải là admin, bạn có thể render một phần tử rỗng hoặc null
          return null;
        }
      },
    });
  }

  if (decoded?.role === 'master_admin' && type === 'customer') {
    columns.push({
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: ({ row: { id, role } }: any) => {
        if (role === 'admin' || role === 'customer') {
          return (
            <div className="action-group">
              <Button
                onClick={() => handleEditRole(id, role)}
                color="green-500"
                fullWidth
                className="button"
              >
                <i className="fa-regular fa-pen-to-square"></i>
              </Button>
            </div>
          );
        } else {
          return null;
        }
      },
    });
  }

  return (
    <AdminLayout title="Account List">
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="responsive-dialog-title"
        className="dialog-delete"
        classes={{
          root: 'dialog-root',
          container: 'dialog-container',
          paper: 'dialog-paper',
        }}
      >
        <DialogTitle color="black" id="responsive-dialog-title">
          {'Do you want to delete it ?'}
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              handleDeleteAdmin(selection?.id, selection?.role), handleCloseDialog();
            }}
            autoFocus
            style={{ flex: '1' }}
          >
            Ok
          </Button>
          <Button autoFocus onClick={handleCloseDialog} style={{ flex: '1' }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <div className="kl-admin-account">
        <Box display="flex" m="20px" flexDirection="column" width="100%">
          {/* HEADER */}
          <Box display="flex" justifyContent="flex-start" alignItems="center">
            <Introduce title="ACCOUNT MANAGEMENT" subtitle="Welcome to your account page" />
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
