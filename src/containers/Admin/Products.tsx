import AdminLayout from '@/adminLayout';
import { tokens } from '@/adminLayout/theme';
import { useProductsQuery } from '@/query/products/get-products';
import Introduce from '@components/compound/Admin/Introduce';
import { Button } from '@components/primitive';
import { Box, useTheme, TextField, Input } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect, ChangeEvent } from 'react';
import { isEmpty, isEqual } from 'lodash';
import request from '@utils/request';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { Tooltip } from '@components/compound';
import { useEventMutation } from '@/query/products/eventMutation';
import { toast } from 'react-toastify';

const Products = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selection, setSelection] = useState<any>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openEvent, setOpenEvent] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');
  const router = useRouter();

  const { data: products, isFetching: isLoading, isError } = useProductsQuery({ page: 1 });
  const { mutateAsync: applyEvent } = useEventMutation();

  const columns: any[] = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      type: 'number',
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 1,
    },
    {
      field: 'brand',
      headerName: 'Brand',
      flex: 1,
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: ({ row: { access } }: any) => {
        return (
          <div className="action-group">
            <Button color="green-500" fullWidth className="button">
              <i className="fa-regular fa-pen-to-square"></i>
            </Button>
          </div>
        );
      },
    },
  ];

  const handleCloseDialog = () => setOpenDialog(false);
  const handleCloseEvent = () => setOpenEvent(false);

  const handleChange = (event: any) => {
    setSelection(event?.rowSelection);
  };

  const handleDeleteProduct = () => {
    const deleteProduct = async () => {
      try {
        const response: any = await request.request({
          method: 'POST',
          url: '/products/admin/delete',
          data: { ids: selection },
        });

        if (isEqual(response?.status, 'success')) router.reload();
      } catch (error) {
        console.log(error);
      }

      handleCloseDialog();
    };

    deleteProduct();
  };

  const handleUpdateProduct = () => {
    const updateProduct = async () => {
      try {
        const response: any = await request.request({
          method: 'GET',
          url: '/products/admin/update',
        });

        if (isEqual(response?.status, 'success')) {
          toast.success('Update Product Successfully', { position: 'top-center' });
        }
      } catch (error) {
        console.log(error);
      }
    };

    updateProduct();
  };

  const handleChangeEvent = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setCode(newValue);
  };
  const handleApplyEvent = () => {
    applyEvent({ code })
      .then((response: any) => {
        if (isEqual(response?.status, 'success')) {
          handleCloseEvent();
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  return (
    <AdminLayout title="Account List">
      <div className="kl-admin-account">
        {/* Dialog for add event */}
        <Dialog open={openEvent} onClose={handleCloseEvent}>
          <DialogTitle color="black" fontSize="24px">
            APPLY EVENT
          </DialogTitle>
          <DialogContent>
            <Input
              required
              value={code}
              onChange={handleChangeEvent}
              placeholder="Input the code event"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleApplyEvent}>OK</Button>
          </DialogActions>
        </Dialog>

        {/* Dialog for delete */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{'Do you want to delete it ?'}</DialogTitle>
          <DialogContent>
            <DialogContentText>{JSON.stringify(selection)}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteProduct} autoFocus style={{ flex: '1' }}>
              Ok
            </Button>
            <Button autoFocus onClick={handleCloseDialog} style={{ flex: '1' }}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        <Box display="flex" m="20px" flexDirection="column" width="100%">
          {/* HEADER */}
          <Box display="flex" justifyContent="flex-start" alignItems="center">
            <Introduce title="DASHBOARD" subtitle="Welcome to your dashboard" />
          </Box>

          <div
            className="function"
            style={{
              display: 'flex',
              gap: '6px',
              width: 'fit-content',
              marginLeft: 'auto',
              marginBottom: '10px',
            }}
          >
            <Button
              color="green-500"
              fullWidth
              className="button"
              onClick={() => setOpenEvent(true)}
              style={{
                width: '30px',
                marginLeft: 'auto',
              }}
            >
              <Tooltip title="Apply Event" placement="bottom" arrow>
                <i className="fa-regular fa-gift" />
              </Tooltip>
            </Button>

            <Button
              color="green-500"
              fullWidth
              className="button"
              onClick={() => setOpenDialog(true)}
              style={{
                width: '30px',
                marginLeft: 'auto',
              }}
            >
              <Tooltip title="Import Product" placement="bottom" arrow>
                <i className="fa-regular fa-plus" />
              </Tooltip>
            </Button>

            <Button
              color="green-500"
              fullWidth
              className="button"
              onClick={handleUpdateProduct}
              style={{
                width: '30px',
                marginLeft: 'auto',
              }}
            >
              <Tooltip title="Update Product" placement="bottom" arrow>
                <i className="fa-light fa-pen-to-square" />
              </Tooltip>
            </Button>

            <Button
              color="green-500"
              fullWidth
              disabled={isEmpty(selection)}
              className="button"
              onClick={() => setOpenDialog(true)}
              style={{
                width: '30px',
                marginLeft: 'auto',
              }}
            >
              <i className="fa-regular fa-trash" />
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
              rows={products?.items || []}
              columns={columns}
              loading={isLoading}
              onStateChange={handleChange}
            />
          </Box>
        </Box>
      </div>
    </AdminLayout>
  );
};

export default Products;
