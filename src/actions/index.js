export const alertActions = () => ({
  type: "LOAD_DEFAULT",
});

export const register = (data, api_token, callback) => ({
  type: "REGISTER",
  data,
  api_token,
  callback,
});

export const login = (data, callback) => ({
  type: "LOGIN",
  data,
  callback,
});

export const logout = (username, callback) => ({
  type: "LOGOUT",
  username,
  callback,
});

export const setUserName = (username) => ({
  type: "SET_USERNAME",
  username,
});

export const uploadMine = (files, remark, api_token, callback) => ({
  type: "UPLOAD_MINE",
  files,
  remark,
  api_token,
  callback,
});

export const getDesignElement = (data, api_token, callback) => ({
  type: "DESIGN_ELEMENT",
  data,
  api_token,
  callback,
});

export const setApiToken = (api_token) => ({
  type: "SET_API_TOKEN",
  api_token,
});
