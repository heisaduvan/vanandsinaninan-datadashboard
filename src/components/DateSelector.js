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
export default function DateSelector(props) {
  const [dateSelectedIndex, setDateSelectedIndex] = useState(0);

  const createDateItems = () => {
    const _date = new Date();
    const monthName = monthNames[_date.getMonth()];
    let today = "Today (" + monthName + " " + _date.getDate() + ")";
    let yesterday =
      "Yesterday (" + monthName + " " + (_date.getDate() - 1) + ")";
    let past3Days =
      "Past 3 Days (" +
      monthName +
      " " +
      (_date.getDate() - 3) +
      " - " +
      monthName +
      " " +
      (_date.getDate() - 1) +
      ")";
    let past7Days =
      "Past 7 Days (" +
      monthName +
      " " +
      (_date.getDate() - 6) +
      "-" +
      monthName +
      " " +
      (_date.getDate() - 1) +
      ")";
    let Mtd =
      "MTD (" + monthName + " 1 - " + monthName + " " + _date.getDate() + ")";

    let customDate = "Use custom date range";

    return [today, yesterday, past3Days, past7Days, Mtd, customDate];
  };

  const [datePickerItems, setDatePickerItems] = useState(createDateItems);

  const handleChange = (event) => {
    setDateSelectedIndex(event.target.value);
  };

  const submitCustomDateRange = (value) => {
    const startDate = new Date(value[0].startDate);
    const endDate = new Date(value[0].endDate);

    const startMonthName = monthNames[startDate.getMonth()];
    const endMonthName = monthNames[endDate.getMonth()];

    let string = 'Between ' + startMonthName + " "+ startDate.getDate() + " and " + endMonthName + " "+ endDate.getDate();
    if(datePickerItems.length === 7){
        let items = [...datePickerItems];
        items[6] = string;
        setDatePickerItems([...items]);
    }else{
        setDatePickerItems([...datePickerItems, string]);
    }
    setDateSelectedIndex(6);
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
        {dateSelectedIndex === 5 && <CustomDatePicker submitCustomDateRange = {submitCustomDateRange}></CustomDatePicker>}
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
