const initState = {
  name: "",
  api_token: "",
};

export default (state = initState, action = {}) => {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, name: action.username };
    case "SET_API_TOKEN":
      return { ...state, api_token: action.api_token };
    default:
      return state;
  }
};
