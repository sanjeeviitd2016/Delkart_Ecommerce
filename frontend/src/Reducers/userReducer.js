import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_REQUEST,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_ERRORS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_RESET,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_REQUEST,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_RESET,
  RESET_PASSWORD_SUCCESS
} from "../Constants/userConstant.js";

// const initialState= {user ={}}
export const loginReducer = (
  state = {
    user: {},
  },
  action
) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case SIGNUP_REQUEST:
    case LOAD_USER_REQUEST:
      return { loading: true, isAuthenticated: false };

    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        loading: false,
        isAuthenticated: false,
      };

    case LOGIN_FAIL:
    case SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    // logout

    case LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS: {
      return {
        ...state,
        error: null,
      };
    }

    default:
      return { ...state };
  }
};

// signup reducer

//profile reducer

export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      case UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        loading:true
      };

    case UPDATE_PROFILE_SUCCESS:
      case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading:false,
        isUpdated: action.payload
      };
    case UPDATE_PROFILE_RESET:
      case UPDATE_PASSWORD_RESET:
      return {
        ...state,
        isUpdated:false
      };
    case UPDATE_PROFILE_FAIL:
      case UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        loading:false,
        error: action.payload

      };
    case CLEAR_ERRORS: 
      return {
        ...state,
        error: null
      }
    
    default :
      return{
        ...state
      }
    }
};

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
      case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading:true,
        error:null
      };

      case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading:false,
        message: action.payload
      };
      case RESET_PASSWORD_SUCCESS:
        return {
          ...state,
          loading:false,
          success: action.payload
        };

      case FORGOT_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
      return {
        ...state,
        loading:false,
        error: action.payload

      };
    case CLEAR_ERRORS: 
      return {
        ...state,
        error: null,
        message:null
      }
    
    default :
      return{
        ...state
      }
    }
};