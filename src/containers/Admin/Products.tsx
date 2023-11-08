import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '@/adminLayout/theme';

import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import { mockDataTeam } from '@components/compound/Admin/constants';
import AdminLayout from '@/adminLayout';
import Introduce from '@components/compound/Admin/Introduce';
import { useProductsQuery } from '@/query/products/get-products';
import { Button } from '@components/primitive';

const Products = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { data: products, isFetching: isLoading, isError }: any = useProductsQuery({ page: 1 });

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
              <i className="fa-regular fa-trash"></i>
            </Button>

            <Button color="green-500" fullWidth className="button">
              <i className="fa-regular fa-pen-to-square"></i>
            </Button>
          </div>
        );
      },
    },
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
            <DataGrid
              checkboxSelection
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
