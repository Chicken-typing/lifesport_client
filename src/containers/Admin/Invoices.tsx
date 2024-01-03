import AdminLayout from '@/adminLayout';
import { tokens } from '@/adminLayout/theme';
import Introduce from '@components/compound/Admin/Introduce';
import { Button } from '@components/primitive';
import {
  Box,
  Typography,
  useTheme,
  Select,
  SelectChangeEvent,
  FormControl,
  MenuItem,
  Modal,
  Divider,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  useInvoicesQuery,
  TypeInvoices,
  useUpdateStatusMutation,
} from '@/query/invoices/get-invoices';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { isEmpty, isEqual, map } from 'lodash';
import { Tooltip } from '@components/compound';
import { IUpdate } from '@interfaces/app';
import { changeColor } from '@utils/changeColor';

export interface IOrders {
  id: string;
  payment_intent: string;
  shipping_method: string;
  email: string;
  name: string;
  phone: string;
  address: {
    city: string;
    country: string;
    line1: string;
    line2: string;
    postal_code: string;
    state: string;
  };
  currency: string;
  amount_subtotal: number;
  amount_total: number;
  invoice_id: string;
  shipping_cost: number;
  payment_status: string;
  paid_at: string;
  outbound: boolean;
  delivered_at: string;
  ordered_items: [
    {
      brand: string;
      color: string;
      quantity: number;
      amount_tax: number;
      product_id: string;
      amount_total: number;
      product_name: string;
      amount_discount: number;
      amount_subtotal: number;
    },
  ];
}

