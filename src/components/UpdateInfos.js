import {
  formatAMPM,
  formatAMPMWithMinutes,
} from "../services/migrationMiddleware";
export default function UpdateInfos(props) {
  let updatedHour = new Date();
  let hourAMPM = formatAMPMWithMinutes(updatedHour);
  let dateString = updatedHour.toDateString().split(" ");
  dateString = dateString.slice(1, dateString.length).join(" ");
  let updatedString = dateString + ", " + hourAMPM;

  let lastData = props.data.filter(x => +parseFloat(x.revenueUsd).toFixed(2) > 0);
  
  
  lastData = lastData.sort(function (a, b) {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  })[0].timestamp;


  let receivedDate = new Date(Date.parse(lastData));
  let receivedHour = formatAMPMWithMinutes(receivedDate);
  let receivedDateString = receivedDate.toDateString().split(" ");
  receivedDateString = receivedDateString
    .slice(1, receivedDateString.length)
    .join(" ");
  let receivedString = receivedDateString + ", " + receivedHour;

  return (
    <>
      <div className="inline-block-items">
        <h4>Last Updated Hour:</h4>
        <p>{receivedString}</p>
      </div>
      <div className="inline-block-items">
        <h4>Last Update Received:</h4>
        <p>{updatedString}</p>
      </div>
    </>
  );
}
