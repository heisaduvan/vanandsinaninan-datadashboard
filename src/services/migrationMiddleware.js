let reportsTracking = [];
const createData = (_reportsTracking) => {
  _reportsTracking = _reportsTracking.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
  reportsTracking = _reportsTracking;
  let id = 0;
  let arr = [];
  let campaignIds = _reportsTracking.map((item) => ({
    campaign_id: item.campaign_id,
    campaign_name: item.campaign_name,
  }));

  campaignIds = [...new Set(campaignIds)];
  let distinctIdTemp = [];
  let distinctCampaignTemp = [];

  campaignIds.forEach((campaign) => {
    if (!distinctIdTemp.includes(campaign.campaign_id)) {
      distinctIdTemp.push(campaign.campaign_id);
      distinctCampaignTemp.push(campaign);
    }
  });

  campaignIds = distinctCampaignTemp;

  campaignIds.forEach((campaign) => {
    let obj = {
      key: campaign.campaign_name,
    };
    let totalRevenueInCampaign = 0;
    let totalClicks = 0;
    let objDaysTotalRevenueAndClicks = [];

    _reportsTracking.forEach((item) => {
      if (item.campaign_id === campaign.campaign_id) {
        totalRevenueInCampaign += +item.revenueUsd;
        totalClicks += +item.clicks;
        objDaysTotalRevenueAndClicks.push({
          dateOfDay: item.date,
          totalRevenue: +item.revenueUsd,
          clicks: +item.clicks,
        });
      }
    });

    obj.id = id++;
    obj.totalRevenue = +parseFloat(totalRevenueInCampaign).toFixed(2);
    obj.clicks = totalClicks;
    arr.push(obj);

    let days = getDailyReports(
      objDaysTotalRevenueAndClicks,
      campaign.campaign_id
    );

    days.forEach((day) => {
      let dayObj = {
        parentId: obj.id,
        key: day.dateOfDay,
        totalRevenue: day.totalRevenue,
        clicks: day.clicks,
        id: id++,
      };
      arr.push(dayObj);

      day.hours.forEach((hour) => {
        let hourObj = {
          parentId: dayObj.id,
          key: hour.hourRange,
          totalRevenue: hour.totalRevenue,
          clicks: hour.clicks,
          id: id++,
        };
        arr.push(hourObj);

        hour.devices.forEach((device) => {
          let deviceObj = {
            parentId: hourObj.id,
            key: device.deviceType,
            totalRevenue: device.totalRevenue,
            clicks: device.clicks,
            id: id++,
          };
          arr.push(deviceObj);
        });
      });
    });
  });

  arr.forEach((item) => {
    let rpcValue = item.totalRevenue / item.clicks;
    item["RPC"] = +parseFloat(rpcValue).toFixed(2);
  });

  return arr;
};

const getDailyReports = (objDaysAndTotalRevenueAndClicks, campaign_id) => {
  let dayObj = groupBy(
    objDaysAndTotalRevenueAndClicks,
    "dateOfDay",
    "totalRevenue"
  );
  let dayObj2 = groupBy(objDaysAndTotalRevenueAndClicks, "dateOfDay", "clicks");

  let days = Object.keys(dayObj);
  let revenues = Object.values(dayObj);
  let clicks = Object.values(dayObj2);
  let dailyReport = [];
  days.forEach((day, index) => {
    let obj = {
      hours: [],
      dateOfDay: day,
      totalRevenue: +parseFloat(
        revenues[index].reduce((partialSum, a) => partialSum + a, 0)
      ).toFixed(2),
      clicks: +parseFloat(
        clicks[index].reduce((partialSum, a) => partialSum + a, 0)
      ).toFixed(2),
    };

    let hours = [];
    reportsTracking.forEach((item) => {
      if (item.date === day && item.campaign_id === campaign_id) {
        hours.push({
          hourRange: formatAMPM(new Date(item.timestamp)),
          totalRevenue: +parseFloat(item.revenueUsd).toFixed(2),
          clicks: +parseFloat(item.clicks).toFixed(2),
        });
      }
    });

    obj = getHourlyReports(obj, hours, campaign_id, day);
    dailyReport.push(obj);
  });
  return dailyReport;
};

const getHourlyReports = (dailyReport, hours, campaign_id, day) => {
  let hoursObj = groupBy(hours, "hourRange", "totalRevenue");
  let hoursObj2 = groupBy(hours, "hourRange", "clicks");

  let _hours = Object.keys(hoursObj);
  let hoursRevenues = Object.values(hoursObj);
  let hoursClicks = Object.values(hoursObj2);

  _hours.forEach((hour, index) => {
    let hourlyObj = {
      hourRange: hour,
      devices: [],
      totalRevenue: +parseFloat(
        hoursRevenues[index].reduce((partialSum, a) => partialSum + a, 0)
      ).toFixed(2),
      clicks: +parseFloat(
        hoursClicks[index].reduce((partialSum, a) => partialSum + a, 0)
      ).toFixed(2),
    };

    let devices = [];
    reportsTracking.forEach((item) => {
      if (
        formatAMPM(new Date(item.timestamp)) === hour &&
        item.campaign_id === campaign_id &&
        item.date === day
      ) {
        devices.push({
          deviceType: item.device,
          totalRevenue: +parseFloat(item.revenueUsd).toFixed(2),
          clicks: +parseFloat(item.clicks).toFixed(2),
        });
      }
    });

    let devicesObj = groupBy(devices, "deviceType", "totalRevenue");
    let devicesObj2 = groupBy(devices, "deviceType", "clicks");
    let deviceTypes = Object.keys(devicesObj);
    let deviceRevenues = Object.values(devicesObj);
    let deviceClicks = Object.values(devicesObj2);

    deviceTypes.forEach((deviceType, index) => {
      let deviceObj = {
        deviceType: deviceType,
        totalRevenue: +parseFloat(
          deviceRevenues[index].reduce((partialSum, a) => partialSum + a, 0)
        ).toFixed(2),
        clicks: +parseFloat(
          deviceClicks[index].reduce((partialSum, a) => partialSum + a, 0)
        ).toFixed(2),
      };

      hourlyObj.devices.push(deviceObj);
    });

    dailyReport.hours.push(hourlyObj);
  });

  return dailyReport;
};

const groupBy = function (xs, key, value) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x[value]);
    return rv;
  }, {});
};

function formatAMPM(date) {
  var hours = date.getHours();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  var strTime = hours + " " + ampm;
  return strTime.toUpperCase();
}

function formatAMPMWithMinutes(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime.toUpperCase();
}

export { createData, formatAMPM, formatAMPMWithMinutes };
