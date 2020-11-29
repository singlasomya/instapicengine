import {
  put,
  takeEvery,
  call,
  all,
  select,
  takeLatest,
} from "redux-saga/effects";
import { makeid } from "../utilities/general.js";
import { register } from "../serviceWorker.js";
import { fetchApi, fetchAuthApi } from "../helpers.js";

function* uploadMine(action) {
  var files = action.files;
  debugger;
  var form_data = new FormData();
  form_data.append("api_token", action.api_token);
  form_data.append("remark", action.remark);

  for (var i = 0; i < files.length; i++) {
    if (files[i] instanceof Blob) {
      form_data.append(
        i,
        files[i],
        makeid(16) +
          "." +
          (files[i].type === "image/jpeg" ? "jpg" : files[i].type.split("/")[1])
      );
    } else {
      form_data.append(i, files[i]);
    }
  }
  try {
    const { data: getuploadMine, is_success } = yield call(fetchApi, {
      url: "/instapic/ajax/upload",
      data: form_data,
    });
    if (is_success) {
      action.callback(getuploadMine);
    }
  } catch (e) {
    alert(e && e.error_description ? e.error_description : "unknown error");
    return e;
  }
}

function* registerUser(action) {
  try {
    const { data: getregisterUser, is_success } = yield call(fetchApi, {
      url: "/instapic/ajax/register",
      data: {
        name: action.data.username,
        email: action.data.email,
        password: action.data.password,
      },
    });
    if (is_success) {
      action.callback(getregisterUser);
    }
  } catch (e) {
    alert(e && e.error_description ? e.error_description : "unknown error");
    return e;
  }
}

function* login(action) {
  try {
    const { data: getlogin, is_success } = yield call(fetchApi, {
      url: "/instapic/ajax/login",
      data: {
        email: action.data.email,
        password: action.data.password,
      },
    });
    console.log("login", login);
    if (is_success) {
      action.callback(getlogin);
    }
  } catch (e) {
    alert(e && e.error_description ? e.error_description : "unknown error");
    return e;
  }
}

function* logout(action) {
  try {
    const { data: getlogout, is_success } = yield call(fetchApi, {
      url: "/instapic/ajax/logout",
      data: {
        username: action.username,
      },
    });
    console.log("logout", logout);
    if (is_success) {
      action.callback();
    }
  } catch (e) {
    alert(e && e.error_description ? e.error_description : "unknown error");
    return e;
  }
}

function* getDesignElement(action) {
  try {
    const { data: getdesigndata, is_success } = yield call(fetchApi, {
      url: "/instapic/ajax/getUploadImages",
      data: {
        api_token: action.api_token,
        offset: action.data.offset,
        limit: action.data.limit,
        keyword: action.data.keyword,
      },
    });
    if (is_success) {
      action.callback(getdesigndata);
    }
  } catch (e) {
    console.log("e", e);
    return e;
  }
}

function* watchProjectSaveAsync() {
  yield takeEvery("UPLOAD_MINE", uploadMine);
  yield takeEvery("REGISTER", registerUser);
  yield takeEvery("LOGIN", login);
  yield takeEvery("LOGOUT", logout);
  yield takeEvery("DESIGN_ELEMENT", getDesignElement);
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([watchProjectSaveAsync()]);
}
