import AdminLayout from '@/adminLayout';
import { tokens } from '@/adminLayout/theme';
import { useCouponsQuery } from '@/query/coupons/getCoupons';
import Introduce from '@components/compound/Admin/Introduce';
import { Box, ToggleButton, ToggleButtonGroup, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useRefundListQuery } from '@/query/refund/getRefund';
import { map } from 'lodash';
import { useState } from 'react';
import { Button } from '@components/primitive';

type StatusRefund = 'pending' | 'refunded';

const Refund = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { data: refund, isFetching: isLoading } = useRefundListQuery({});

  const [status, setStatus] = useState<StatusRefund>('pending');

  const handleChangeStatus = (event: React.MouseEvent<HTMLElement>, newAlignment: StatusRefund) => {
    if (newAlignment !== null) {
      setStatus(newAlignment);
    }
  };

  const filterByStatus = (refund: any, status: StatusRefund) => {
    if (status === 'pending') {
      return refund?.filter((item: any) => item?.status === 'pending');
    }
    if (status === 'refunded') {
      return refund?.filter((item: any) => item?.status === 'refunded');
    }
  };
  const getRowId = (row: any) => row?.order_id;

  const columns: any[] = [
    { field: 'order_id', headerName: 'Order ID' },
    {
      field: 'name',
      headerName: 'Name',
      type: 'string',
      cellClassName: 'name-column--cell',
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Email',
      type: 'string',
      cellClassName: 'name-column--cell',
      flex: 1,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      type: 'string',
      cellClassName: 'name-column--cell',
      flex: 1,
    },
    {
      field: 'message',
      headerName: 'Message',
      type: 'string',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Status',
      type: 'string',
      cellClassName: 'name-column--cell',
      flex: 1,
    },
  ];

  if (status === 'pending') {
    columns.push({
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: ({ row: { id, role } }: any) => {
        return (
          <div className="action-group">
            <Button onClick={() => {}} color="green-500" fullWidth className="button">
              <i className="fa-regular fa-pen-to-square"></i>
            </Button>

            <Button
              // onClick={() => {
              //   setSelection({ id, role });
              //   setOpenDialogAdmin(true);
              // }}
              color="green-500"
              fullWidth
              className="button"
            >
              <i className="fa-regular fa-trash"></i>
            </Button>
          </div>
        );
      },
    });
  }

  return (
    <AdminLayout title="Refund List">
      <div className="kl-admin-products">
        <Box display="flex" m="20px" flexDirection="column" width="100%">
          {/* HEADER */}
          <Box display="flex" justifyContent="flex-start" alignItems="center">
            <Introduce title="RETURN-REFUND MANAGEMENT" subtitle="Welcome to return-refund page" />
          </Box>

          <ToggleButtonGroup
            color="secondary"
            value={status}
            exclusive
            onChange={handleChangeStatus}
            style={{ marginBottom: '50px' }}
            aria-label="Platform"
          >
            <ToggleButton defaultChecked style={{ width: '100px' }} value="pending">
              PENDING
            </ToggleButton>
            <ToggleButton style={{ width: '100px' }} value="refunded">
              REFUNDED
            </ToggleButton>
          </ToggleButtonGroup>

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
              rows={filterByStatus(refund?.data, status) || []}
              columns={columns}
              loading={isLoading}
              getRowId={getRowId}
            />
          </Box>
        </Box>
      </div>
    </AdminLayout>
  );
};

export default Refund;
