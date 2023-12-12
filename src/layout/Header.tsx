import TopMenu from './TopMenu';
import MidMenu from './MidMenu';
import MainMenu from './MainMenu';
import HeaderDrawer from '@components/compound/Drawer/HeaderDrawer';
import { useState } from 'react';

export default function Header() {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="kl-header-layout">
      <div className="icon -bottom"></div>
      <div className="icon -top"></div>
      <div className="kl-container">
        <TopMenu />
        <MidMenu openHeader={handleOpen} />
        <MainMenu />
        <HeaderDrawer open={open} onClose={handleClose} />
      </div>
    </div>
  );
}
