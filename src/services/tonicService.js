import { SettingsBackupRestoreSharp } from "@material-ui/icons";

const reportTrackingPath =
  "https://tonicapiv2-56z35.ondigitalocean.app/reports";

const getDateFormat = (date) => {
  var mm = date.getMonth() + 1; // getMonth() is zero-based
  var dd = date.getDate();

  return [
    date.getFullYear(),
    (mm > 9 ? "" : "0") + mm,
    (dd > 9 ? "" : "0") + dd,
  ].join("-");
};

// let dateRange = [];
// let date = null;
// let useDateRange = false;

function setPropsForCallAPI(_dateRange, _date, _useDateRange) {
  // dateRange = _dateRange;
  // date = _date;
  // useDateRange = _useDateRange;
}

function getReports(dateRange, date, useDateRange) {
  let path =
    reportTrackingPath +
    "?from=" +
    getDateFormat(dateRange[0]) +
    "&to=" +
    getDateFormat(dateRange[1]);
  if (useDateRange) path = path + "&date=no";
  else path = path + "&date=" + getDateFormat(date);

  console.log(path);
  return fetch(path, { method: "GET" })
    .then((res) => (res.ok ? res : Promise.reject(res)))
    .then((res) => res.json());
}

export { getReports, setPropsForCallAPI };
