const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };
    case "UPDATE_FRIEND":
      return { ...state, user: action.payload };

    case "UPDATE_FRIENDREQUEST":
      return { ...state, user: action.payload };
    case "CHAT_START":
      return { ...state, chats: [...state.chats, action.payload] };
    case "SOCKET":
      return { ...state, socket: action.payload };

    case "CHATMESSAGES":
      return { ...state, messages: [...state?.messages, action.payload] };
    case "MODAL_TYPE":
      return { ...state, modalType: action.payload };
    default:
      return state;
  }
};
export default AuthReducer;
