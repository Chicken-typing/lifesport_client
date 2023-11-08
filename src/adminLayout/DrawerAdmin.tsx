import React from 'react';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme, Drawer } from '@mui/material';
import Link from 'next/link';
import 'react-pro-sidebar/dist/css/styles.css';

import { tokens } from './theme';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import Image from 'next/image';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

interface ItemProps {
  title: string;
  to: string;
  icon: string | ReactNode;
  selected: string;
  setSelectedItem: Dispatch<SetStateAction<string>>;
}

const Item = ({ title, to, icon, selected, setSelectedItem }: ItemProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelectedItem(title)}
      icon={icon}
    >
      <Link href={to}>
        <Typography>{title}</Typography>
      </Link>
    </MenuItem>
  );
};

interface IDrawerAdmin {
  open: boolean;
  onCloseDrawer: () => void;
}

const DrawerAdmin = ({ open, onCloseDrawer }: IDrawerAdmin) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState<string>('Dashboard');

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
              <Item
                title="Dashboard"
                to="/admin"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelectedItem={setSelected}
              />

              <Typography variant="h6" color={colors.grey[300]} sx={{ m: '15px 0 5px 20px' }}>
                Data
              </Typography>
              <Item
                title="Manage Team"
                to="/admin/charts"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelectedItem={setSelected}
              />
              <Item
                title="Contacts Information"
                to="/contacts"
                icon={<ContactsOutlinedIcon />}
                selected={selected}
                setSelectedItem={setSelected}
              />
              <Item
                title="Invoices Balances"
                to="/invoices"
                icon={<ReceiptOutlinedIcon />}
                selected={selected}
                setSelectedItem={setSelected}
              />

              <Typography variant="h6" color={colors.grey[300]} sx={{ m: '15px 0 5px 20px' }}>
                Pages
              </Typography>
              <Item
                title="Profile Form"
                to="/form"
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelectedItem={setSelected}
              />
              <Item
                title="Calendar"
                to="/calendar"
                icon={<CalendarTodayOutlinedIcon />}
                selected={selected}
                setSelectedItem={setSelected}
              />
              <Item
                title="FAQ Page"
                to="/faq"
                icon={<HelpOutlineOutlinedIcon />}
                selected={selected}
                setSelectedItem={setSelected}
              />

              <Typography variant="h6" color={colors.grey[300]} sx={{ m: '15px 0 5px 20px' }}>
                Charts
              </Typography>
              <Item
                title="Bar Chart"
                to="/bar"
                icon={<BarChartOutlinedIcon />}
                selected={selected}
                setSelectedItem={setSelected}
              />
              <Item
                title="Pie Chart"
                to="/pie"
                icon={<PieChartOutlineOutlinedIcon />}
                selected={selected}
                setSelectedItem={setSelected}
              />
              <Item
                title="Line Chart"
                to="/line"
                icon={<TimelineOutlinedIcon />}
                selected={selected}
                setSelectedItem={setSelected}
              />
              <Item
                title="Geography Chart"
                to="/geography"
                icon={<MapOutlinedIcon />}
                selected={selected}
                setSelectedItem={setSelected}
              />
            </Box>
          </Menu>
        </Box>
      </div>
    </Drawer>
  );
};

export default DrawerAdmin;
