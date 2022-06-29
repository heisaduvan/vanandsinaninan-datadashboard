import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AppBar from "./AppBar";
import DateSelector from "./DateSelector";
import UpdateInfos from "./UpdateInfos";
import CollapsableDataGrid from "./DataGrid";
const appTheme = createTheme();

export default function Home(props) {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [date, setDate] = useState(new Date());
  const [useDateRange, setUseDateRange] = useState(false);
  const changeDateRange = (start, end) => {
    setDateRange([start, end]);
    setUseDateRange(true);
  };

  const changeDate = (date) => {
    setDate(date);
    setUseDateRange(false);
  };

  return (
    <ThemeProvider theme={appTheme}>
      <Box sx={{ display: "flex" }}>
        <AppBar position="fixed">
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              TONIC Intraday Reporting
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="xl" sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <DateSelector
                changeDateRange={changeDateRange}
                changeDate={changeDate}
              ></DateSelector>
              <Grid item xs={6}>
                <UpdateInfos />
              </Grid>
              <Grid item xs={12}>
                <CollapsableDataGrid dateRange = {dateRange} date={date} useDateRange = {useDateRange}></CollapsableDataGrid>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
