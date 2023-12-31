import AdminLayout from '@/adminLayout';
import { tokens } from '@/adminLayout/theme';
import { useCouponsQuery } from '@/query/coupons/getCoupons';
import Introduce from '@components/compound/Admin/Introduce';
import { Box, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const Coupons = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { data: coupons, isFetching: isLoading } = useCouponsQuery({});

  const columns: any[] = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'code',
      headerName: 'Code',
      type: 'string',
      cellClassName: 'name-column--cell',
      flex: 1,
    },
    {
      field: 'percent_off',
      headerName: 'Percent Off',
      type: 'number',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
      valueFormatter: (params: any) => `${params.value}%`,
    },
    {
      field: 'amount_off',
      headerName: 'Amount Off',
      type: 'number',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
      valueGetter: (params: any) => (params.row.amount_off / 100).toFixed(2),
    },
    {
      field: 'first_time_transaction',
      headerName: 'First Time Transaction',
      type: 'number',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
    },

    {
      field: 'times_redeemed',
      headerName: 'Times Redeemed',
      type: 'number',
      flex: 1,
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: 'max_redemptions',
      headerName: 'First Time Transaction',
      type: 'number',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
    },
  ];

  return (
    <AdminLayout title="Account List">
      <div className="kl-admin-products">
        <Box display="flex" m="20px" flexDirection="column" width="100%">
          {/* HEADER */}
          <Box display="flex" justifyContent="flex-start" alignItems="center">
            <Introduce title="COUPONS MANAGEMENT" subtitle="Welcome to your coupons page" />
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
            <DataGrid
              hideFooter
              rows={coupons?.data || []}
              columns={columns}
              loading={isLoading}
              // onStateChange={handleChange}
              // onRowSelectionModelChange={(params) => {
              //   const newSelectionState = params.map((selectedRowId) => {
              //     const selectedOrder: any = products?.items.find(
              //       (order) => order.id === selectedRowId,
              //     );
              //     return selectedOrder
              //       ? { id: Number(selectedRowId), name: selectedOrder.name }
              //       : { id: Number(selectedRowId), name: selectedOrder.name };
              //   });

              //   setSelection(newSelectionState);
              // }}
            />
          </Box>
        </Box>
      </div>
    </AdminLayout>
  );
};

export default Coupons;
