import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AppBar from "./AppBar";
import DateSelector from "./DateSelector";
import UpdateInfos from "./UpdateInfos";
const appTheme = createTheme();

export default function Home(props) {
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
                <DateSelector></DateSelector>
              <Grid item xs={6}>
                <UpdateInfos/>
              </Grid>
              <Grid item xs={12}>
                <h1 style={{color:'red'}}>Here will be a data grid. But it is not ready for now. I wonder if you like the date picker. </h1>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
