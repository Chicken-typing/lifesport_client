import AdminLayout from '@/adminLayout';
import { tokens } from '@/adminLayout/theme';
import { useSendCouponMutation } from '@/query/coupons/getCoupons';
import { useDeleteMutation, useRoleMutation } from '@/query/role/roleMutation';
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
  Input,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { DataGrid } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { cookieStorage } from '@utils/cookieStorage';
import { decodeToken } from '@utils/decode';
import request from '@utils/request';
import { isEmpty, map } from 'lodash';
import { ChangeEvent, useState } from 'react';
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
  const [selectionEmail, setSelectionEmail] = useState<any>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openDialogAdmin, setOpenDialogAdmin] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');
  const token = cookieStorage.getAccessTokenInfo();
  const decoded = decodeToken(token || '');
  const { mutateAsync: updateMutation } = useRoleMutation();
  const { mutateAsync: deleteMutation } = useDeleteMutation();
  const { mutateAsync: sendCouponMutation } = useSendCouponMutation();

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
      return users.filter((user: any) => user?.role !== 'customer');
    }
    if (type === 'customer') {
      return users.filter((user: any) => user?.role === 'customer');
    }
  };

  const handleCloseDialog = () => setOpenDialog(false);

  const handleCloseDialogAdmin = () => setOpenDialogAdmin(false);

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

  const handleSendCoupons = (code: string) => {
    sendCouponMutation({ code: code, emails: selectionEmail }).then((response: any) => {
      if (response?.status === 'success') {
        toast.success('Sent Coupons Successfully', {
          position: 'top-center',
          hideProgressBar: true,
          theme: 'colored',
        });
      }
    });
  };

  const handleChangeEventCode = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setCode(newValue);
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
            width="55%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="flex-start"
            bgcolor={
              role === 'master_admin'
                ? colors.redAccent[600]
                : role === 'admin'
                ? colors.blueAccent[600]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {role === 'master_admin' && <AdminPanelSettingsOutlinedIcon />}
            {role === 'admin' && <SecurityOutlinedIcon />}
            {role === 'customer' && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
              {role.replace('_', ' ').toUpperCase()}
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
                  setOpenDialogAdmin(true);
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
      {/* Dialog for delete admin*/}
      <Dialog
        open={openDialogAdmin}
        onClose={handleCloseDialogAdmin}
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
              handleDeleteAdmin(selection?.id, selection?.role), handleCloseDialogAdmin();
            }}
            autoFocus
            style={{ flex: '1' }}
          >
            Ok
          </Button>
          <Button autoFocus onClick={handleCloseDialogAdmin} style={{ flex: '1' }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for send coupons */}
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
        <DialogTitle className="dialog-title" id="responsive-dialog-title">
          {'SEND COUPONS TO CUSTOMERS'}
        </DialogTitle>

        <DialogContent>
          <Input
            classes={{
              root: 'input-root',
            }}
            required
            value={code}
            onChange={handleChangeEventCode}
            placeholder="Input the code event"
          />
        </DialogContent>
        <DialogContent>
          <DialogContentText className="dialog-context">
            {map(selectionEmail, (item, idx) => (
              <div key={idx}>{item}</div>
            ))}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              handleCloseDialog();
              handleSendCoupons(code);
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
              display: type === 'customer' ? 'block' : 'none',
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
              disabled={isEmpty(selectionEmail)}
              className="button"
              style={{
                width: '30px',
                marginLeft: 'auto',
              }}
            >
              <Tooltip title="Send Coupons" placement="left" arrow>
                <i className="fa-light fa-ticket" />
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
              checkboxSelection={type === 'customer'}
              rows={filterOrdersByType(users?.user_lists || [], type)}
              columns={columns}
              loading={isLoading}
              onRowSelectionModelChange={(params) => {
                const newSelectionState = map(params, (selectedRowId) => {
                  const selectedEmail = users?.user_lists?.find(
                    (item: any) => item.id === selectedRowId,
                  );
                  return selectedEmail ? selectedEmail?.email : selectedEmail?.email;
                });

                setSelectionEmail(newSelectionState);
              }}
            />
          </Box>
        </Box>
      </div>
    </AdminLayout>
  );
};

export default Account;
