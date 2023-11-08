import { Typography, Box, useTheme } from '@mui/material';
import { tokens } from '@/adminLayout/theme';

interface Introduce {
  title: string;
  subtitle: string;
}

const Introduce = ({ title, subtitle }: Introduce) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{
          m: '0 0 5px 0',
          '@media (max-width: 768px)': {
            fontSize: '16px',
          },
        }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[400]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Introduce;
