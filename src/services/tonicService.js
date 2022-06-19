const reportTrackingPath =
  "https://api.publisher.tonic.com/privileged/v3/reports/tracking";
const authenticationPath = "https://api.publisher.tonic.com/jwt/authenticate";

const userName = "39535789572405466851";
const password = "bb165c810c1349e61dfbd52b9fe9c47bffce76d7";

const headers = {
  "Content-Type": "application/json",
};
const loginService = async () => {
  const response = await fetch(authenticationPath, {
    method: "POST",
    headers: headers,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: {
      consumer_key: userName,
      consumer_secret: password,
    },
  })
    .then((res) => (res.ok ? res : Promise.reject(res)))
    .then((res) => res.json());

  return response;
};

export {loginService}
