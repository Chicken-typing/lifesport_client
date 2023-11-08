import { Box, useTheme } from '@mui/material';
import { tokens } from '@/adminLayout/theme';

interface IProgressCircle {
  progress: string | number;
  size?: string | number;
}

const ProgressCircle = ({ progress = 0.75, size = '40' }: IProgressCircle) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const angle = (progress as number) * 360;

  return (
    <Box
      sx={{
        background: `radial-gradient(${colors.primary[400]} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${colors.blueAccent[500]} ${angle}deg 360deg),
            ${colors.greenAccent[500]}`,
        borderRadius: '50%',
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default ProgressCircle;
