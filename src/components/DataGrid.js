import { forwardRef } from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import MaterialTable, { MTableToolbar } from "material-table";

const sampleData = require("../assets/sampledata.json");

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

export default function CollapsableDataGrid() {
  return (
    <div style={{ maxWidth: "100%", padding: 0, margin: 0 }}>
      <MaterialTable
        options={{
          search: false,
          padding: "dense",
          headerStyle: { backgroundColor: "#1976d2", color: "#FFF" },
          exportButton: true,
          exportFileName: "Intraday Reporting",
          exportAllData: true,
        }}
        columns={[
          { title: "Date", field: "Date" },
          { title: "Hour", field: "Hour" },
          { title: "Campaign", field: "Campaign (Campaign ID and Campaign Name)" },
          {
            title: "Device",
            field: "Device (Mobile, Tablet, Desktop)",
            // lookup: { 34: "Istanbul", 63: "Sanliurfa" },
          },
          { title: "Uniques", field: "Uniques" },
          { title: "Conversions", field: "Conversions" },
          { title: "Revenue", field: "Revenue" },
          { title: "CTR", field: "CTR (Conversions/Uniques)" },
          { title: "CPC", field: "CPC (Revenue/Conversions)" },
          { title: "RPM", field: "RPM ((Revenue/Uniques)*1000))" },
        ]}
        data={sampleData}
        title="Report"
        detailPanel={(rowData) => {
          return (
            <>
              <h1 style={{color:'red'}}>Here will be detail. Not ready for now.</h1>
            </>
          );
        }}
        components={{
          Toolbar: (props) => (
            <div style={{ padding: 0, margin: 0 }}>
              <MTableToolbar {...props} />
            </div>
          ),
        }}
      />
    </div>
  );
}
