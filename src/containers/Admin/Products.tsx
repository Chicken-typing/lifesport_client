import AdminLayout from '@/adminLayout';
import { tokens } from '@/adminLayout/theme';
import { useProductAdminQuery } from '@/query/products/get-products';
import Introduce from '@components/compound/Admin/Introduce';
import { Button } from '@components/primitive';
import {
  Box,
  useTheme,
  TextField,
  Input,
  Typography,
  Stack,
  Switch,
  SwitchProps,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect, ChangeEvent } from 'react';
import { isEmpty, isEqual, map } from 'lodash';
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
import { useMaintainQuery, useMaintainMutation } from '@/query/maintain/getMaintain';

const Products = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selection, setSelection] = useState<any>({
    id: '',
    name: '',
  });
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openEvent, setOpenEvent] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');

  const router = useRouter();

  const { data: products, isFetching: isLoading, isError } = useProductAdminQuery({});
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
      field: 'primary_price',
      headerName: 'Price',
      flex: 1,
      renderCell: ({ row: { primary_price } }: any) => {
        return (
          <Typography sx={{ ml: '5px' }}>
            {(primary_price / 100).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2,
            })}
          </Typography>
        );
      },
    },
    {
      field: 'brand',
      headerName: 'Brand',
      flex: 1,
      renderCell: ({ row: { brand } }: any) => {
        return <Typography sx={{ ml: '5px' }}>{brand.toUpperCase()}</Typography>;
      },
    },

    {
      field: 'is_achieve',
      headerName: 'Achieved',
      flex: 1,
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: ({ row: { id, name, is_achieve } }: any) => {
        return (
          <div className="action-group">
            <Button
              onClick={() => {
                setSelection({ id: id, name: name });
                setOpenDialog(true);
              }}
              color={is_achieve ? 'danger' : 'green-500'}
              fullWidth
              className="button"
              disabled={is_achieve || !checked}
            >
              <i className="fa-regular fa-trash" />
            </Button>
          </div>
        );
      },
    },
  ];
  const handleCloseDialog = () => setOpenDialog(false);
  const handleCloseEvent = () => setOpenEvent(false);

  const handleDeleteProduct = () => {
    const deleteProduct = async () => {
      try {
        const response: any = await request.request({
          method: 'POST',
          url: '/products/admin/delete',
          data: { product_id: selection?.id },
        });

        if (isEqual(response?.status, 'success')) router.reload();
      } catch (error) {
        console.log(error);
      }

      handleCloseDialog();
    };

    deleteProduct();
  };

  const handleImportProduct = () => {
    const importProduct = async () => {
      try {
        const response: any = await request.request({
          method: 'GET',
          url: '/products/admin/import',
        });

        if (isEqual(response?.status, 'success')) {
          toast.success('Add Product Successfully', { position: 'top-center' });
          router.reload();
        }
      } catch (error) {
        console.log(error);
      }
    };

    importProduct();
  };

  const handleExportProduct = () => {
    const importProduct = async () => {
      try {
        const response: any = await request.request({
          method: 'GET',
          url: '/products/admin/export',
        });

        if (isEqual(response?.status, 'success')) {
          toast.success('Export Successfully', { position: 'top-center' });
          router.reload();
        }
      } catch (error) {
        console.log(error);
      }
    };

    importProduct();
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
          router.reload();
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

  //Handle Maintain

  const { data: maintain, isFetching: loadingMaintain } = useMaintainQuery({});
  const { mutateAsync: maintainMutation, isLoading: maintaining } = useMaintainMutation();
  const [checked, setChecked] = useState<boolean>();

  useEffect(() => {
    if (maintain?.data) {
      setChecked(maintain?.data?.is_maintained);
    }
  }, [maintain?.data]);

  const handleChangeMaintain = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    setChecked(newChecked);
    maintainMutation({ is_maintained: newChecked }).then((response: any) => {
      if (response?.status === 'success') {
        toast.success('Updated maintainace mode.', { position: 'top-center' });
      }
    });
  };

  return (
    <AdminLayout title="Account List">
      <div className="kl-admin-products">
        {/* Dialog for add event */}
        <Dialog
          className="dialog-delete"
          classes={{
            root: 'dialog-root',
            container: 'dialog-container',
            paper: 'dialog-paper',
          }}
          open={openEvent}
          onClose={handleCloseEvent}
        >
          <DialogTitle color="black" fontSize="24px">
            APPLY EVENT
          </DialogTitle>
          <DialogContent>
            <Input
              classes={{
                root: 'input-root',
              }}
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
          className="dialog-delete"
          classes={{
            root: 'dialog-root',
            container: 'dialog-container',
            paper: 'dialog-paper',
          }}
        >
          <DialogTitle className="dialog-title" id="responsive-dialog-title">
            {'Do you want to delete it ?'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText className="dialog-context">
              <Typography>{`Name: ${selection?.name}`}</Typography>
              <Typography>{`ID: ${selection?.id}`}</Typography>
            </DialogContentText>
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
            <Introduce title="PRODUCT MANAGEMENT" subtitle="Welcome to your product page" />
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
            {/* Toggle maintain */}

            <Tooltip title="Maintain Website">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: '50px',
                }}
                className="maintain"
              >
                <Typography>Off</Typography>

                <Switch
                  color="warning"
                  checked={checked}
                  onChange={handleChangeMaintain}
                  inputProps={{ 'aria-label': 'controlled' }}
                />

                <Typography>On</Typography>
              </div>
            </Tooltip>

            {/* Open google sheet */}
            <Button
              color="green-500"
              fullWidth
              className="button"
              onClick={() =>
                window.open(
                  'https://docs.google.com/spreadsheets/d/17d3bpi6VsJU4_cWGMQZIqTfdnA1AUc3ty51RtIg4xQo/edit#gid=0',
                  '_blank',
                )
              }
              style={{
                width: '30px',
                marginLeft: 'auto',
              }}
            >
              <Tooltip title="Open Google Sheet" placement="bottom" arrow>
                <i className="fa-regular fa-file-spreadsheet" />
              </Tooltip>
            </Button>

            {/* Button apply event */}

            <Button
              disabled={!checked}
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

            {/* Button import Product */}

            <Button
              color="green-500"
              fullWidth
              className="button"
              onClick={handleImportProduct}
              style={{
                width: '30px',
                marginLeft: 'auto',
              }}
            >
              <Tooltip title="Import Product" placement="bottom" arrow>
                <i className="fa-regular fa-plus" />
              </Tooltip>
            </Button>

            {/* Button export Product */}

            <Button
              color="green-500"
              fullWidth
              className="button"
              onClick={handleExportProduct}
              style={{
                width: '30px',
                marginLeft: 'auto',
              }}
            >
              <Tooltip title="Export Product" placement="bottom" arrow>
                <i className="fa-regular fa-down-from-line" />
              </Tooltip>
            </Button>

            {/* Button update Product */}

            <Button
              disabled={!checked}
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
              rows={products?.items || []}
              columns={columns}
              loading={isLoading}
            />
          </Box>
        </Box>
      </div>
    </AdminLayout>
  );
};

export default Products;
