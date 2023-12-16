import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Menu, MenuItem, ProSidebar } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { cookieStorage } from '../utils/cookieStorage';
import { decodeToken } from '../utils/decode';
import Item from './Item';
import { tokens } from './theme';

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState<string>('Dashboard');

  const token = cookieStorage.getAccessTokenInfo();
  const decoded = decodeToken(token || '');

  return (
    <div className="kl-admin-sidebar">
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
        <ProSidebar collapsed={isCollapsed}>
          <Menu>
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: '10px 0 20px 0',
                color: colors.grey[100],
              }}
            >
              <Box display="flex" justifyContent="center" alignItems="center" ml="15px">
                <Typography variant="h3" color={colors.grey[100]}>
                  LifeTravel
                </Typography>
              </Box>
            </MenuItem>

            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <Image
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src="/images/users.png"
                  style={{ cursor: 'pointer', borderRadius: '50%' }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: '10px 0 0 0' }}
                >
                  {decoded?.name}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {decoded?.role.replace('_', ' ').toUpperCase()}
                </Typography>
              </Box>
            </Box>

            <Box paddingLeft={isCollapsed ? undefined : '10%'}>
              <Item title="Dashboard" to="/admin" icon={<HomeOutlinedIcon />} />

              <Typography variant="h6" color={colors.grey[300]} sx={{ m: '15px 0 5px 20px' }}>
                Data
              </Typography>

              <Item title="Managed Account" to="/admin/account" icon={<PeopleOutlinedIcon />} />
              <Item title="Managed Product" to="/admin/products" icon={<ContactsOutlinedIcon />} />
              <Item title="Invoices Balances" to="/admin/invoices" icon={<ReceiptOutlinedIcon />} />

              {/* <Typography variant="h6" color={colors.grey[300]} sx={{ m: '15px 0 5px 20px' }}>
                Pages
              </Typography>
              <Item title="Create Account" to="/form" icon={<PersonOutlinedIcon />} />
              <Item title="Calendar" to="/calendar" icon={<CalendarTodayOutlinedIcon />} />
              <Item title="FAQ Page" to="/faq" icon={<HelpOutlineOutlinedIcon />} /> */}

              {/* <Typography variant="h6" color={colors.grey[300]} sx={{ m: '15px 0 5px 20px' }}>
                Charts
              </Typography>
              <Item title="Bar Chart" to="/bar" icon={<BarChartOutlinedIcon />} />
              <Item title="Pie Chart" to="/pie" icon={<PieChartOutlineOutlinedIcon />} />
              <Item title="Line Chart" to="/line" icon={<TimelineOutlinedIcon />} />
              <Item title="Geography Chart" to="/geography" icon={<MapOutlinedIcon />} /> */}
            </Box>
          </Menu>
        </ProSidebar>
      </Box>
    </div>
  );
};

export default Sidebar;
