import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import Button from "@mui/material/Button";
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getMonthName = (date) => {
  return monthNames[date.getMonth()];
};

export default function DateSelector(props) {
  const [dateSelectedIndex, setDateSelectedIndex] = useState(0);

  const createDateItems = () => {
    const _today = new Date();
    const monthName = monthNames[_date.getMonth()];

    let today = "Today (" + getMonthName(_today) + " " + _today.getDate() + ")";

    let _yesterday = new Date();
    _yesterday.setDate(_yesterday.getDate() - 1);

    let yesterday =
      "Yesterday (" + getMonthName(_yesterday) + " " + _yesterday.getDate() + ")";


    let _3daysAgo = new Date();
    _3daysAgo.setDate(_3daysAgo.getDate() - 3);

    let past3Days =
      "Past 3 Days (" +
      getMonthName(_3daysAgo) +
      " " +
      _3daysAgo.getDate() +
      " - " +
      getMonthName(_yesterday) +
      " " +
      _yesterday.getDate() +
      ")";


    let _7daysAgo = new Date();
    _7daysAgo.setDate(_7daysAgo.getDate() -7);

    let past7Days =
      "Past 7 Days (" +
      getMonthName(_7daysAgo) +
      " " +
      _7daysAgo.getDate() +
      "-" +
      getMonthName(_yesterday) +
      " " +
     _yesterday.getDate() +
      ")";

    let Mtd =
      "MTD (" + monthName + " 1 - " + monthName + " " + _today.getDate() + ")";

    let customDate = "Use custom date range";

    return [today, yesterday, past3Days, past7Days, Mtd, customDate];
  };

  const [datePickerItems, setDatePickerItems] = useState(createDateItems);

  const handleChange = (event) => {
    setDateSelectedIndex(event.target.value);

    if (event.target.value === 0) {
      props.changeDate(new Date());
    }
    else if (event.target.value === 1) {
      props.changeDate(new Date(new Date().getTime() - 24 * 60 * 60 * 1000));
    }
    else {
      let start;
      let end;
      if (event.target.value === 2) {
        start = new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000);
        end = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
        props.changeDateRange(start, end);
      }
      else if (event.target.value === 3) {
        start = new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000);
        end = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
        props.changeDateRange(start, end);
      }
      else if (event.target.value === 4) {
        let m = new Date();
        start = new Date(m.getFullYear(), m.getMonth(), 1);
        end = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
        props.changeDateRange(start, end);
      }
    }
  };

  const submitCustomDateRange = (value) => {
    const startDate = new Date(value[0].startDate);
    const endDate = new Date(value[0].endDate);

    const startMonthName = monthNames[startDate.getMonth()];
    const endMonthName = monthNames[endDate.getMonth()];

    let string = 'Between ' + startMonthName + " " + startDate.getDate() + " and " + endMonthName + " " + endDate.getDate();
    if (datePickerItems.length === 7) {
      let items = [...datePickerItems];
      items[6] = string;
      setDatePickerItems([...items]);
    } else {
      setDatePickerItems([...datePickerItems, string]);
    }
    setDateSelectedIndex(6);

    props.changeDateRange(startDate, endDate);
  }

  return (
    <Grid item xs={6}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl fullWidth sx={{ maxWidth: "75%", margin: "0 " }}>
            <InputLabel id="demo-simple-select-label">Date</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={0}
              value={dateSelectedIndex}
              label="Date"
              onChange={handleChange}
            >
              {datePickerItems.map((item, index) => {
                return (
                  <MenuItem key={index} value={index}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        {dateSelectedIndex === 5 && <CustomDatePicker submitCustomDateRange={submitCustomDateRange}></CustomDatePicker>}
      </Grid>
    </Grid>
  );
}

const CustomDatePicker = (props) => {
  const [value, setValue] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const submitRange = () => {
    props.submitCustomDateRange(value)
  };

  return (
    <Grid item xs={6}>
      <DateRange
        editableDateInputs={true}
        onChange={(item) => setValue([item.selection])}
        moveRangeOnFirstSelection={false}
        retainEndDateOnFirstSelection={true}
        ranges={value}
      />
      <Button variant="outlined" sx={{ width: "50%", mt: 2 }} onClick={submitRange}>
        Ok
      </Button>
    </Grid>
  );
};
