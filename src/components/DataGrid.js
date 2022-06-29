import MaterialTable from "material-table";
import { createData } from "../services/migrationMiddleware";
import { getReports, setPropsForCallAPI } from "../services/tonicService";
import { Async } from "react-async";
import Box from "@mui/material/Box";

export default function CollapsableDataGrid(props) {

  // setPropsForCallAPI(props.dateRange, props.date, props.useDateRange);
  return (
    <Async promiseFn={() => getReports(props.dateRange, props.date, props.useDateRange)}>
      {({ data, error, isPending }) => {
        if (isPending) return <Loading/>;
        if (error) return <Error/>;
        if (data) {
    const tableData = createData(data);

          return (
            <MaterialTable
              title="Report"
              options={{
                search: false,
                padding: "dense",
                headerStyle: { backgroundColor: "#1976d2", color: "#FFF" },
                exportButton: true,
                exportFileName: "Intraday Reporting",
                exportAllData: true,
              }}
              data={tableData}
              columns={[
                { title: "Campaign / Date / Hour / Device", field: "key" },
                { title: "Clicks", field: "clicks" },
                { title: "Revenue", field: "totalRevenue" },
                { title: "RPC", field: "RPC" },
              ]}
              parentChildData={(row, rows) =>
                rows.find((a) => a.id === row.parentId)
              }
            />
          );
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