function Invoices() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [type, setType] = useState<TypeInvoices>('all');
  const [selectedOrder, setSelectedOrder] = useState<IOrders>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selection, setSelection] = useState<IUpdate[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { data: invoices, isLoading } = useInvoicesQuery({ type });
  const { mutateAsync: updateMutation } = useUpdateStatusMutation();

  const orderLists = invoices?.order_lists || [];

  const handleCellClick = (params: any, event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const orderId = params.id;
    const order = invoices?.order_lists?.find((item) => item.id === orderId);

    if (order) {
      setSelectedOrder(order);
      setIsModalOpen(true);
      event?.stopPropagation();
    }
  };

  const filterOrdersByType = (orders: IOrders[], type: TypeInvoices) => {
    if (type === 'all') {
      return orders;
    }
    if (type === 'inbound') {
      return orders.filter((order) => order.outbound === false);
    }
    if (type === 'outbound') {
      return orders.filter((order) => order.outbound === true);
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
      field: 'address',
      headerName: 'Country',
      flex: 1,
      cellClassName: 'name-column--cell',
      renderCell: ({ row: { address } }: any) => {
        return <Typography sx={{ ml: '5px' }}>{address?.country || 'N/A'}</Typography>;
      },
    },
    {
      field: 'phone',
      headerName: 'Phone',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'amount_total',
      headerName: 'Total',
      flex: 1,
      cellClassName: 'name-column--cell',
      renderCell: ({ row: { amount_total } }: any) => {
        return (
          <Typography sx={{ ml: '5px' }}>
            {(amount_total / 100).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2,
            })}
          </Typography>
        );
      },
    },
    {
      field: 'outbound',
      headerName: 'Status',
      flex: 1,
      renderCell: ({ row: { outbound } }: any) => {
        return (
          <div onClick={(e) => e.stopPropagation()}>
            <Button
              style={{ maxWidth: '114px' }}
              color={outbound ? 'green-500' : 'success'}
              fullWidth
              className="button"
            >
              <Typography color={colors.primary} sx={{ ml: '5px' }}>
                {outbound ? 'Outbound' : 'Inbound'}
              </Typography>
            </Button>
          </div>
        );
      },
    },
  ];

  const handleChangeStatus = (event: React.MouseEvent<HTMLElement>, newAlignment: TypeInvoices) => {
    if (newAlignment !== null) {
      setType(newAlignment);
    }
  };

  const handleCloseDialog = () => setOpenDialog(false);

  const handleUpdateStatus = () => {
    if (selection) {
      updateMutation(selection).then((response: any) => {
        handleCloseDialog();
      });
    }
  };

  return (
    <AdminLayout title="Account List">
      <div className="kl-admin-invoices">
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
            {'Do you want to update it ?'}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleUpdateStatus} autoFocus style={{ flex: '1' }}>
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
            <Introduce title="INVOICES" subtitle="Welcome to invoices page" />
          </Box>

          <ToggleButtonGroup
            color="secondary"
            value={type}
            exclusive
            onChange={handleChangeStatus}
            style={{ marginBottom: '50px' }}
            aria-label="Platform"
          >
            <ToggleButton defaultChecked style={{ width: '100px' }} value="all">
              All
            </ToggleButton>
            <ToggleButton style={{ width: '100px' }} value="inbound">
              Inbound
            </ToggleButton>
            <ToggleButton style={{ width: '100px' }} value="outbound">
              Outbound
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
              disabled={isEmpty(selection)}
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
              checkboxSelection={type !== 'all'}
              onRowClick={(params: any) => handleCellClick(params)}
              hideFooter
              rows={filterOrdersByType(orderLists, type) || []}
              columns={columns}
              loading={isLoading}
              // onStateChange={handleChange}
              onRowSelectionModelChange={(params) => {
                const newSelectionState: IUpdate[] = map(params, (selectedRowId) => {
                  const selectedOrder = invoices?.order_lists?.find(
                    (order) => order?.id === selectedRowId,
                  );
                  return selectedOrder
                    ? { id: String(selectedRowId), deliver: !selectedOrder.outbound }
                    : { id: String(selectedRowId), deliver: false };
                });

                setSelection(newSelectionState);
              }}
            />
          </Box>
        </Box>
      </div>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            maxHeight: '500px',
            maxWidth: '1000px',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          {/* Hiển thị thông tin chi tiết của đơn hàng tại đây */}
          <Typography variant="h3" gutterBottom>
            Order Details
          </Typography>
          <Grid display="flex" justifyContent="space-between" maxHeight="400px" container>
            <Box sx={{ flex: '1', maxHeight: '100%' }}>
              <Typography variant="h5" mb="20px">
                User Information
              </Typography>
              <Typography variant="body1">{`ID: ${selectedOrder?.id || ''}`}</Typography>
              <Typography variant="body1">{`Email: ${selectedOrder?.email || ''}`}</Typography>
              <Typography variant="body1">{`Name: ${selectedOrder?.name || ''}`}</Typography>
              <Typography variant="body1">{`Phone: ${selectedOrder?.phone || ''}`}</Typography>
              <Typography variant="body1">{`City: ${
                selectedOrder?.address?.city || ''
              }`}</Typography>
              <Typography variant="body1">{`Country: ${
                selectedOrder?.address?.country || ''
              }`}</Typography>
              <Typography variant="body1">{`Street: ${
                selectedOrder?.address?.line1 || ''
              }`}</Typography>
              <Typography variant="body1">{`Postal Code: ${
                selectedOrder?.address?.postal_code || ''
              }`}</Typography>
              <Typography variant="body1">{`State: ${
                selectedOrder?.address?.state || ''
              }`}</Typography>
            </Box>

            <Divider orientation="vertical" flexItem></Divider>

            <Box sx={{ flex: '1', marginLeft: '20px', maxHeight: '400px' }}>
              <Typography variant="h5" mb="20px">
                Delivery Information
              </Typography>
              <Typography variant="body1">{`Currency: ${
                selectedOrder?.currency || ''
              }`}</Typography>
              <Typography variant="body1">{`Sub Total: ${
                selectedOrder?.amount_subtotal || ''
              }`}</Typography>
              <Typography variant="body1">{`Shipping Cost: ${selectedOrder?.shipping_cost.toLocaleString(
                'en-US',
                {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 2,
                },
              )}`}</Typography>

              <Typography variant="body1">{`Payment Status: ${
                selectedOrder?.payment_status || ''
              }`}</Typography>
              <Typography variant="body1">{`Paid at: ${
                selectedOrder?.paid_at
                  ? format(new Date(Number(selectedOrder?.paid_at) * 1000), 'dd/MM/yyyy')
                  : 'N/A'
              }`}</Typography>

              <Typography variant="body1">{`Status: ${
                selectedOrder?.outbound ? 'Deliver' : 'Shipping'
              }`}</Typography>
              {isEmpty(selectedOrder?.delivered_at) ? (
                ''
              ) : (
                <div>
                  <Typography variant="body1">{`Delivered at: ${
                    selectedOrder?.delivered_at
                      ? format(new Date(Number(selectedOrder?.delivered_at) * 1000), 'dd/MM/yyyy')
                      : 'N/A'
                  }`}</Typography>
                </div>
              )}
            </Box>

            <Divider orientation="vertical" flexItem></Divider>

            <Box sx={{ flex: '1', marginLeft: '20px', maxWidth: '400px', overflowY: 'scroll' }}>
              <Typography variant="h5" mb="20px">
                Products Information
              </Typography>
              {map(selectedOrder?.ordered_items, (item, idx) => {
                return (
                  <Box key={idx}>
                    <Typography key={idx} variant="body1">{`Product ID: ${
                      item?.product_id || ''
                    }`}</Typography>
                    <Typography key={idx} variant="body1">{`Product Name: ${
                      item?.product_name || ''
                    }`}</Typography>
                    <Typography key={idx} variant="body1">{`Brand: ${
                      item?.brand || ''
                    }`}</Typography>
                    <Typography key={idx} variant="body1">{`Color: ${
                      changeColor(item?.color) || ''
                    }`}</Typography>
                    <Typography key={idx} variant="body1">{`Quantity: ${
                      item?.quantity || ''
                    }`}</Typography>
                    <Typography key={idx} variant="body1">{`Amount Tax: ${
                      item?.amount_tax || ''
                    }`}</Typography>

                    <Typography key={idx} variant="body1">{`Amount Subtotal: ${
                      item?.amount_subtotal.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 2,
                      }) || ''
                    }`}</Typography>
                    <Typography key={idx} variant="body1">{`Amount Discount: ${
                      item?.amount_discount.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 2,
                      }) || ''
                    }`}</Typography>

                    <Typography key={idx} variant="body1">{`Amount Total: ${
                      item?.amount_total.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 2,
                      }) || ''
                    }`}</Typography>

                    <Divider
                      style={{ marginBottom: '10px', marginTop: '10px' }}
                      orientation="horizontal"
                      flexItem
                    ></Divider>
                  </Box>
                );
              })}
            </Box>
          </Grid>
        </Box>
      </Modal>
    </AdminLayout>
  );
}

export default Invoices;
