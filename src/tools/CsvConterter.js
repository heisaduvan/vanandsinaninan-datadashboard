import { formatAMPMWithMinutes } from "../services/migrationMiddleware";

const convertToCSV = (objArray) => {
  var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
  var str = "";

  for (var i = 0; i < array.length; i++) {
    var line = "";
    for (var index in array[i]) {
      if (line !== "") line += ",";

      line += array[i][index];
    }

    str += line + "\r\n";
  }
  return str;
};

const exportCSVFile = (data) => {
  let migratedData = [];

  data.forEach((row, index) => {
    let obj = {
      date: "",
      hour: "",
      campaign: "",
      device: "",
      subid1: "",
      subid2: "",
      keyword: "",
      site: "",
      clicks: "",
      revenue: "",
      rpc: "",
    };

    obj.date = row.date;
    obj.hour = formatAMPMWithMinutes(new Date(row.timestamp));
    obj.campaign = row.campaign_id + "_" + row.campaign_name;
    obj.device = row.device.toUpperCase();
    obj.subid1 = row.subid1;
    obj.subid2 = row.subid2;
    obj.keyword = row.keyword;
    obj.site = row.site;
    obj.clicks = row.clicks;
    obj.revenue = "$" + row.revenueUsd;
    obj.rpc = parseFloat(row.revenueUsd / row.clicks).toFixed(2);

    migratedData.push(obj);
  });

  let headers = {
    date: "Date",
    hour: "Hour",
    campaign: "Campaign (Campaign ID and Campaign Name)",
    device: "Device (Mobile-Tablet-Desktop)",
    subid1: "SubId1",
    subid2: "SubId2",
    keyword: "Keyword",
    site: "Site",
    clicks: "Clicks",
    revenue: "Revenue",
    rpc: "RPC (Revenue/Clicks)",
  };

  migratedData.unshift(headers);

  let csv = convertToCSV(migratedData);

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

export { exportCSVFile };
