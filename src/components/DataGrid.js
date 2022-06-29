import MaterialTable from "material-table";
import { createData } from "../services/migrationMiddleware";
import { getReports, setPropsForCallAPI } from "../services/tonicService";
import { Async } from "react-async";
import Box from "@mui/material/Box";

export default function CollapsableDataGrid(props) {
  const convertToCSV = (objArray) => {
    var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
    var str = "";

    for (var i = 0; i < array.length; i++) {
      var line = "";
      for (var index in array[i]) {
        if (line != "") line += ",";

        line += array[i][index];
      }

      str += line + "\r\n";
    }
    console.log(str);
    return str;
  };

  const exportCSVFile = (data) => {

    let headers = {
      date: "date",
      campaign_id: "campaign_id",
      campaign_name: "campaign_name",
      revenueUsd: "revenueUsd",
      device: "device",
      subid1: "subid1",
      subid2: "subid2",
      subid3: "subid3",
      adtitle: "adtitle",
      clicks: "clicks",
      network: "network",
      site: "site",
      subid4: "subid4",
      keyword: "keyword",
      timestamp: "timestamp"
    }
    data.unshift(headers);
    let csv = convertToCSV(data);

    let exportedFilename = "Intraday Reporting.csv";

    var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, exportedFilename);
    } else {
      var link = document.createElement("a");
      if (link.download !== undefined) {
        // feature detection
        // Browsers that support HTML5 download attribute
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", exportedFilename);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  return (
    <Async
      promiseFn={() =>
        getReports(props.dateRange, props.date, props.useDateRange)
      }
    >
      {({ data, error, isPending }) => {
        if (isPending) return <Loading />;
        if (error) return <Error />;
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
