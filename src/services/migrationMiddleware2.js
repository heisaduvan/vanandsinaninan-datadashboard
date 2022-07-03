const createData = (reportsTracking) => {
  let campaigns = getCampaigns(reportsTracking);
  let migratedData = [];
  let index = 0;
  for (let i = 0; i < campaigns.length; i++) {
    let filteredByCampaign = reportsTracking.filter(
      (x) => x.campaign_id === campaigns[i].campaign_id
    );
    let revenueAndClicks = getRevenueAndClicks(filteredByCampaign);

    let campaignInfo = {
      id: index++,
      key: campaigns[i].campaign_name,
      ...revenueAndClicks,
    };
    migratedData.push(campaignInfo);

    let dates = getDatesByCampaign(reportsTracking, campaigns[i].campaign_id);

    for (let j = 0; j < dates.length; j++) {
      let filteredByCampaignAndDate = reportsTracking.filter(function (x) {
        return (
          x.campaign_id === campaigns[i].campaign_id && dates[j] === x.date
        );
      });
      let revenueAndClicksForDate = getRevenueAndClicks(
        filteredByCampaignAndDate
      );

      let dateInfo = {
        parentId: campaignInfo.id,
        id: index++,
        key: dates[j],
        ...revenueAndClicksForDate,
      };
      migratedData.push(dateInfo);

      let hoursByCampaignAndDate = getHoursByCampaignAndDate(
        reportsTracking,
        campaigns[i].campaign_id,
        dates[j]
      );

      for (let k = 0; k < hoursByCampaignAndDate.length; k++) {
        let filteredByDateAndHour = reportsTracking.filter(
          (x) =>
            x.campaign_id === campaigns[i].campaign_id &&
            dates[j] === x.date &&
            hoursByCampaignAndDate[k] === formatAMPM(new Date(x.timestamp))
        );
        let revenueAndClicksForHours = getRevenueAndClicks(
          filteredByDateAndHour
        );

        let hourInfo = {
          parentId: dateInfo.id,
          id: index++,
          key: hoursByCampaignAndDate[k],
          ...revenueAndClicksForHours,
        };
        migratedData.push(hourInfo);

        let devicesByCampaignDatesAndHours = getDevicesByCampaignDatesAndHours(
          reportsTracking,
          campaigns[i].campaign_id,
          dates[j],
          hoursByCampaignAndDate[k]
        );

        for (let l = 0; l < devicesByCampaignDatesAndHours.length; l++) {
          let filteredByHourAndDevice = reportsTracking.filter(
            (x) =>
              x.campaign_id === campaigns[i].campaign_id &&
              dates[j] === x.date &&
              hoursByCampaignAndDate[k] === formatAMPM(new Date(x.timestamp)) &&
              devicesByCampaignDatesAndHours[l] === x.device
          );
          let revenueAndClicksForDevice = getRevenueAndClicks(
            filteredByHourAndDevice
          );

          let deviceInfo = {
            parentId: hourInfo.id,
            id: index++,
            key: devicesByCampaignDatesAndHours[l],
            ...revenueAndClicksForDevice,
          };
          migratedData.push(deviceInfo);

          let subId2sByDateHourAndDevice = getSubId2sByDateHourAndDevices(
            reportsTracking,
            campaigns[i].campaign_id,
            dates[j],
            hoursByCampaignAndDate[k],
            devicesByCampaignDatesAndHours[l]
          );

          for (let m = 0; m < subId2sByDateHourAndDevice.length; m++) {
            let filteredByDeviceAndSubId2 = reportsTracking.filter(
              (x) =>
                x.campaign_id === campaigns[i].campaign_id &&
                dates[j] === x.date &&
                hoursByCampaignAndDate[k] ===
                  formatAMPM(new Date(x.timestamp)) &&
                devicesByCampaignDatesAndHours[l] === x.device &&
                x.subid2 === subId2sByDateHourAndDevice[m]
            );
            let revenueAndClicksForSubId2 = getRevenueAndClicks(
              filteredByDeviceAndSubId2
            );
            let subId2Info = {
              parentId: deviceInfo.id,
              id: index++,
              key: subId2sByDateHourAndDevice[m],
              ...revenueAndClicksForSubId2,
            };
            migratedData.push(subId2Info);

            let keywords = getDistinctKeywords(
              reportsTracking,
              campaigns[i].campaign_id,
              dates[j],
              hoursByCampaignAndDate[k],
              devicesByCampaignDatesAndHours[l],
              subId2sByDateHourAndDevice[m]
            );

            for (let n = 0; n < keywords.length; n++) {
              let filteredBySubId2 = reportsTracking.filter(
                (x) =>
                  x.campaign_id === campaigns[i].campaign_id &&
                  dates[j] === x.date &&
                  hoursByCampaignAndDate[k] ===
                    formatAMPM(new Date(x.timestamp)) &&
                  devicesByCampaignDatesAndHours[l] === x.device &&
                  x.subid2 === subId2sByDateHourAndDevice[m] &&
                  x.keyword === keywords[n]
              );

              let revenueAndClicksForKeyword =
                getRevenueAndClicks(filteredBySubId2);

              let keywordInfo = {
                parentId: subId2Info.id,
                id: index++,
                key: keywords[n],
                ...revenueAndClicksForKeyword,
              };
              migratedData.push(keywordInfo);

              let sites = getDistinctSites(
                reportsTracking,
                campaigns[i].campaign_id,
                dates[j],
                hoursByCampaignAndDate[k],
                devicesByCampaignDatesAndHours[l],
                subId2sByDateHourAndDevice[m],
                keywords[n]
              );

              for (let o = 0; o < sites.length; o++) {
                let filteredByKeyword = reportsTracking.filter(
                  (x) =>
                    x.campaign_id === campaigns[i].campaign_id &&
                    dates[j] === x.date &&
                    hoursByCampaignAndDate[k] ===
                      formatAMPM(new Date(x.timestamp)) &&
                    devicesByCampaignDatesAndHours[l] === x.device &&
                    x.subid2 === subId2sByDateHourAndDevice[m] &&
                    x.keyword === keywords[n] &&
                    x.site === sites[o]
                );

                let revenueAndClicksForSites =
                getRevenueAndClicks(filteredByKeyword);

                let siteInfo = {
                    parentId: keywordInfo.id,
                    id: index++,
                    key: sites[o],
                    ...revenueAndClicksForSites,
                  };
                  migratedData.push(siteInfo);
              }
            }
          }
        }
      }
    }
  }
  return migratedData;
};

