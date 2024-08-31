const initialConfigState = {
  theme: false,
  notificationsEnabled: true,
  language: "pt-br",
};

const configurationReducer = (state = initialConfigState, action) => {
  switch (action.type) {
    case "UPDATE_CONFIG":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default configurationReducer;
