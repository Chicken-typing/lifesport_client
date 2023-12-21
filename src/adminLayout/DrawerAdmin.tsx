import { Box, Drawer, Typography, useTheme } from '@mui/material';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import Item from './Item';
import { tokens } from './theme';
import LoyaltyIcon from '@mui/icons-material/Loyalty';

interface IDrawerAdmin {
  open: boolean;
  onCloseDrawer: () => void;
}

const DrawerAdmin = ({ open, onCloseDrawer }: IDrawerAdmin) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Drawer anchor="left" open={open}>
      <div className="kl-admin-drawer">
        <Box
          sx={{
            '& .pro-sidebar-inner': {
              background: `${colors.primary[400]} !important`,
            },
            '& .pro-icon-wrapper': {
              backgroundColor: 'transparent !important',
            },
            '& .pro-inner-item': {
              padding: '5px 35px 5px 20px !important',
            },
            '& .pro-inner-item:hover': {
              color: '#868dfb !important',
            },
            '& .pro-menu-item.active': {
              color: '#6870fa !important',
            },
          }}
        >
          <Menu>
            {/* LOGO AND MENU ICON */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <MenuItem
                onClick={onCloseDrawer}
                icon={<CloseOutlinedIcon />}
                style={{
                  margin: '10px 0 20px 0',
                  color: colors.grey[100],
                }}
              ></MenuItem>
            </div>
            <Box>
              <Item title="Dashboard" to="/admin" icon={<HomeOutlinedIcon />} />

              <Item title="Managed Account" to="/admin/account" icon={<PeopleOutlinedIcon />} />
              <Item title="Managed Product" to="/admin/products" icon={<ContactsOutlinedIcon />} />
              <Item title="Invoices Balances" to="/admin/invoices" icon={<ReceiptOutlinedIcon />} />
              <Item title="Managed Coupons" to="/admin/coupons" icon={<LoyaltyIcon />} />
            </Box>
          </Menu>
        </Box>
      </div>
    </Drawer>
  );
};

export default DrawerAdmin;
