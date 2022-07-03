import MaterialTable from "material-table";
// import { createData } from "../services/migrationMiddleware";
import { createData, } from "../services/migrationMiddleware2";
import { getReports } from "../services/tonicService";
import { Async } from "react-async";
import Box from "@mui/material/Box";
import { exportCSVFile } from "../tools/CsvConterter";
import Grid from "@mui/material/Grid";
import UpdateInfos from "./UpdateInfos";

export default function CollapsableDataGrid(props) {
  return (
    <Async
      promiseFn={() =>
        getReports(props.dateRange, props.date, props.useDateRange)
      }
    >
      {({ data, error, isPending }) => {
        if (isPending) return <Grid item xs = {12}><Loading /></Grid>;
        if (error) return <Grid item xs = {12}><Error /></Grid>;;
        if (data) {
          const tableData = createData(data);
          return (<>
            <Grid item xs={6}>
              <UpdateInfos data={data} />
            </Grid>
            <Grid item xs={12}>
              <MaterialTable
                title="Report"
                options={{
                  search: false,
                  padding: "dense",
                  headerStyle: { backgroundColor: "#1976d2", color: "#FFF" },
                  exportButton: true,
                  exportFileName: "Intraday Reporting",
                  exportAllData: true,
                  exportCsv: (columns, _data) => {
                    exportCSVFile(data);
                  },
                }}
                data={tableData}
                columns={[
                  {
                    title:
                      "Campaign / Date / Hour / Device / SubId 2 / Keyword / Site",
                    field: "key",
                  },
                  { title: "Clicks", field: "clicks" },
                  { title: "Revenue", field: "totalRevenue" },
                  { title: "RPC", field: "RPC" },
                ]}
                parentChildData={(row, rows) =>
                  rows.find((a) => a.id === row.parentId)
                }
              />
            </Grid>
          </>);
        }
      }}
    </Async>
  );
}

const Loading = () => {
  return (
    <Box sx={{ m: "auto", mt: 20 }}>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Box>
  );
};

const Error = () => {
  return (
    <Box sx={{ m: "auto", mt: 20 }}>
      <h2 style={{ color: "red" }}>
        Something went wrong. Container dashboard data could not get.
      </h2>
    </Box>
  );
};
