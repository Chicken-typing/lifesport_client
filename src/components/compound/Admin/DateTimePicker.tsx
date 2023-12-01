import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRange } from '@mui/x-date-pickers-pro';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Box } from '@mui/material';
export default function DateTimePicker() {
  type Ranges = 'This Week' | 'This Month' | 'This Year';
  const todays = dayjs();
  const [value, setValue] = React.useState<DateRange<Dayjs>>([todays.startOf('week'), todays]);
  const [range, setRange] = useState<Ranges>('This Week');

  const handleChangeStatus = (event: SelectChangeEvent) => {
    const newRange = event.target.value as Ranges;
    setRange(newRange);

    if (newRange === 'This Week') {
      const today = dayjs();
      setValue([today.startOf('week'), today]);
    } else if (newRange === 'This Month') {
      const today = dayjs();
      setValue([today.startOf('month'), today]);
    } else if (newRange === 'This Year') {
      const today = dayjs();
      setValue([today.startOf('year'), today]);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Range</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={range}
            label="Range"
            onChange={handleChangeStatus}
          >
            <MenuItem value={'This Week'}>This Week</MenuItem>
            <MenuItem value={'This Month'}>This Month</MenuItem>
            <MenuItem value={'This Year'}>This Year</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <DateRangePicker value={value} onChange={(newValue) => setValue(newValue)} />
    </LocalizationProvider>
  );
}
