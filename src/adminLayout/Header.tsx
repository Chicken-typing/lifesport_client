import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Box, IconButton, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { ColorModeContext, tokens } from './theme';

interface IHeaderProps {
  onOpenDrawer: () => void;
}
const Header = ({ onOpenDrawer }: IHeaderProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const router = useRouter();

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* ICONS */}
      <button onClick={onOpenDrawer} className="kl-header-bugger">
        <Box>
          <IconButton>
            <MenuOutlinedIcon />
          </IconButton>
        </Box>
      </button>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
        </IconButton>
        <IconButton onClick={() => router.push({ pathname: '/' })}>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;
