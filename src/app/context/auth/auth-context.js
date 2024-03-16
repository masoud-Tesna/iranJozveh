import {createContext, useContext, useReducer} from 'react';
import {useRouter} from 'next/navigation';

let localStorageAuth = null;

if (typeof window !== 'undefined') {
  localStorageAuth = localStorage.getItem('auth') || null;
}

// initial state:

const initialState = localStorageAuth ? JSON.parse(localStorageAuth) : {};
// const initialState = fakeUserDataForTest;

// action constant
const SET_AUTH_DATA = 'SET_AUTH_DATA';
const SET_NEW_ACCESS_TOKEN = 'SET_NEW_ACCESS_TOKEN';
const LOGOUT = 'LOGOUT';

// action creator function
const handleLogin = data => {
  return {
    type: SET_AUTH_DATA,
    payload: data
  };
};


const handleAccessToken = data => {
  return {
    type: SET_NEW_ACCESS_TOKEN,
    payload: data
  };
};

const handleLogoutUser = () => {
  return {
    type: LOGOUT
  };
};

// reducer function:
const reducer = (state, {type, payload}) => {
  const mappedAction = actionMap.get(type);
  
  return mappedAction ? mappedAction(state, payload) : state;
};

const login = (state, payload) => {
  // first save data into local storage
  localStorage.setItem('auth', JSON.stringify(payload));
  
  // save data in state
  return payload;
};

const changeAccessToken = (state, payload) => {
  const {tokenInfo, ...rest} = state;
  
  const newAuth = {
    ...rest,
    tokenInfo: {
      ...tokenInfo,
      accessToken: payload
    }
  };
  
  localStorage.setItem('auth', JSON.stringify(newAuth));
  
  // save data in state
  return newAuth;
};

const logOut = () => {
  // first remove localStorage data (auth and selected app and other)
  localStorage.clear();
  
  // then remove state auth
  return {};
};

// action map
const actionMap = new Map([
  [SET_AUTH_DATA, login],
  [SET_NEW_ACCESS_TOKEN, changeAccessToken],
  [LOGOUT, logOut]
]);

// spinner Context Create:
const authDataContext = createContext({});

// create spinner provider:
export const AuthProvider = ({children}) => {
  
  const [auth, authDispatch] = useReducer(
    reducer,
    initialState
  );
  
  return (
    <authDataContext.Provider value={{auth, authDispatch}}>
      {children}
    </authDataContext.Provider>
  );
  
};

// get current provider report state and dispatch
export const useAuth = () => {
  const router = useRouter();
  
  const auth = useContext(authDataContext)?.auth; // data
  const userInfo = auth?.user || {};
  const tokenInfo = auth?.tokenInfo || {};
  
  const isLoggedIn = Object.keys(auth).length !== 0; // check user logged in or not
  // const isLoggedIn = true; // check user logged in or not
  const authDispatch = useContext(authDataContext)?.authDispatch; // dispatch
  
  const handleChangeUserData = async data => authDispatch(handleLogin(data)); // handle login or change data user
  const handleChangeAccessToken = async data => authDispatch(handleAccessToken(data)); // handle login or change data user
  
  const handleLogout = async () => {
    await authDispatch(handleLogoutUser());
    await router.push('/');
  }; // handle user log out
  
  return {
    auth,
    userInfo,
    tokenInfo,
    isLoggedIn,
    authDispatch,
    handleLogout,
    handleChangeUserData,
    handleChangeAccessToken
  };
};
