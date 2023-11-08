import { Typography, useTheme } from '@mui/material';
import Link from 'next/link';
import { ReactNode } from 'react';
import { MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { tokens } from './theme';
import { useRouter } from 'next/router';
import { isEqual } from 'lodash';

interface ItemProps {
  title: string;
  to: string;
  icon: string | ReactNode;
}

const Item = ({ title, to, icon }: ItemProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const router = useRouter();

  return (
    <MenuItem
      active={isEqual(router?.pathname, to)}
      style={{
        color: colors.grey[100],
      }}
      icon={icon}
    >
      <Link href={to}>
        <Typography>{title}</Typography>
      </Link>
    </MenuItem>
  );
};

export default Item;