const getCampaigns = (reportsTracking) => {
  let flags = [];
  let output = [];

  for (let i = 0; i < reportsTracking.length; i++) {
    if (flags[reportsTracking[i].campaign_id]) continue;
    flags[reportsTracking[i].campaign_id] = true;
    output.push({
      campaign_id: reportsTracking[i].campaign_id,
      campaign_name: reportsTracking[i].campaign_name,
    });
  }
  return output;
};

const getDatesByCampaign = (reportsTracking, campaignId) => {
  let flags = [];
  let output = [];

  let filteredData = reportsTracking.filter(
    (x) => x.campaign_id === campaignId
  );

  for (let i = 0; i < filteredData.length; i++) {
    if (flags[filteredData[i].date]) continue;
    flags[filteredData[i].date] = true;
    output.push(filteredData[i].date);
  }
  return output;
};

const getHoursByCampaignAndDate = (reportsTracking, campaignId, date) => {
  const priorityOfHours = {
    "12AM": 0,
    "1AM": 1,
    "2AM": 2,
    "3AM": 3,
    "4AM": 4,
    "5AM": 5,
    "6AM": 6,
    "7AM": 7,
    "8AM": 8,
    "9AM": 9,
    "10AM": 10,
    "11AM": 11,
    "12PM": 12,
    "1PM": 13,
    "2PM": 14,
    "3PM": 15,
    "4PM": 16,
    "5PM": 17,
    "6PM": 18,
    "7PM": 19,
    "8PM": 20,
    "9PM": 21,
    "10PM": 22,
    "11PM": 23,
  };
  let flags = [];
  let output = [];

  let filteredData = reportsTracking.filter(
    (x) => x.campaign_id === campaignId && x.date === date
  );

  for (let i = 0; i < filteredData.length; i++) {
    let ampm = formatAMPM(new Date(filteredData[i].timestamp));
    if (flags[ampm]) continue;
    flags[ampm] = true;
    output.push(ampm);
  }

  output.sort(function (a, b) {
    return (
      priorityOfHours[a.replace(" ", "")] - priorityOfHours[b.replace(" ", "")]
    );
  });

  return output; //['12 AM', '11 AM'] şeklinde bir çıktı verir.
};

