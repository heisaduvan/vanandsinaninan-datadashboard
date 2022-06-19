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
import MaterialTable from "material-table";
import { createData } from "../services/migrationMiddleware";

export default function CollapsableDataGrid() {
  const data = createData();
  return (
    <MaterialTable
      title="Report"
      options={{
        search: false,
        padding: "dense",
        headerStyle: { backgroundColor: "#1976d2", color: "#FFF" },
        exportButton: true,
        exportFileName: "Intraday Reporting",
        exportAllData: true
      }}
      data = {data}
      columns={[
        { title: "Campaign / Date / Hour / Device", field: "key" },
        { title: "Clicks", field: "clicks"},
        { title: "Revenue", field: "totalRevenue" },
        { title: "RPC", field: "RPC" },

      ]}
      parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
    />
  );
}
