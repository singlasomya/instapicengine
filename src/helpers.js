import axios from "axios";
import { select } from "redux-saga/effects";

export const fetchApiMaker = () => ({
  url,
  data,
  ignoreOodSuccess = false,
  method = "POST",
}) => {
  // const user = getAuthData().currentPortalUser
  return axios
    .request({
      method,
      baseURL: `${process.env.REACT_APP_API_HOST}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
      url,
      data,
      // timeout: 5000,
    })
    .then((res) => {
      debugger;
      console.log("api res", res, url);
      if (
        res &&
        res.status === 200 &&
        (ignoreOodSuccess || (res.data && res.data.is_success))
      ) {
        // only here success
        return res.data;
      } else {
        // success: false; so handle in catch below
        throw res;
      }
    })
    .catch((err) => {
      console.log("api err", err);
      if (err.data) {
        if (err.data.error_description) {
          throw err.data;
        } else {
          throw {
            err,
            success: false,
            error_description: "unknown error",
            error_code: 0,
          };
        }
      } else {
        throw {
          err,
          success: false,
          error_description: "unknown error",
          error_code: 0,
        };
      }
    });
};

export function* fetchAuthApi({
  url,
  data,
  ignoreOodSuccess = false,
  method = "GET",
}) {
  // const token = yield select(globalSelectors.selectToken);
  console.log("url", url);
  const res = yield fetchApiMaker()({
    url,
    data,
    ignoreOodSuccess,
    method,
  });
  console.log("res 1", res);
  return res;
}

export function* fetchApi({
  url,
  data,
  ignoreOodSuccess = false,
  method = "POST",
}) {
  const res = yield fetchApiMaker()({ url, data, ignoreOodSuccess, method });
  console.log("res 2", res);
  return res;
}