const getDevicesByCampaignDatesAndHours = (
  reportsTracking,
  campaignId,
  date,
  hourRangeAMPM
) => {
  let flags = [];
  let output = [];

  let filteredData = reportsTracking.filter(
    (x) =>
      x.campaign_id === campaignId &&
      x.date === date &&
      formatAMPM(new Date(x.timestamp)) === hourRangeAMPM
  );

  for (let i = 0; i < filteredData.length; i++) {
    if (flags[filteredData[i].device]) continue;
    flags[filteredData[i].device] = true;
    output.push(filteredData[i].device);
  }
  return output;
};

const getSubId2sByDateHourAndDevices = (
  reportsTracking,
  campaignId,
  date,
  hourRangeAMPM,
  device
) => {
  let flags = [];
  let output = [];

  let filteredData = reportsTracking.filter(
    (x) =>
      x.campaign_id === campaignId &&
      x.date === date &&
      formatAMPM(new Date(x.timestamp)) === hourRangeAMPM &&
      x.device === device
  );

  for (let i = 0; i < filteredData.length; i++) {
    if (flags[filteredData[i].subid2]) continue;
    flags[filteredData[i].subid2] = true;
    output.push(filteredData[i].subid2);
  }
  return output;
};

const getDistinctKeywords = (
  reportsTracking,
  campaignId,
  date,
  hourRangeAMPM,
  device,
  subid
) => {
  let flags = [];
  let output = [];

  let filteredData = reportsTracking.filter(
    (x) =>
      x.campaign_id === campaignId &&
      x.date === date &&
      formatAMPM(new Date(x.timestamp)) === hourRangeAMPM &&
      x.device === device &&
      x.subid2 === subid
  );

  for (let i = 0; i < filteredData.length; i++) {
    if (flags[filteredData[i].keyword]) continue;
    flags[filteredData[i].keyword] = true;
    output.push(filteredData[i].keyword);
  }
  return output;
};

const getDistinctSites = (
  reportsTracking,
  campaignId,
  date,
  hourRangeAMPM,
  device,
  subid,
  keyword
) => {
  let flags = [];
  let output = [];

  let filteredData = reportsTracking.filter(
    (x) =>
      x.campaign_id === campaignId &&
      x.date === date &&
      formatAMPM(new Date(x.timestamp)) === hourRangeAMPM &&
      x.device === device &&
      x.subid2 === subid &&
      x.keyword === keyword
  );

  for (let i = 0; i < filteredData.length; i++) {
    if (flags[filteredData[i].site]) continue;
    flags[filteredData[i].site] = true;
    output.push(filteredData[i].site);
  }
  return output;
};

const getRevenueAndClicks = (reportsTracking) => {
  let totalRevenue = 0;
  let totalClicks = 0;

  for (let i = 0; i < reportsTracking.length; i++) {
    totalRevenue += +reportsTracking[i].revenueUsd;
    totalClicks += +reportsTracking[i].clicks;
  }

  totalRevenue = +parseFloat(totalRevenue).toFixed(2);
  let rpc = +parseFloat(totalRevenue / totalClicks).toFixed(2);
  let output = { totalRevenue: totalRevenue, clicks: totalClicks, RPC: rpc };
  return output;
};

const formatAMPM = (date) => {
  var hours = date.getHours();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  var strTime = hours + " " + ampm;
  return strTime.toUpperCase();
};
export { createData};
