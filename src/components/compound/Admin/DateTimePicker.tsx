import { Ranges } from '@interfaces/statistics';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { DateRange } from '@mui/x-date-pickers-pro';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';

type GetStateFunction = (range: DateRange<Dayjs>) => void;

export default function DateTimePicker({ getState }: { getState: GetStateFunction }) {
  const todays = dayjs();

  const [value, setValue] = React.useState<DateRange<Dayjs>>([todays.startOf('week'), todays]);
  const [range, setRange] = useState<Ranges>('This Week');

  const handleChangeStatus = (event: SelectChangeEvent) => {
    const newRange = event.target.value as Ranges;
    setRange(newRange);

    if (newRange === 'This Week') {
      const today = dayjs();
      setValue([today.startOf('week'), today]);
      getState([today.startOf('week'), today]);
    } else if (newRange === 'This Month') {
      const today = dayjs();
      setValue([today.startOf('month'), today]);
      getState([today.startOf('month'), today]);
    } else if (newRange === 'This Year') {
      const today = dayjs();
      setValue([today.startOf('year'), today]);
      getState([today.startOf('year'), today]);
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
      <DateRangePicker
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          getState(newValue);
        }}
      />
    </LocalizationProvider>
  );
}
